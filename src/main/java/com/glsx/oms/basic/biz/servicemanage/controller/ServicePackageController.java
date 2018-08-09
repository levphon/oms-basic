package com.glsx.oms.basic.biz.servicemanage.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import org.apache.commons.beanutils.BeanUtils;
import org.oreframework.boot.security.UserInfoHolder;
import org.oreframework.boot.security.cas.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.glsx.biz.common.user.entity.DeviceCategory;
import com.glsx.biz.common.user.service.DeviceCategoryService;
import com.glsx.biz.merchant.common.entity.Merchant;
import com.glsx.biz.merchant.common.vo.MerchantVo;
import com.glsx.biz.merchant.service.MerchantService;
import com.glsx.cloudframework.exception.ServiceException;
import com.glsx.oms.basic.biz.commoditymanage.model.Configuration;
import com.glsx.oms.basic.biz.commoditymanage.service.GoodsService;
import com.glsx.oms.basic.biz.servicemanage.excel.OutServiceExcel;
import com.glsx.oms.basic.biz.servicemanage.model.ServiceDefine;
import com.glsx.oms.basic.biz.servicemanage.model.ServicePackageExcel;
import com.glsx.oms.basic.biz.servicemanage.model.ServicePackages;
import com.glsx.oms.basic.biz.servicemanage.model.vo.DeviceVo;
import com.glsx.oms.basic.biz.servicemanage.model.vo.MerchantsVo;
import com.glsx.oms.basic.framework.config.ServiceManageProperty;
import com.glsx.platform.goods.common.dto.PageResult;
import com.glsx.platform.goods.common.entity.AssociateCard;
import com.glsx.platform.goods.common.entity.AssociateDevice;
import com.glsx.platform.goods.common.entity.AssociateMerchant;
import com.glsx.platform.goods.common.entity.AssociateServiceDefinition;
import com.glsx.platform.goods.common.entity.ServiceDefinition;
import com.glsx.platform.goods.common.entity.ServicePackage;
import com.glsx.platform.goods.common.query.ServicePackageQuery;
import com.glsx.platform.goods.common.service.CommonQueryService;
import com.glsx.platform.goods.common.service.ServiceDefinitionService;
import com.glsx.platform.goods.common.service.ServicePackageService;

@RestController
@RequestMapping(value = "/ServicePackage")
public class ServicePackageController {
	/**
	 * LOG
	 */
	private static final Logger LOG = LoggerFactory.getLogger(ServicePackageController.class);

	@Reference(version="1.0.0")
	private ServiceDefinitionService serviceDefinitionServices;
	
	@Reference(version="1.0.0")
	private ServicePackageService servicePackageService;
		
	@Reference(version="1.0.0")
	private CommonQueryService commonQueryService;
	
	@Reference(version="2.2.0")
	private DeviceCategoryService deviceCategoryService;

	@Autowired
	private UserInfoHolder userInfoHolder;
	
	/**
	 * 供应商service
	 */
	@Reference(version="1.0.0")
	private MerchantService merchantService;

	/**
	 * 静态变量配置类
	 */
	@Autowired
	private ServiceManageProperty serviceManageProperty;
	
    @Autowired
    private GoodsService goodsService;
    
	@Autowired
    private OutServiceExcel outServiceExec;

