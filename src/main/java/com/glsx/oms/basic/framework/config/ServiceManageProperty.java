package com.glsx.oms.basic.framework.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("serviceManage")
public class ServiceManageProperty
{
	/**
	 * 服务分类的根节点Id
	 */
	private int serviceCategoryRootId;
   
	/**
     * 服务供应商类型
     */
    private int serviceMerchantType;
    
	/**
     * 服务添加流量卡套餐时，获取的可选套餐列表类型
     */
	private String flowPackageCategory;
    
	/**
     * 服务获取应用时对应的平台标识 1:代表运营平台
     */
    private Integer platform;
		

	/**
     * 服务添加应用时，获取的可选应用列表数
     */
    private int appCount;
    /**
     * 服务添加设备时，获取的可选设备列表数
     */
    private int deviceCount;  
    /**
     * 服务套餐供应商类型
     */
    private int servicePackageMerchantType;
    
    public int getServiceCategoryRootId() {
		return serviceCategoryRootId;
	}


	public void setServiceCategoryRootId(int serviceCategoryRootId) {
		this.serviceCategoryRootId = serviceCategoryRootId;
	}
    
    public int getServiceMerchantType() {
		return serviceMerchantType;
	}


	public void setServiceMerchantType(int serviceMerchantType) {
		this.serviceMerchantType = serviceMerchantType;
	}

	public String getFlowPackageCategory() {
		return flowPackageCategory;
	}


	public void setFlowPackageCategory(String flowPackageCategory) {
		this.flowPackageCategory = flowPackageCategory;
	}
     
	public Integer getPlatform() {
		return platform;
	}


	public void setPlatform(Integer platform) {
		this.platform = platform;
	}
	public int getAppCount() {
		return appCount;
	}


	public void setAppCount(int appCount) {
		this.appCount = appCount;
	}


	public int getDeviceCount() {
		return deviceCount;
	}


	public void setDeviceCount(int deviceCount) {
		this.deviceCount = deviceCount;
	}


	public int getServicePackageMerchantType() {
		return servicePackageMerchantType;
	}


	public void setServicePackageMerchantType(int servicePackageMerchantType) {
		this.servicePackageMerchantType = servicePackageMerchantType;
	}
    
}
