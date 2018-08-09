package com.glsx.oms.basic.biz.commoditymanage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.glsx.oms.basic.biz.commoditymanage.mapper.ConfigurationMapper;
import com.glsx.oms.basic.biz.commoditymanage.model.Configuration;


@Service
public class GoodsService 
{
    
    @Autowired
    private ConfigurationMapper configurationMapper;
    
    public List<Configuration> queryChannelList(){
        return configurationMapper.queryChannelList();
        
    }
	

}
