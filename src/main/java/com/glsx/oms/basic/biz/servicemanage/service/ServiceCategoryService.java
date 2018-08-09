package com.glsx.oms.basic.biz.servicemanage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.glsx.oms.basic.biz.servicemanage.mapper.ServiceCategoryMapper;
import com.glsx.oms.basic.biz.servicemanage.model.ServiceCategory;

@Service
public class ServiceCategoryService {

	@Autowired
	private ServiceCategoryMapper serviceCategoryMapper;

	public ServiceCategory queryById(ServiceCategory serviceCategory) {
		return serviceCategoryMapper.queryById(serviceCategory);
	}

	public List<ServiceCategory> queryParent() {
		return serviceCategoryMapper.queryParent();
	}

	public List<ServiceCategory> queryChild(ServiceCategory serviceCategory) {
		return serviceCategoryMapper.queryChild(serviceCategory);
	}
}
