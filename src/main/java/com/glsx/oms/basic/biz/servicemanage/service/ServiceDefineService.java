package com.glsx.oms.basic.biz.servicemanage.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.glsx.oms.basic.biz.servicemanage.mapper.ServiceDefineMapper;
import com.glsx.oms.basic.biz.servicemanage.model.ServiceDefine;
import com.glsx.oms.basic.biz.servicemanage.model.vo.AppVo;
import com.glsx.oms.basic.biz.servicemanage.model.vo.DeviceVo;




@Service
public class ServiceDefineService 
{
	@Autowired
	private ServiceDefineMapper serviceMapper;
	
	public List<ServiceDefine> queryList(ServiceDefine serviceDefine)
	{
		return serviceMapper.queryList(serviceDefine);
	}
	public ServiceDefine queryById(ServiceDefine serviceDefine)
	{
		return serviceMapper.queryById(serviceDefine);
	}
	public List<Integer> queryCardById(int id)
	{
		return serviceMapper.queryCardById(id);
	}
	public List<AppVo> queryAppById(int id)
	{
		return serviceMapper.queryAppById(id);
	}
	public List<DeviceVo> queryDeviceById(int id)
	{
		return serviceMapper.queryDeviceById(id);
	}

}
