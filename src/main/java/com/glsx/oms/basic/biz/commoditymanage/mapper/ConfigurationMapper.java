package com.glsx.oms.basic.biz.commoditymanage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.oreframework.datasource.mybatis.mapper.OreMapper;

import com.glsx.oms.basic.biz.commoditymanage.model.Configuration;

@Mapper
public interface ConfigurationMapper extends OreMapper<Configuration>
{
 
    
    //查询线下渠道
    public List<Configuration> queryChannelList();
    
    
}
