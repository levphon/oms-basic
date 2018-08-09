package com.glsx.oms.basic.biz.servicemanage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.oreframework.datasource.mybatis.mapper.OreMapper;

import com.glsx.oms.basic.biz.servicemanage.model.ServiceCategory;


@Mapper
public interface ServiceCategoryMapper extends OreMapper<ServiceCategory>
{
    public ServiceCategory queryById(ServiceCategory serviceCategory);
      
    public List<ServiceCategory> queryParent();
    
    public List<ServiceCategory> queryChild(ServiceCategory serviceCategory);
     
    public int insert(ServiceCategory serviceCategory);
    
    public int delete(ServiceCategory serviceCategory);
    
    public int update(ServiceCategory serviceCategory);
}
