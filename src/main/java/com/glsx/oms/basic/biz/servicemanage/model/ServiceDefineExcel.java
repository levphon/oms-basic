package com.glsx.oms.basic.biz.servicemanage.model;

import org.oreframework.commons.office.poi.zslin.utils.ExcelResources;

public class ServiceDefineExcel {
	
	/**
	 * 服务编号
	 */
	private Integer id;
	/**
	 * 服务名称
	 */	
	private String name;	
	/**
	 * 分类名称
	 */
	private String serviceClassficationName;

	/**
	 * 服务标签名称
	 */
	private String serviceTagName;
	
	/**
	 * 计费方式
	 */
    private String billing;

	/**
	 * 服务供应商名称
	 */
	private String supplierName;
	/**
	 * 数量单位:次、台、M
	 */
	private String quantityUnit;
	/**
	 * 数量值
	 */
	private Integer quantity;
	/**
	 * 有效期单位
	 */
	private String validityPeriodUnit;	
	/**
	 * 有效期值
	 */
	private Integer validityPeriod;
	
	/**
	 * 服务的状态
	 */
	private String shelveStatus;
	
	/**
	 * 服务描述
	 */
	private String description;
	
	/**
	 * 创建人
	 */
	private String createBy;
	/**
	 * 创建时间
	 */
	private String createTime;
	

	@ExcelResources(title="服务编号",order=1)
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	@ExcelResources(title="服务名称",order=2)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	@ExcelResources(title="分类名称",order=3)
	public String getServiceClassficationName() {
		return serviceClassficationName;
	}

	public void setServiceClassficationName(String serviceClassficationName) {
		this.serviceClassficationName = serviceClassficationName;
	}
	@ExcelResources(title="标签名称",order=4)
	public String getServiceTagName() {
		return serviceTagName;
	}

	public void setServiceTagName(String serviceTagName) {
		this.serviceTagName = serviceTagName;
	}
	
	@ExcelResources(title="计费方式",order=5)
	public String getBilling() {
		return billing;
	}
	public void setBilling(String billing) {
		this.billing = billing;
	}
	@ExcelResources(title="服务供应商名称",order=6)
	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}
	@ExcelResources(title="数量单位(次、台、M)",order=7)
	public String getQuantityUnit() {
		return quantityUnit;
	}

	public void setQuantityUnit(String quantityUnit) {
		this.quantityUnit = quantityUnit;
	}
	@ExcelResources(title="数量",order=8)
	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	@ExcelResources(title="有效期单位",order=9)
	public String getValidityPeriodUnit() {
		return validityPeriodUnit;
	}

	public void setValidityPeriodUnit(String validityPeriodUnit) {
		this.validityPeriodUnit = validityPeriodUnit;
	}
	@ExcelResources(title="有效期",order=10)
	public Integer getValidityPeriod() {
		return validityPeriod;
	}

	public void setValidityPeriod(Integer validityPeriod) {
		this.validityPeriod = validityPeriod;
	}
	@ExcelResources(title="状态",order=11)
	public String getShelveStatus() {
		return shelveStatus;
	}

	public void setShelveStatus(String shelveStatus) {
		this.shelveStatus = shelveStatus;
	}
	@ExcelResources(title="描述",order=12)
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	@ExcelResources(title="创建人",order=13)
	public String getCreateBy() {
		return createBy;
	}
	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}
	@ExcelResources(title="创建时间",order=14)
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
}
