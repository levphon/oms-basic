package com.glsx.oms.basic.biz.servicemanage.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.glsx.oms.basic.biz.servicemanage.mapper.ServicePackageMapper;
import com.glsx.oms.basic.biz.servicemanage.model.ServiceDefine;
import com.glsx.oms.basic.biz.servicemanage.model.ServicePackages;

@Service
public class ServicePackageServices {
	@Autowired
	private ServicePackageMapper servicePackageMapper;
	
	public List<ServicePackages> queryList(ServicePackages servicePackages)
	{
		return servicePackageMapper.queryList(servicePackages);
	}
	public ServicePackages queryById(ServicePackages servicePackages)
	{
		return servicePackageMapper.queryById(servicePackages);
	}
	public List<ServiceDefine> queryServiceDefineById(ServicePackages servicePackages)
	{
		return servicePackageMapper.queryServiceDefineById(servicePackages);
	}
	
}
