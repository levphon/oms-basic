package com.glsx.oms.basic.biz.servicemanage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.glsx.oms.basic.biz.servicemanage.model.Label;

@Mapper
public interface LabelMapper
{
	//标签列表查询
  public List<Label> queryList(Label label);
  
  	//标签详情查询
  public Label queryById(Label label);
}