	/**
	 * @param service
	 *            服务套餐实体bean
	 * @return Object
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/list")
	@ResponseBody
	public Map<String, Object> list(ServicePackages servicePackages,
			@RequestParam(required=true,defaultValue="1") Integer currentPage,
            @RequestParam(required=false,defaultValue="10") Integer pageSize) {
		Map<String, Object> map = new HashMap<String, Object>();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		List<ServicePackages> servicePackagesList=new ArrayList<>();
		PageResult result = new PageResult();
		LOG.info("查询服务套餐:" + servicePackages.toString());
		try {
			//获取已启用服务供应商
			MerchantVo merchantVo=new MerchantVo();			
			merchantVo.setMerchantType(serviceManageProperty.getServicePackageMerchantType());
			merchantVo.setMerchantStatus(Short.parseShort("2"));
			List<Merchant> supplierList=merchantService.getMerchants(merchantVo);
			//查询套餐列表
			ServicePackage servicePackage=servicePackages.copy();
			ServicePackageQuery query=new ServicePackageQuery();
			query.setStartTime(servicePackages.getStartTime()==null?null:sdf.parse(servicePackages.getStartTime()));
			query.setEndTime(servicePackages.getEndTime()==null?null:sdf.parse(servicePackages.getEndTime()));
			query.setQueryText(servicePackages.getQueryText());
			query.setMerchantId(servicePackages.getMerchantList()==null?null:Integer.parseInt(servicePackages.getMerchantList()));			
			query.setCardTypeId(servicePackages.getCardName());
			query.setPageNo(currentPage);
			query.setPageSize(pageSize);
			List<ServicePackage> list=new ArrayList<ServicePackage>();			
			if(servicePackages.getDeviceIds()==null){//没有输入设备id或者名称			
				result =commonQueryService.getServicePackages(servicePackage, query);
				list=(List<ServicePackage>)result.getData();
			}else if(servicePackages.getDeviceIds()!=null
					&&!servicePackages.getDeviceIds().equals("")){//输入了设备id或者根据设备名称能反查到设备id
				List<Integer> deviceIdList=JSON.parseArray(servicePackages.getDeviceIds(),Integer.class);
				query.setDeviceIds(deviceIdList);				
				result =commonQueryService.getServicePackages(servicePackage, query);
				list=(List<ServicePackage>)result.getData();
			}
			
			for(ServicePackage sp:list){
				ServicePackages sps=new ServicePackages();
				sps=sps.copy(sp);
				//获取套餐绑定的供应商名称列表
				List<AssociateMerchant> merchantList=sp.getAssociateMerchants();			
				if(merchantList!=null&&merchantList.size()>0){
					String merchantNames="";
					for(AssociateMerchant am:merchantList){
						if(null!=am.getMerchantId()){
							Merchant merchant=merchantService.get(am.getMerchantId());
							if(merchant!=null){
								merchantNames+=merchant.getMerchantName()+" , ";
							}
						}
					}
					//去除最后一个逗号和空格
					if(!StringUtils.isEmpty(merchantNames)){
						sps.setMerchantList(merchantNames.substring(0, merchantNames.length()-2));
					}
					
				}else{
					sps.setMerchantList("");
				}
				
				
				servicePackagesList.add(sps);
			}
			map.put("data", servicePackagesList);
			map.put("recordsTotal", result.getCount());
			map.put("recordsFiltered", result.getCount());
			map.put("supplierList", supplierList);
		}catch(ServiceException e){
			LOG.error("catch an ServiceException in queryList", e);
		}catch (Exception e1) {
			LOG.error("catch an exception in queryList", e1);
		}

		return map;
	}

	/**
	 * @param service
	 *            服务套餐实体bean
	 * @return Object
	 */
	@RequestMapping(value = "/toAdd")
	public Map<String, Object> toAdd(ServicePackages servicePackages) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<DeviceVo> deviceList = new ArrayList<DeviceVo>();
		List<Integer> cardList=new ArrayList<Integer>();
		List<ServiceDefine> serviceDefineList=new ArrayList<ServiceDefine>();
		List<MerchantsVo> merchantList=new ArrayList<MerchantsVo>();
		List<Configuration> configurationsList = new ArrayList<Configuration>();
		try {
			//获取渠道列表
			configurationsList=goodsService.queryChannelList();
			
			if (servicePackages != null && servicePackages.getId() != null) {
				// 获取套餐详情
				ServicePackage servicePackage = servicePackageService.findById(servicePackages.getId(),true);
				LOG.info("获取的套餐详情为:"+servicePackage.toString());
				servicePackages=servicePackages.copy(servicePackage);
				// 获取套餐关联的设备列表
				List<AssociateDevice> devices = servicePackage.getAssociateDevices();
				if(devices!=null){
					for (AssociateDevice device : devices) {
						//获取设备名称
						DeviceCategory deviceCategory=deviceCategoryService.get(device.getDeviceId());
						String deviceName=deviceCategory==null?null:deviceCategory.getDeviceName();
						String supplier=deviceCategory==null?null:deviceCategory.getMerchantName();
						DeviceVo vo = new DeviceVo(device.getId(), device.getDeviceId(), deviceName,supplier, device.getAssociateId(), device.getType());
						deviceList.add(vo);
					}
				}
				
				// 获取套餐关联的卡列表
				List<AssociateCard> cards = servicePackage.getAssociateCards();
				if(cards!=null){
					for (AssociateCard card : cards) {
						cardList.add(card.getCardTypeId());
					}
				}
				
				// 获取套餐关联的服务列表
				List<AssociateServiceDefinition> serviceDefinitions=servicePackage.getAssociateServiceDefinitions();
				if(serviceDefinitions!=null){
					for (AssociateServiceDefinition assService : serviceDefinitions) {
						ServiceDefinition serviceDefinition=serviceDefinitionServices.findById(assService.getServiceDefinitionId());
						ServiceDefine serviceDefine=new ServiceDefine();
						serviceDefine=serviceDefine.copy(serviceDefinition);
						serviceDefineList.add(serviceDefine);
					}
				}
				
				//获取套餐关联的定制商列表
				List<AssociateMerchant> merchants=servicePackage.getAssociateMerchants();
			    Integer type=2;
			    if(merchants!=null){
			    	for(AssociateMerchant assMerchant:merchants){
			    		if(null!=assMerchant.getMerchantId()){
			    			Merchant merchant=merchantService.get(assMerchant.getMerchantId());
			    			if(merchant!=null){
			    				MerchantsVo merchantsVo=new MerchantsVo(assMerchant.getId(),assMerchant.getMerchantId(),merchant.getMerchantName(),servicePackages.getId(),type);
						    	merchantList.add(merchantsVo);
			    			}
			    		}
					}
			    }
			    			
			}
	
			map.put("servicePackage", servicePackages);
			map.put("deviceList", deviceList);
			map.put("cardList", cardList);
			map.put("serviceDefineList", serviceDefineList);
			map.put("merchantList", merchantList);
			map.put("configurationsList", configurationsList);
		}catch (ServiceException e) {
			LOG.error("catch an ServiceException in toAdd", e);
		}catch (Exception e1) {
			LOG.error("catch an Exception in toAdd", e1);
		}
		return map;
	}

	/**
	 * @param service
	 *            服务套餐实体bean
	 * @return Object
	 */
	@RequestMapping(value = "/add")
	public Map<String, Boolean> add(@RequestBody ServicePackages servicePackages, HttpServletRequest request) {
		Map<String, Boolean> map = new HashMap<String, Boolean>();
		try {
			// 调用dubbo
			LOG.info("添加服务套餐:" + servicePackages.toString());			
			ServicePackage servicePackage=servicePackages.copy();
			//获取绑定的设备列表
			List<String> deviceVos=JSON.parseArray(servicePackages.getDeviceList(),String.class);
			List<AssociateDevice> devices=new ArrayList<AssociateDevice>();
			if(deviceVos!=null&&deviceVos.size()>0){
				for(String dv:deviceVos){
					AssociateDevice ad=new AssociateDevice();
					ad.setDeviceId(Integer.parseInt(dv));
					ad.setAssociateId(servicePackages.getId());
					devices.add(ad);
				}
			}
		
			servicePackage.setAssociateDevices(devices);
			//获取绑定的卡列表
			List<AssociateCard> card=new ArrayList<>();
			if(servicePackages.getWbCard()==1){
				AssociateCard wb=new AssociateCard();
				wb.setAssociateId(servicePackages.getId());
				wb.setCardTypeId(0);
				card.add(wb);
			}
			if(servicePackages.getGl3GCard()==1){
				AssociateCard gl3G=new AssociateCard();
				gl3G.setAssociateId(servicePackages.getId());
				gl3G.setCardTypeId(1);
				card.add(gl3G);
			}			
			if(servicePackages.getGlfrCard()==1){
				AssociateCard glfr=new AssociateCard();
				glfr.setAssociateId(servicePackages.getId());
				glfr.setCardTypeId(2);
				card.add(glfr);
			}
			if(servicePackages.getCqltCard()==1){
				AssociateCard cqlt=new AssociateCard();
				cqlt.setAssociateId(servicePackages.getId());
				cqlt.setCardTypeId(3);
				card.add(cqlt);
			}		
			servicePackage.setAssociateCards(card);
			//获取绑定的服务列表
			List<String> list=JSON.parseArray(servicePackages.getServiceList(),String.class);
			List<AssociateServiceDefinition> associateServiceDefinitionList=new ArrayList<AssociateServiceDefinition>();
			for(String sd:list){
				AssociateServiceDefinition service=new AssociateServiceDefinition();
				service.setServiceDefinitionId(Integer.parseInt(sd));
				service.setServicePackageId(servicePackages.getId());
				associateServiceDefinitionList.add(service);
			}
			servicePackage.setAssociateServiceDefinitions(associateServiceDefinitionList);
			//获取绑定的定制商列表
			List<String> merchantsVos=JSON.parseArray(servicePackages.getMerchantList(),String.class);
			List<AssociateMerchant> associateMerchantList=new ArrayList<AssociateMerchant>();
			for(String vo:merchantsVos){
				AssociateMerchant associateMerchant=new AssociateMerchant();
				associateMerchant.setMerchantId(Integer.parseInt(vo));
				associateMerchant.setServicePackageId(servicePackages.getId());
				associateMerchantList.add(associateMerchant);
			}
			servicePackage.setAssociateMerchants(associateMerchantList);
			User userInfo = userInfoHolder.getUserInfo(request.getParameter("jsessionid"));
			//保存套餐
			if(servicePackages.getId()==null){
				servicePackage.setCreateBy(userInfo.getUsername());
				servicePackage.setUpdateBy(userInfo.getUsername());
				servicePackageService.save(servicePackage);
			}else{
				servicePackage.setUpdateBy(userInfo.getUsername());
				servicePackageService.update(servicePackage);
			}
			
			map.put("result", true);
		} catch (ServiceException e) {
			LOG.error("catch an ServiceException in add", e);
			map.put("result", false);
		} catch (Exception e) {
			LOG.error("catch an Exception in add", e);
			map.put("result", false);
		}
		return map;
	}

	/**
	 * @param service
	 *            服务套餐实体bean
	 * @return Object
	 */
	@RequestMapping(value = "/delete")
	public Map<String, Boolean> delete(ServicePackages servicePackages) {
		Map<String, Boolean> map = new HashMap<String, Boolean>();
		try {
			ServicePackage servicePackage=servicePackages.copy();
			// 调用dubbo
			LOG.info("删除服务套餐:" + servicePackage.toString());
			servicePackageService.delete(servicePackage.getId());
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
	 *            服务套餐实体bean
	 * @return Object
	 */
	@RequestMapping(value = "/updown")
	public Map<String, Boolean> updown(ServicePackages servicePackages) {
		Map<String, Boolean> map = new HashMap<String, Boolean>();
		try {
			ServicePackage servicePackage=servicePackages.copy();
			List<Integer> list=new ArrayList<Integer>();
			list.add(servicePackage.getId());
			servicePackageService.updateShelveStatus(list, servicePackage.getShelveStatus());
			LOG.info("上下架服务套餐:" + servicePackages.toString());
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
	 *            服务套餐实体bean
	 * @return Object
	 */
	@RequestMapping(value = "/existsByName")
	public Map<String, Boolean> existsByName(ServicePackages servicePackages) {
		Map<String, Boolean> map = new HashMap<String, Boolean>();
		try {
			ServicePackage servicePackage=servicePackages.copy();
			boolean result=servicePackageService.existsByName(servicePackage.getName());
			LOG.info("判断服务名是否重复:"+servicePackage.getName()+","+result);	
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
	 *            服务实体bean
	 * @return Object
	 */
	@RequestMapping(value = "/getServiceList")
	public Map<String, Object> getServiceList(@RequestBody ServiceDefine serviceDefine) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			List<ServiceDefine> serviceList = new ArrayList<ServiceDefine>();
			List<Integer> deviceList=new ArrayList<Integer>();
			List<Integer> cardList=new ArrayList<Integer>();
			// 获取设备列表绑定的服务列表
			if (serviceDefine.getDeviceList() != null && !serviceDefine.getDeviceList().equals("")) {
				List<Integer> deviceVoList = JSON.parseArray(serviceDefine.getDeviceList(),Integer.class);
				for (Integer deviceVo:deviceVoList) {
					deviceList.add(deviceVo);	
				}
			}
			// 获取重庆联通卡列表绑定的服务列表
			if (serviceDefine.getCqltCard() != 0) {
				cardList.add(3);
			}
			// 获取广联繁睿卡绑定的服务列表
			if (serviceDefine.getGlfrCard() != 0) {
				cardList.add(2);
			}
			List<ServiceDefinition> list=commonQueryService.getServiceDefinitions(deviceList, cardList);
			if(list!=null&&list.size()>0){
				for(ServiceDefinition sd:list){
					//获取上架状态的可选服务列表
					if(sd.getShelveStatus()!=null&&sd.getShelveStatus()==2){
						ServiceDefine service=new ServiceDefine();
						service=service.copy(sd);
						serviceList.add(service);
					}				
				}
			}
			map.put("ServiceList", serviceList);
		} catch (ServiceException e) {
			LOG.error("catch an ServiceException in getServiceList", e);
		} catch (Exception e1) {
			LOG.error("catch an Exception in getServiceList", e1);
		}
		return map;
	}
	
	/**
	 * @param service
	 *            服务实体bean
	 * @return Object
	 */
	@RequestMapping(value = "/getMerchantList")
	public Map<String, Object> getMerchantList(DeviceVo vo) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			//获取服务供应商
			MerchantVo merchantVo=new MerchantVo();			
			merchantVo.setMerchantType(serviceManageProperty.getServicePackageMerchantType());
			merchantVo.setMerchantStatus(Short.parseShort("2"));
			List<Merchant> merchantList=merchantService.getMerchants(merchantVo);
			map.put("merchantList", merchantList);
		} catch (Exception e) {
			LOG.error("catch an exception in getMerchantList", e);
		}
		return map;
	}
	
	@RequestMapping(value = "/exportServicePackage", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, String> exportServicePackage(ServicePackages servicePackages) {
		String downUrl = null;
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Map<String, String> map = new HashMap<String, String>();
		long startTime = System.currentTimeMillis();
		PageResult result = new PageResult();
		try {
			//获取渠道列表
			List<Configuration> configurationsList=goodsService.queryChannelList();
			
			//查询套餐列表
			ServicePackage servicePackageQuery=servicePackages.copy();
			ServicePackageQuery query=new ServicePackageQuery();
			query.setCardTypeId(servicePackages.getCardName());
			query.setStartTime(servicePackages.getStartTime()==null?null:sdf.parse(servicePackages.getStartTime()));
			query.setEndTime(servicePackages.getEndTime()==null?null:sdf.parse(servicePackages.getEndTime()));
			query.setQueryText(servicePackages.getQueryText());
			query.setMerchantId(servicePackages.getMerchantList()==null?null:Integer.parseInt(servicePackages.getMerchantList()));
			query.setPageNo(1);
			query.setPageSize(100000);
			List<ServicePackage> list=new ArrayList<ServicePackage>();			
			if(servicePackages.getDeviceIds()==null){//没有输入设备id或者名称			
				result =commonQueryService.getServicePackages(servicePackageQuery, query);
				list=(List<ServicePackage>)result.getData();
			}else if(servicePackages.getDeviceIds()!=null
					&&!servicePackages.getDeviceIds().equals("")){//输入了设备id或者根据设备名称能反查到设备id
				List<Integer> deviceIdList=JSON.parseArray(servicePackages.getDeviceIds(),Integer.class);
				query.setDeviceIds(deviceIdList);				
				result =commonQueryService.getServicePackages(servicePackageQuery, query);
				list=(List<ServicePackage>)result.getData();
			}	
			List<ServicePackageExcel> excelList=new ArrayList<ServicePackageExcel>();
			for(ServicePackage servicePackage:list){				
				ServicePackageExcel spExcel=new ServicePackageExcel();
				BeanUtils.copyProperties(spExcel, servicePackage);
				 //上架状态: 1 草稿， 2 上架， 3 下架
                if (servicePackage.getShelveStatus() != null) {
                    if (servicePackage.getShelveStatus()==1) {
                    	spExcel.setShelveStatus("草稿");
                    } else if (servicePackage.getShelveStatus()==2) {
                    	spExcel.setShelveStatus("上架");
                    } else if (servicePackage.getShelveStatus()==3) {
                    	spExcel.setShelveStatus("下架");
                    }
                }
                
                //有效期单位
                if(servicePackage.getValidityPeriodUnit()!=null){
                	if(servicePackage.getValidityPeriodUnit().equals("forever")){
                		spExcel.setValidityPeriodUnit("永久有效");
                    }else if(servicePackage.getValidityPeriodUnit().equals("year")){
                    	spExcel.setValidityPeriodUnit("年");
                    }else if(servicePackage.getValidityPeriodUnit().equals("month")){
                    	spExcel.setValidityPeriodUnit("月");
                    }
                }
                //处理有效期的值
                if(servicePackage.getValidityPeriod()!=null&&servicePackage.getValidityPeriod()==0){
                	spExcel.setValidityPeriod(null);
                }
                //获取渠道名称
                if(servicePackage.getLabelId()!=null){
                	for(Configuration configuration:configurationsList){
                		if(servicePackage.getLabelId().equals(configuration.getConf_id())){
                			spExcel.setLabelName(configuration.getConf_value());
                		}
                	}
                }
                //处理日期
                spExcel.setCreateTime(servicePackage.getCreateTime()==null?null:sdf.format(servicePackage.getCreateTime()));
                excelList.add(spExcel);
			}
			downUrl = outServiceExec.excelServicePath(excelList,2);           
			map.put("url", downUrl);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOG.warn("服务套餐导出excel总耗时:"+(System.currentTimeMillis()-startTime)+"ms");
		return map;
	}
}
