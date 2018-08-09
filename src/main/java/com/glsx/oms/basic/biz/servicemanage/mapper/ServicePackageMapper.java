package com.glsx.oms.basic.biz.servicemanage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.oreframework.datasource.mybatis.mapper.OreMapper;

import com.glsx.oms.basic.biz.servicemanage.model.ServiceDefine;
import com.glsx.oms.basic.biz.servicemanage.model.ServicePackages;
@Mapper
public interface ServicePackageMapper extends OreMapper<ServicePackages>
{
	
	public List<ServicePackages> queryList(ServicePackages servicePackages); 
	   
	
	public ServicePackages queryById(ServicePackages servicePackages); 
	
	public List<ServiceDefine> queryServiceDefineById(ServicePackages servicePackages); 
}
