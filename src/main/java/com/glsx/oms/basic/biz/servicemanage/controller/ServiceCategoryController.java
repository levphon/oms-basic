package com.glsx.oms.basic.biz.servicemanage.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import org.oreframework.boot.security.UserInfoHolder;
import org.oreframework.boot.security.cas.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.alibaba.dubbo.config.annotation.Reference;
import com.glsx.cloudframework.exception.ServiceException;
import com.glsx.oms.basic.biz.servicemanage.model.ServiceCategory;
import com.glsx.oms.basic.biz.servicemanage.model.vo.ServiceCategoryVo;
import com.glsx.oms.basic.framework.config.ServiceManageProperty;
import com.glsx.platform.goods.common.entity.ServiceClassfication;
import com.glsx.platform.goods.common.service.CommonQueryService;
import com.glsx.platform.goods.common.service.ServiceClassficationService;
import com.glsx.platform.goods.common.service.ServiceDefinitionService;

/**
 * @author Lenovo 服务分类Controller层
 */
@RestController
@RequestMapping(value = "/ServiceCategory")
public class ServiceCategoryController {
	/**
	 * LOG
	 */
	private static final Logger LOG = LoggerFactory.getLogger(ServiceCategoryController.class);

	/**
	 * dubbo服务分类service
	 */
	@Reference(version="1.0.0")
	private ServiceClassficationService serviceClassficationServices;
	
	/**
	 * dubbo 单服务service
	 */
	@Reference(version="1.0.0")
	private ServiceDefinitionService serviceDefinitionServices;
	
	/**
	 * 公共查询服务
	 */
	@Reference(version="1.0.0")
	private CommonQueryService commonQueryService;
	
	/**
	 * 静态变量配置类
	 */
	@Autowired
	private ServiceManageProperty ServiceManageProperty;
	@Autowired
	private UserInfoHolder userInfoHolder;

	@SuppressWarnings("unchecked")
	@RequestMapping("/findTree")
	@ResponseBody
	public List<ServiceCategoryVo> findTree() {
		List<ServiceCategoryVo> treeList = new ArrayList<ServiceCategoryVo>();
		try {
			// parentList=serviceCategoryService.queryParent();
			List<ServiceClassfication> parentList = commonQueryService.getRootServiceClassfications(ServiceManageProperty.getServiceCategoryRootId());
			ServiceCategoryVo treeVo = null;
			for (ServiceClassfication bo : parentList) {
				// ChildList=serviceCategoryService.queryChild(bo);
				List<ServiceClassfication> childList = (List<ServiceClassfication>) commonQueryService
						.getChildrenServiceClassfications(bo.getId(), null).getData();
				for (ServiceClassfication child : childList) {
						treeVo = new ServiceCategoryVo();
						treeVo.setId(child.getId());
						treeVo.setParent(child.getParentId().equals(ServiceManageProperty.getServiceCategoryRootId()) ? "#" : String.valueOf(child.getParentId()));
						treeVo.setText(child.getName());
						treeVo.setType(child.getType());
						treeList.add(treeVo);
				}
			}
		} catch (ServiceException e) {
			LOG.error("findTree ServiceException:"+e);
		} catch (Exception e1) {
			LOG.error("findTree Exception:"+e1);
		}
		return treeList;
	}

	@RequestMapping("/findById")
	@ResponseBody
	public ServiceCategory findById(Integer id) {
		ServiceCategory serviceCategory=new ServiceCategory();
		try {
			//serviceCategory = serviceCategoryService.queryById(serviceCategory);
			ServiceClassfication serviceClassfication = serviceClassficationServices.findById(id);
			Integer count=serviceDefinitionServices.getServiceCountByServiceClassficationId(id);
			serviceCategory=serviceCategory.copy(serviceClassfication);
			serviceCategory.setServiceCount(count==null?0:count);	
		} catch (ServiceException e) {
			LOG.error("findById ServiceException:"+e);
		} catch (Exception e1) {
			LOG.error("findById Exception:"+e1);
		}
		return serviceCategory;
	}

	@RequestMapping("/save")
	@ResponseBody
	public ServiceCategory save(ServiceCategory serviceCategory, HttpServletRequest request) {
		try {
			User userInfo = userInfoHolder.getUserInfo(request.getParameter("jsessionid"));
			ServiceClassfication serviceClassfication = serviceCategory.copy();
			serviceClassfication.setUpdateBy(userInfo.getUsername());
			serviceClassfication.setCreateBy(userInfo.getUsername());
			serviceCategory.setId(serviceClassficationServices.save(serviceClassfication));		
		} catch (ServiceException e) {
			LOG.error("save ServiceException:"+e);
		} catch (Exception e1) {
			LOG.error("save Exception:"+e1);
		}
		return serviceCategory;
	}

	@RequestMapping("/update")
	@ResponseBody
	public ServiceCategory update(ServiceCategory serviceCategory, HttpServletRequest request) {
		try {
			User userInfo = userInfoHolder.getUserInfo(request.getParameter("jsessionid"));
			ServiceClassfication serviceClassfication = serviceCategory.copy();
			serviceClassfication.setUpdateBy(userInfo.getUsername());
			serviceClassficationServices.update(serviceClassfication);
		}catch (ServiceException e) {
			LOG.error("update ServiceException:"+e);
		}catch (Exception e1) {
			LOG.error("update Exception:"+e1);
		}
		return serviceCategory;
	}

	@RequestMapping("/del")
	@ResponseBody
	public Map<String, Boolean> del(ServiceCategory serviceCategory) {
		Map<String, Boolean> map = new HashMap<String, Boolean>();
		try {
			ServiceClassfication serviceClassfication = serviceCategory.copy();
			serviceClassficationServices.delete(serviceClassfication.getId());
			map.put("result", true);
			// serviceCategoryMapper.delete(serviceCategory);
		}catch (ServiceException e) {
			LOG.error("del ServiceException:"+e);
			map.put("result", false);
		}catch (Exception e1) {
			LOG.error("del Exception:"+e1);
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
	public Map<String, Boolean> existsByName(ServiceCategory serviceCategory) {
		Map<String, Boolean> map = new HashMap<String, Boolean>();
		try {
			// 调用dubbo
			ServiceClassfication serviceClassfication = serviceCategory.copy();
			boolean result = serviceClassficationServices.existsByName(serviceClassfication.getName());
			LOG.info("判断服务名是否重复:" + serviceClassfication.getName() + "," + result);
			map.put("result", !result);
		}catch (ServiceException e) {
			LOG.error("catch an ServiceException in existsByName", e);
			map.put("result", false);
		} catch (Exception e) {
			LOG.error("catch an Exception in existsByName", e);
			map.put("result", false);
		}
		return map;
	}
}
