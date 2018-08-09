package com.glsx.oms.basic.biz.servicemanage.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import org.oreframework.boot.security.UserInfoHolder;
import org.oreframework.boot.security.cas.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.glsx.cloudframework.exception.ServiceException;
import com.glsx.oms.basic.biz.servicemanage.model.Label;
import com.glsx.platform.goods.common.dto.PageResult;
import com.glsx.platform.goods.common.entity.ServiceTag;
import com.glsx.platform.goods.common.query.ServiceTagQuery;
import com.glsx.platform.goods.common.service.CommonQueryService;
import com.glsx.platform.goods.common.service.ServiceTagService;



/**
 * 服务Controller层
 */
@RestController
@RequestMapping(value = "/Label")
public class LabelController {

	/*
	 * LOG
	 */
	private static final Logger LOG =  LoggerFactory.getLogger(LabelController.class);
	
	@Reference(version="1.0.0")
	private ServiceTagService serviceTagService;
	
	
	@Reference(version="1.0.0")
	private CommonQueryService commonQueryService;
	@Autowired
	private UserInfoHolder userInfoHolder;
	
	
	/**
	 * @param service 服务实体bean	
	 * 
	 * @return Object
	 */
    @RequestMapping(value = "/list")
	@ResponseBody
	public Map<String,Object> list(Label label,
			@RequestParam(required=true,defaultValue="1") Integer currentPage,
            @RequestParam(required=false,defaultValue="10") Integer pageSize) 
	{
    	Map<String,Object> map=new HashMap<String,Object>();
    	PageResult result = null;
    	ServiceTagQuery serviceTagQuery=new ServiceTagQuery();
    	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	try {
    		ServiceTag serviceTag=label.copy();
			serviceTagQuery.setQueryText(label.getQueryText()==null?"":label.getQueryText());
			serviceTagQuery.setPageNo(currentPage);
			serviceTagQuery.setPageSize(pageSize);
			serviceTagQuery.setStartTime(label.getStartTime()==null?null:sdf.parse(label.getStartTime()));
			serviceTagQuery.setEndTime(label.getEndTime()==null?null:sdf.parse(label.getEndTime()));
			result=commonQueryService.getServiceTags(serviceTag,serviceTagQuery);
			long recordsTotal=result.getCount();
			map.put("data", result.getData());
			map.put("recordsTotal", recordsTotal);
			map.put("draw",recordsTotal);
			map.put("recordsFiltered", recordsTotal);
		}catch (ServiceException e) {
			LOG.error("catch an serviceException in queryList", e);
		}catch (Exception e1) {
			LOG.error("catch an exception in queryList", e1);
		}
		return map;
	}
	
    /**
	 * @param service
	 *            服务实体bean
	 * @return Object
	 */
	@RequestMapping(value = "/toAdd")
	public Map<String, Object> toAdd(Label label) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			ServiceTag serviceTag=label.copy();
			//调用dubobo
			if(label.getId()!=null){
				serviceTag=serviceTagService.findById(serviceTag.getId());
			}
			map.put("serviceTag", serviceTag);
		}catch(ServiceException e){
			LOG.error("catch an serviceException in toAdd", e);
		}catch (Exception e1) {
			LOG.error("catch an exception in toAdd", e1);
		}
		return map;
	}
	/**
	 * @param service
	 *            服务实体bean
	 * @return Object
	 */
	@RequestMapping(value = "/add")
	public Map<String, Boolean> add(Label label, HttpServletRequest request) {
		Map<String, Boolean> map = new HashMap<String, Boolean>();		
		User userInfo = userInfoHolder.getUserInfo(request.getParameter("jsessionid"));
		try {
			ServiceTag serviceTag=label.copy();			
			// 调用dubbo
		    if(serviceTag.getId()==null){
		    	 serviceTag.setCreateBy(userInfo.getUsername());
				 serviceTag.setUpdateBy(userInfo.getUsername());
		    	 serviceTagService.save(serviceTag);
			}else{
				serviceTag.setUpdateBy(userInfo.getUsername());
				serviceTagService.update(serviceTag);
				
			}
			map.put("result",true);
		}catch (ServiceException e) {
			LOG.error("catch an serviceException in add", e);
			map.put("result", false);
		}catch (Exception e1) {
			LOG.error("catch an exception in add", e1);
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
	public Map<String, Boolean> delete(Label label) {
		Map<String, Boolean> map = new HashMap<String, Boolean>();		
		try {
			ServiceTag serviceTag=label.copy();
			// 调用dubbo
			serviceTagService.delete(serviceTag.getId());
			map.put("result", true);
		}catch(ServiceException e){
			LOG.error("catch an serviceException in delete", e);
			map.put("result", false);
		}catch (Exception e1) {
			LOG.error("catch an exception in delete", e1);
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
	public Map<String, Boolean> existsByName(Label label) {
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		label.setCreateTime(sdf.format(new Date()));
		label.setUpdateTime(sdf.format(new Date()));
		Map<String, Boolean> map = new HashMap<String, Boolean>();		
		try {
			ServiceTag serviceTag=label.copy();
			// 调用dubbo
			boolean result=serviceTagService.existsByName(serviceTag.getName());
			LOG.info("判断标签名是否重复:"+serviceTag.getName()+result);		
			map.put("result", !result);
		}catch (ServiceException e) {
			LOG.error("catch an serviceException in delete", e);
			map.put("result", false);
		}catch (Exception e1) {
			LOG.error("catch an exception in delete", e1);
			map.put("result", false);
		}
		return map;
	}
}

