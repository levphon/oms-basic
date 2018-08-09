package com.glsx.oms.basic.biz.servicemanage.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.beanutils.BeanUtils;
import org.oreframework.boot.security.UserInfoHolder;
import org.oreframework.boot.security.cas.User;
import org.oreframework.common.lang.date.DateFormatConstants;
import org.oreframework.common.lang.date.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.glsx.biz.common.upgrade.entity.AppGroup;
import com.glsx.biz.common.upgrade.service.AppGroupManager;
import com.glsx.biz.common.user.entity.DeviceCategory;
import com.glsx.biz.common.user.service.DeviceCategoryService;
import com.glsx.biz.merchant.common.entity.Merchant;
import com.glsx.biz.merchant.common.vo.MerchantVo;
import com.glsx.biz.merchant.service.MerchantService;
import com.glsx.cloudframework.core.datastructure.page.Pagination;
import com.glsx.cloudframework.exception.ServiceException;
import com.glsx.fcservice.api.core.FcsResponse;
import com.glsx.fcservice.api.request.FlowcardPackageQuery;
import com.glsx.fcservice.api.response.FlowcardPackage;
import com.glsx.fcservice.api.service.FlowcardPackageService;
import com.glsx.oms.basic.biz.servicemanage.excel.OutServiceExcel;
import com.glsx.oms.basic.biz.servicemanage.model.ServiceDefine;
import com.glsx.oms.basic.biz.servicemanage.model.ServiceDefineExcel;
import com.glsx.oms.basic.biz.servicemanage.model.vo.AppVo;
import com.glsx.oms.basic.biz.servicemanage.model.vo.DeviceVo;
import com.glsx.oms.basic.biz.servicemanage.model.vo.FlowPackageVo;
import com.glsx.oms.basic.framework.config.ServiceManageProperty;
import com.glsx.oms.flowservice.api.core.FlowResponse;
import com.glsx.oms.flowservice.api.entity.PackageInfo;
import com.glsx.oms.flowservice.api.request.PackageRequest;
import com.glsx.oms.flowservice.api.service.PackageService;
import com.glsx.platform.goods.common.dto.PageResult;
import com.glsx.platform.goods.common.entity.AssociateApplication;
import com.glsx.platform.goods.common.entity.AssociateCard;
import com.glsx.platform.goods.common.entity.AssociateDevice;
import com.glsx.platform.goods.common.entity.AssociateFlowPackage;
import com.glsx.platform.goods.common.entity.ServiceDefinition;
import com.glsx.platform.goods.common.query.ServiceDefinitionQuery;
import com.glsx.platform.goods.common.service.CommonQueryService;
import com.glsx.platform.goods.common.service.ServiceDefinitionService;
/**
 * @author Lenovo 服务Controller层
 */
@RestController
@RequestMapping(value = "/ServiceDefine")
public class ServiceDefineController {

	/**
	 * LOG
	 */
	private static final Logger LOG = LoggerFactory.getLogger(ServiceDefineController.class);

	@Reference(version="1.0.0")
	private ServiceDefinitionService serviceDefinitionServices;
	
	@Reference(version="1.0.0")
	private CommonQueryService commonQueryService;
	
	@Reference(version="1.0.0")
	private FlowcardPackageService flowcardPackageService;
	
	@Autowired
	private UserInfoHolder userInfoHolder;
	
	/**
	 * 供应商service
	 */
	@Reference(version="1.0.0")
	private MerchantService merchantService;
	
	/**
	 * 应用service
	 */	
	@Reference(version="2.1.1")
	private AppGroupManager appGroupManager; 
	
	/**
	 * 设备类型service
	 */
	@Reference(version="2.2.0",timeout=10000)
	private DeviceCategoryService deviceCategoryService;
	
	
	/**
	 * 获取流量套餐service 
	 */
	@Reference(version="1.0.0") 
	private PackageService packageService;
	/**
	 * 静态变量配置类
	 */
	@Autowired
	private ServiceManageProperty serviceManageProperty;
	
	@Autowired
    private OutServiceExcel outServiceExec;


