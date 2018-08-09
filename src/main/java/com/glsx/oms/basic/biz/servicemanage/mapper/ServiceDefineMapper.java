package com.glsx.oms.basic.biz.servicemanage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.oreframework.datasource.mybatis.mapper.OreMapper;

import com.glsx.oms.basic.biz.servicemanage.model.ServiceDefine;
import com.glsx.oms.basic.biz.servicemanage.model.vo.AppVo;
import com.glsx.oms.basic.biz.servicemanage.model.vo.DeviceVo;

@Mapper
public interface ServiceDefineMapper extends OreMapper<ServiceDefine>
{
   //服务列表查询
   public List<ServiceDefine> queryList(ServiceDefine serviceDefine); 
   
   //查询服务详情
   public ServiceDefine queryById(ServiceDefine serviceDefine);
   
   public List<Integer> queryCardById(int id); 
   
   public List<AppVo> queryAppById(int id); 
   
   public List<DeviceVo> queryDeviceById(int id); 
}
