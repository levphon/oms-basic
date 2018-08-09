package com.glsx.oms.basic.biz.servicemanage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.glsx.oms.basic.biz.servicemanage.mapper.LabelMapper;
import com.glsx.oms.basic.biz.servicemanage.model.Label;
@Service
public class LabelService {

    @Autowired
    private LabelMapper labelMapper;
    
    public List<Label> queryList(Label label){
        return labelMapper.queryList(label);
    }
    
    public Label queryById(Label label){
    	return labelMapper.queryById(label);
    }
}