	/**
	 * @param service
	 *            服务实体bean
	 * @return Object
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/list")
	@ResponseBody
	public Map<String, Object> list(ServiceDefine serviceDefine,
			@RequestParam(required=true,defaultValue="1") Integer currentPage,
            @RequestParam(required=false,defaultValue="10") Integer pageSize) {
		Map<String, Object> map = new HashMap<String, Object>();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		List<ServiceDefine> serviceDefineList=new ArrayList<ServiceDefine>();
		PageResult result = new PageResult();
		try {
			//获取服务供应商
			MerchantVo merchantVo=new MerchantVo();			
			merchantVo.setMerchantType(serviceManageProperty.getServiceMerchantType());
			merchantVo.setMerchantStatus(Short.parseShort("2"));
			List<Merchant> supplierList=merchantService.getMerchants(merchantVo);
			//获取服务列表
			ServiceDefinition serviceDefinition=serviceDefine.copy();
			ServiceDefinitionQuery query=new ServiceDefinitionQuery();
			query.setStartTime(serviceDefine.getStartTime()==null?null:sdf.parse(serviceDefine.getStartTime()));
			query.setEndTime(serviceDefine.getEndTime()==null?null:sdf.parse(serviceDefine.getEndTime()));
			query.setQueryText(serviceDefine.getQueryText());
			query.setPageNo(currentPage);
			query.setPageSize(pageSize);
			List<ServiceDefinition> list=new ArrayList<ServiceDefinition>();
			if(serviceDefine.getDeviceIds()==null){//没有输入设备id或者名称
				result=commonQueryService.getServiceDefinitions(serviceDefinition, query);
				list=(List<ServiceDefinition>)result.getData();
			}
			if(serviceDefine.getDeviceIds()!=null
					&&!serviceDefine.getDeviceIds().equals("")){//输入了设备id或者根据设备名称能反查到设备id
				List<Integer> deviceIdList=JSON.parseArray(serviceDefine.getDeviceIds(),Integer.class);
				query.setDeviceIds(deviceIdList);
				result=commonQueryService.getServiceDefinitions(serviceDefinition, query);
				list=(List<ServiceDefinition>)result.getData();
			}

			for(ServiceDefinition sd:list){
				ServiceDefine service=new ServiceDefine();
				service=service.copy(sd);
				//根据供应商id实时获取供应商名称
				Merchant merchant=merchantService.get(service.getSupplierId());
				service.setSupplierName(merchant==null?"":merchant.getMerchantName());
				serviceDefineList.add(service);
			}
			map.put("data", serviceDefineList);
			map.put("recordsTotal", result.getCount());
			map.put("recordsFiltered", result.getCount());
			map.put("supplierList", supplierList);
		}catch (ServiceException e) {
			LOG.error("catch an ServiceException in queryList", e);
		}catch (Exception e1) {
			LOG.error("catch an Exception in queryList", e1);
		}
		return map;
	}

	/**
	 * @param service
	 *            服务实体bean
	 * @return Object
	 */
	@RequestMapping(value = "/toAdd")
	public Map<String, Object> toAdd(ServiceDefine serviceDefine) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<AppVo> appList=new ArrayList<AppVo>();
		List<DeviceVo> deviceList=new ArrayList<DeviceVo>();
		List<Integer> cardList=new ArrayList<Integer>();
		List<FlowPackageVo> flowPackageList=new ArrayList<FlowPackageVo>();
		try {
			//获取已启用服务供应商
			MerchantVo merchantVo=new MerchantVo();			
			merchantVo.setMerchantType(serviceManageProperty.getServiceMerchantType());
			merchantVo.setMerchantStatus(Short.parseShort("2"));
			List<Merchant> supplierList=merchantService.getMerchants(merchantVo);	
			if (serviceDefine!=null&&serviceDefine.getId()!=null) {
				//获取服务详情
				ServiceDefinition serviceDefinition=serviceDefinitionServices.findById(serviceDefine.getId(),true);
				LOG.info("获取的服务详情为:"+serviceDefinition.toString());
				serviceDefine=serviceDefine.copy(serviceDefinition);
				
				// 获取服务绑定的应用列表
				List<AssociateApplication> apps=serviceDefinition.getAssociateApplications();
				if(apps!=null){
					for(AssociateApplication app:apps){
						//获取应用名称				
						AppGroup appGroup=appGroupManager.getByGroupCode(app.getAppCode());
						String appCode=appGroup==null?null:appGroup.getGroupCode();
		                String appName=appGroup==null?null:appGroup.getGroupName();
						AppVo vo=new AppVo(app.getId(),appCode,appName,app.getAssociateId(),app.getType());
					    appList.add(vo);		
					}
				}
				// 获取服务绑定的设备列表
				List<AssociateDevice> devices=serviceDefinition.getAssociateDevices();
				if(devices!=null){
					for(AssociateDevice device:devices){
						//获取设备名称
						DeviceCategory deviceCategory=deviceCategoryService.get(device.getDeviceId());
						String deviceName=deviceCategory==null?null:deviceCategory.getDeviceName();
						String supplierName=deviceCategory==null?null:deviceCategory.getMerchantName();
						DeviceVo vo=new DeviceVo(device.getId(),device.getDeviceId(),deviceName,supplierName,device.getAssociateId(),device.getType());
						deviceList.add(vo);
					}
				}
				
				// 获取服务绑定的卡列表
			    List<AssociateCard> cards=serviceDefinition.getAssociateCards();
			    if(cards!=null){
			    	for(AssociateCard card:cards){
				    	 cardList.add(card.getCardTypeId());
				    }
			    }
			    
			    //获取服务绑定的流量套餐列表
			    List<AssociateFlowPackage> flowPackages=serviceDefinition.getAssociateFlowPackages();
			    if(flowPackages!=null){ 
			    	for(AssociateFlowPackage flowPackage:flowPackages){
				    	//根据套餐编号获取套餐详情
				    		PackageRequest request=new PackageRequest();   //修改后的对象用PackageRequest 
				    		request.setConsumer("oms-basic");
							request.setTime(DateUtils.getCurrentDate(DateFormatConstants.TIMEF_FORMAT));
				    		request.setPackageCode(flowPackage.getFlowPackageId().toString());
							FlowResponse<List<PackageInfo>> fr=packageService.getPackageList(request);
							List<PackageInfo> list=fr.getEntiy();
							if(list != null&&list.size()>0){
								for(int i=0;i<list.size();i++){
									PackageInfo fp = list.get(i);
									FlowPackageVo vo = new FlowPackageVo();
									vo.setFlowPackageId(Integer.parseInt(fp.getPackageCode()));
									vo.setPackageName(fp.getPackageName());
									vo.setBillingMethods(fp.getBillingMethods().toString());
									vo.setValidityPeriod(fp.getValidityPeriod());
									vo.setValidityPeriodUnit(fp.getValidityPeriodUnit());
									vo.setPackageCategory(fp.getPackageType().toString());
									Map<String, String> attrMap= fp.getPackageAttribute();
									vo.setAddedFlowType(attrMap.get("0_flow_type"));
									vo.setBasicFlowType(attrMap.get("1_flow_type"));
									
									vo.setTotalAddedFlow(attrMap.get("0_total_flow"));
									vo.setTotalBasicFlow(attrMap.get("1_total_flow"));
									
									vo.setAddedIsUnlimitFlow(attrMap.get("0_is_unlimit_flow"));
									vo.setBasicIsUnlimitFlow(attrMap.get("1_is_unlimit_flow"));
									
									vo.setAddedMonthTotalflow(attrMap.get("0_month_totalflow"));
									vo.setBasicMonthTotalflow(attrMap.get("1_month_totalflow"));
									
									
									vo.setAddedPeriods(attrMap.get("0_periods"));
									vo.setBasicPeriods(attrMap.get("1_periods"));
									
								    flowPackageList.add(vo);				
							    }
							}/*else{//调用新接口得不到数据时，调用老接口
								FlowcardPackageQuery query=new FlowcardPackageQuery();
						    	query.setPackageCode(flowPackage.getFlowPackageId().toString());
						    	FcsResponse<List<FlowcardPackage>> flowList=flowcardPackageService.getFlowCardPackage(query);
						        if(flowList!=null&&flowList.getEntiy().size()>0){
						        	FlowcardPackage fp=flowList.getEntiy().get(0);			        	
						        	FlowPackageVo vo=new FlowPackageVo();
						        	vo.setId(flowPackage.getId());
						        	vo.setFlowPackageId(flowPackage.getFlowPackageId());
						        	vo.setAssociateId(flowPackage.getAssociateId());
						        	vo.setType(flowPackage.getType());
						        	vo.setPackageName(fp.getPackageName());
						        	vo.setPackageCategory(fp.getPackageCategory());
						        	vo.setValidityPeriod(String.valueOf(fp.getChargeMode()));
						        	vo.setValidityPeriodUnit("月");
						        	if(fp.getPackageCategory().equals("增值流量")){
						        		vo.setAddedFlowType(fp.getFlowType());
						        		vo.setTotalAddedFlow(fp.getFlowLimit());
						        	}else{//基础流量
						        		vo.setBasicFlowType(fp.getFlowType());
						        		vo.setTotalBasicFlow(fp.getFlowLimit());
						        	}
						        	flowPackageList.add(vo);
						        }
							}*/
				    }
			    }
			    
			}
			map.put("supplierList", supplierList);
			map.put("ServiceDefine", serviceDefine);
			map.put("appList", appList);
			map.put("deviceList", deviceList);
			map.put("cardList", cardList);
			map.put("flowPackageList", flowPackageList);
		}catch (ServiceException e) {
			LOG.error("catch an ServiceException in toAdd", e);
		}catch (Exception e1) {
			LOG.error("catch an Exception in toAdd", e1);
		}
		return map;
	}
	/**
	 * @param service
	 *            服务实体bean
	 * @return Object
	 */
	@RequestMapping(value = "/add")
	public Map<String, Boolean> add(@RequestBody ServiceDefine serviceDefine, HttpServletRequest request) {
		Map<String, Boolean> map = new HashMap<String, Boolean>();		
		try {
			// 调用dubbo
			LOG.info("添加服务:"+serviceDefine);		
			ServiceDefinition serviceDefinition=serviceDefine.copy();			
			//获取绑定的应用列表
			 List<String> appVos= JSON.parseArray(serviceDefine.getAppList(),String.class);
			 List<AssociateApplication> apps=new ArrayList<AssociateApplication>();
			 if(appVos!=null&&appVos.size()>0){
				 for(String av:appVos){
					 AssociateApplication application=new AssociateApplication();
					 application.setAppCode(av);
					 application.setAssociateId(serviceDefine.getId());
					 apps.add(application);
				 } 
			 }
			 
			 serviceDefinition.setAssociateApplications(apps);
			//获取绑定的设备列表
			List<String> deviceVos=JSON.parseArray(serviceDefine.getDeviceList(),String.class);
			List<AssociateDevice> devices=new ArrayList<AssociateDevice>();
			if(deviceVos!=null&&deviceVos.size()>0){
				for(String dv:deviceVos){
					AssociateDevice device=new AssociateDevice();
					device.setDeviceId(dv==null?null:Integer.parseInt(dv));
					device.setAssociateId(serviceDefine.getId());
					devices.add(device);
				}
			}
		
			serviceDefinition.setAssociateDevices(devices);
			//获取绑定的卡列表
			List<AssociateCard> card=new ArrayList<>();
			if(serviceDefine.getCqltCard()==1){
				AssociateCard cqlt=new AssociateCard();
				cqlt.setAssociateId(serviceDefine.getId());
				cqlt.setCardTypeId(3);
				card.add(cqlt);
			}
			if(serviceDefine.getGlfrCard()==1){
				AssociateCard glfr=new AssociateCard();
				glfr.setAssociateId(serviceDefine.getId());
				glfr.setCardTypeId(2);
				card.add(glfr);
			}
			serviceDefinition.setAssociateCards(card);
			//获取绑定的流量套餐
			List<FlowPackageVo> flowPackages=JSON.parseArray(serviceDefine.getFlowPackageList(),FlowPackageVo.class);
			List<AssociateFlowPackage> fps=new ArrayList<AssociateFlowPackage>();
			if(flowPackages!=null&&flowPackages.size()>0){
				for(FlowPackageVo fp:flowPackages){
					AssociateFlowPackage flowPackage=new AssociateFlowPackage();
					flowPackage.setAssociateId(fp.getAssociateId());
					flowPackage.setFlowPackageId(fp.getFlowPackageId());
					fps.add(flowPackage);
				}
			}
			serviceDefinition.setAssociateFlowPackages(fps);
			User userInfo = userInfoHolder.getUserInfo(request.getParameter("jsessionid"));
			if(serviceDefine.getId()==null){
				serviceDefinition.setCreateBy(userInfo.getUsername());
				serviceDefinition.setUpdateBy(userInfo.getUsername());	
				serviceDefinitionServices.save(serviceDefinition);
			}else{
				serviceDefinition.setUpdateBy(userInfo.getUsername());	
				serviceDefinitionServices.update(serviceDefinition);
			}
			map.put("result", true);
		} catch (ServiceException e) {
			LOG.error("catch an ServiceException in add", e);
			map.put("result", false);
		} catch(Exception e1){
			LOG.error("catch an Exception in add", e1);
			map.put("result", false);
		}
		return map;
	}

	/**
	 * @param service
	 *            服务实体bean
	 * @return Object
	 */
	@RequestMapping(value = "/delete")
	public Map<String, Boolean> delete(ServiceDefine serviceDefine) {
		Map<String, Boolean> map = new HashMap<String, Boolean>();		
		try {
			// 调用dubbo
			ServiceDefinition serviceDefinition=serviceDefine.copy();
			LOG.info("删除服务:"+serviceDefinition.toString());
			serviceDefinitionServices.delete(serviceDefinition.getId());
			map.put("result", true);
		} catch (ServiceException e) {
			LOG.error("catch an ServiceException in delete", e);
			map.put("result", false);
		} catch (Exception e1) {
			LOG.error("catch an Exception in delete", e1);
			map.put("result", false);
		}
		return map;
	}
	/**
	 * @param service
	 *            服务实体bean
	 * @return Object
	 */
	@RequestMapping(value = "/updown")
	public Map<String, Boolean> updown(ServiceDefine serviceDefine) {
		Map<String, Boolean> map = new HashMap<String, Boolean>();		
		try {
			// 调用dubbo
			ServiceDefinition serviceDefinition=serviceDefine.copy();
			LOG.info("上下架服务:"+serviceDefinition.toString());
			List<Integer> list=new ArrayList<Integer>();
			list.add(serviceDefinition.getId());
			serviceDefinitionServices.updateShelveStatus(list, serviceDefinition.getShelveStatus());
			map.put("result", true);
		} catch (ServiceException e) {
			LOG.error("catch an ServiceException in delete", e);
			map.put("result", false);
		} catch (Exception e1) {
			LOG.error("catch an Exception in delete", e1);
			map.put("result", false);
		}
		return map;
	}
	/**
	 * @param service
	 *            服务实体bean
	 * @return Object
	 */
	@RequestMapping(value = "/existsByName")
	public Map<String, Boolean> existsByName(ServiceDefine serviceDefine) {
		Map<String, Boolean> map = new HashMap<String, Boolean>();		
		try {
			// 调用dubbo
			ServiceDefinition serviceDefinition=serviceDefine.copy();
			boolean result= serviceDefinitionServices.existsByName(serviceDefinition.getName());
			LOG.info("判断服务名是否重复:"+serviceDefinition.getName()+","+result);	
			map.put("result", !result);
		} catch (ServiceException e) {
			LOG.error("catch an ServiceException in existsByName", e);
			map.put("result", false);
		} catch (Exception e1) {
			LOG.error("catch an Exception in existsByName", e1);
			map.put("result", false);
		}
		return map;
	}
	/**
	 * @param service
	 *            获取可选应用列表
	 * @return Object
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/getAppList")
	public Map<String, Object> getAppList(AppVo vo) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			//List<AppInfo> appInfos=appInfoManager.getListByPlatform(serviceManageProperty.getPlatform());
			Pagination pagination=new Pagination();
			pagination.setPageNo(1);
			pagination.setPageSize(serviceManageProperty.getAppCount());
			pagination=appGroupManager.findPage(pagination, null);
			List<AppGroup> appInfos=(List<AppGroup>)pagination.getList();
			List<AppVo> appList=new ArrayList<AppVo>();
					//new ArrayList<AppVo>();
	        for(int i=0;i<appInfos.size();i++){
	        	if(appInfos.get(i).getState()==1){//获取已启用的应用列表
	        		AppVo appVo=new AppVo();
		        	appVo.setAppId(appInfos.get(i).getGroupId());
		        	appVo.setAppCode(appInfos.get(i).getGroupCode());
		        	appVo.setAppName(appInfos.get(i).getGroupName());
		        	appList.add(appVo);
	        	}
	        	
	        }	     
            map.put("AppList", appList);	
		} catch (Exception e) {
			LOG.error("catch an Exception in getAppList", e);
		}
		return map;
	}
	/**
	 * @param service
	 *            服务实体bean
	 * @return Object
	 */
	@RequestMapping(value = "/getDeviceList")
	public Map<String, Object> getDeviceList(DeviceVo vo) {
		Map<String, Object> map = new HashMap<String, Object>();
		Set<String> supplierList=new HashSet<String>();
		try {
			Pagination page=deviceCategoryService.getDeviceCategories(1, serviceManageProperty.getDeviceCount());
			List<DeviceCategory> deviceCategories=(List<DeviceCategory>)page.getList();		
			List<DeviceVo> deviceList= new ArrayList<DeviceVo>();
			for(int i=0;i<deviceCategories.size();i++){
				DeviceVo deviceVo=new DeviceVo();
	        	deviceVo.setDeviceId(deviceCategories.get(i).getDeviceId());
	        	deviceVo.setDeviceName(deviceCategories.get(i).getDeviceName());
	        	deviceVo.setSupplierName(deviceCategories.get(i).getMerchantName());
	        	deviceList.add(deviceVo);
	        	supplierList.add(deviceCategories.get(i).getMerchantName());
			}				
			map.put("deviceList", deviceList);
			map.put("supplierList", supplierList);
		} catch (Exception e) {
			LOG.error("catch an exception in getDeviceList", e);
		}
		return map;
	}
	/**
	 * @param service
	 *            服务实体bean
	 * @return Object
	 */
	@RequestMapping(value = "/getFlowPackageList")
	public Map<String, Object> getFlowPackageList(FlowPackageVo vo) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<FlowPackageVo> vos = new ArrayList<FlowPackageVo>();
		List<FlowcardPackage> flowCardList=new ArrayList<FlowcardPackage>();
		try {
			//获取流量套餐类型列表
			PackageRequest request=new PackageRequest();   //修改后的对象用PackageRequest 
			request.setConsumer("oms-basic");
			request.setTime(DateUtils.getCurrentDate(DateFormatConstants.TIMEF_FORMAT));
			FlowResponse<List<PackageInfo>> fr=packageService.getPackageList(request);
			List<PackageInfo> list=fr.getEntiy();
			for(int i=0;i<list.size();i++){
				PackageInfo fp = list.get(i);
				vo = new FlowPackageVo();
				vo.setFlowPackageId(Integer.parseInt(fp.getPackageCode()));
				vo.setPackageName(fp.getPackageName());
				vo.setBillingMethods(fp.getBillingMethods().toString());
				vo.setValidityPeriod(fp.getValidityPeriod());
				vo.setValidityPeriodUnit(fp.getValidityPeriodUnit());
				vo.setPackageCategory(fp.getPackageType().toString());
				Map<String, String>  attrMap=fp.getPackageAttribute();						
			    
				vo.setAddedFlowType(attrMap.get("0_flow_type"));
				vo.setBasicFlowType(attrMap.get("1_flow_type"));
				
				vo.setTotalAddedFlow(attrMap.get("0_total_flow"));
				vo.setTotalBasicFlow(attrMap.get("1_total_flow"));
				
				vo.setAddedIsUnlimitFlow(attrMap.get("0_is_unlimit_flow"));
				vo.setBasicIsUnlimitFlow(attrMap.get("1_is_unlimit_flow"));
				
				vo.setAddedMonthTotalflow(attrMap.get("0_month_totalflow"));
				vo.setBasicMonthTotalflow(attrMap.get("1_month_totalflow"));
				
				
				vo.setAddedPeriods(attrMap.get("0_periods"));
				vo.setBasicPeriods(attrMap.get("1_periods"));
				
				vos.add(vo);				
		    }
			map.put("flowPackageList", vos);
		} catch (Exception e) {
			LOG.error("catch an exception in getDeviceList", e);
		}
		return map;
	}
	
	@RequestMapping(value = "/exportService", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, String> exportService(ServiceDefine service) {
		String downUrl = null;
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Map<String, String> map = new HashMap<String, String>();
		long startTime = System.currentTimeMillis();
		PageResult result = new PageResult();
		try {
			//获取服务供应商
			MerchantVo merchantVo=new MerchantVo();			
			merchantVo.setMerchantType(serviceManageProperty.getServiceMerchantType());
			merchantVo.setMerchantStatus(Short.parseShort("2"));
			List<Merchant> supplierList=merchantService.getMerchants(merchantVo);
			//获取服务列表
			ServiceDefinition serviceDefinition=service.copy();
			ServiceDefinitionQuery query=new ServiceDefinitionQuery();
			query.setStartTime(service.getStartTime()==null?null:sdf.parse(service.getStartTime()));
			query.setEndTime(service.getEndTime()==null?null:sdf.parse(service.getEndTime()));
			query.setQueryText(service.getQueryText());
			query.setPageNo(1);
			query.setPageSize(100000);
			List<ServiceDefinition> list=new ArrayList<ServiceDefinition>();
			if(service.getDeviceIds()==null){//没有输入设备id或者名称
				result=commonQueryService.getServiceDefinitions(serviceDefinition, query);
				list=(List<ServiceDefinition>)result.getData();
			}
			if(service.getDeviceIds()!=null
					&&!service.getDeviceIds().equals("")){//输入了设备id或者根据设备名称能反查到设备id
				List<Integer> deviceIdList=JSON.parseArray(service.getDeviceIds(),Integer.class);
				query.setDeviceIds(deviceIdList);
				result=commonQueryService.getServiceDefinitions(serviceDefinition, query);
				list=(List<ServiceDefinition>)result.getData();
			}
			List<ServiceDefineExcel> excelList=new ArrayList<ServiceDefineExcel>();
			for (ServiceDefinition serviceDefine:list) {
				ServiceDefineExcel se=new ServiceDefineExcel();
				BeanUtils.copyProperties(se, serviceDefine);
				 //上架状态: 1 草稿， 2 上架， 3 下架
                if (serviceDefine.getShelveStatus() != null) {
                    if (serviceDefine.getShelveStatus()==1) {
                    	se.setShelveStatus("草稿");
                    } else if (serviceDefine.getShelveStatus()==2) {
                    	se.setShelveStatus("上架");
                    } else if (serviceDefine.getShelveStatus()==3) {
                    	se.setShelveStatus("下架");
                    }
                }
                
                //有效期单位
                if(serviceDefine.getValidityPeriodUnit()!=null){
                	if(serviceDefine.getValidityPeriodUnit().equals("forever")){
                    	se.setValidityPeriodUnit("永久有效");
                    }else if(serviceDefine.getValidityPeriodUnit().equals("year")){
                    	se.setValidityPeriodUnit("年");
                    }else if(serviceDefine.getValidityPeriodUnit().equals("month")){
                    	se.setValidityPeriodUnit("月");
                    }
                }
                //处理数量和有效期的值
                if(serviceDefine.getQuantity()!=null&&serviceDefine.getQuantity()==0){
                	se.setQuantity(null);
                }
                if(serviceDefine.getValidityPeriod()!=null&&serviceDefine.getValidityPeriod()==0){
                	se.setValidityPeriod(null);
                }
				//根据供应商id实时获取供应商名称
				/*Merchant merchant=merchantService.get(serviceDefine.getSupplierId());				
				se.setSupplierName(merchant==null?"":merchant.getMerchantName());*/	
                for(Merchant merchant:supplierList){
                	if(merchant.getMerchantId().equals(serviceDefine.getSupplierId())){
                		se.setSupplierName(merchant.getMerchantName());	
                	}
                }
			    
				if(serviceDefine.getQuantity()==null||serviceDefine.getQuantity()==0){
			    	se.setBilling("按时间");
			    }else{
			    	se.setBilling("按数量");
			    }
			    //处理日期
			    se.setCreateTime(serviceDefine.getCreateTime()==null?null:sdf.format(serviceDefine.getCreateTime()));
			    excelList.add(se);
			}
			
			downUrl = outServiceExec.excelServicePath(excelList,1);           
			map.put("url", downUrl);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOG.warn("服务导出excel总耗时:"+(System.currentTimeMillis()-startTime)+"ms");	
		return map;
	}
}
