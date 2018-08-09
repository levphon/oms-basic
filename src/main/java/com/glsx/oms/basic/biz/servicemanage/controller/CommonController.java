package com.glsx.oms.basic.biz.servicemanage.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import org.oreframework.boot.security.UserInfoHolder;
import org.oreframework.boot.security.cas.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.alibaba.dubbo.config.annotation.Reference;
import com.glsx.biz.common.user.entity.DeviceCategory;
import com.glsx.biz.common.user.service.DeviceCategoryService;



@RestController
@RequestMapping(value = "/CommonController")
public class CommonController {
	
	/**
	 * 设备类型service
	 */
	@Reference(version="2.2.0",timeout=10000)
	private DeviceCategoryService deviceCategoryService;
	
	@Autowired
	private UserInfoHolder userInfoHolder;
	/**
	 * 获取登录用户名
	 * @return
	 */
	@RequestMapping(value = "/getLoginUser")
	@ResponseBody
	public Map<String, String> getLoginName(HttpServletRequest request) {
		Map<String,String> map=new HashMap<String,String>();
		User userInfo = userInfoHolder.getUserInfo(request.getParameter("jsessionid"));
	    map.put("loginUser",userInfo.getUsername());
		return map;
	}
	/**
	 * 根据设备名称获取设备ID
	 */
	@RequestMapping(value = "/getDeviceIds")
	@ResponseBody
	public Map<String, Object> getDeviceIds(String deviceName) {
		Map<String,Object> map=new HashMap<String,Object>();
		List<Integer> list=new ArrayList<Integer>();
		List<DeviceCategory> deviceList=deviceCategoryService.findByDeviceNameContainer(deviceName);
		for(DeviceCategory deviceCategory:deviceList){
			list.add(deviceCategory.getDeviceId());
		}
	    map.put("deviceIds", list);
		return map;
	}
}
