package com.glsx.oms.basic.biz.servicemanage.model;

import org.oreframework.commons.office.poi.zslin.utils.ExcelResources;

public class ServicePackageExcel {
	
	/**
	 * id
	 */
	private Integer id;
	/**
	 * 服务套餐名
	 */
	private String name;	
	/**
	 * 套餐别名
	 */
	private String alias;
	/**
	 *渠道 名称
	 */
	private String labelName;
	/**
	 * 服务套餐标签
	 */
	private String serviceTagName;
	/**
	 * 有效期单位
	 */
	private String validityPeriodUnit;
	/**
	 * 有效期
	 */
	private Integer validityPeriod;
	/**
	 * 服务套餐的状态
	 */
	private String shelveStatus;	
	/**
	 * 服务套餐描述
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
	
	@ExcelResources(title="服务套餐编号",order=1)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	@ExcelResources(title="服务套餐名称",order=2)
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@ExcelResources(title="服务套餐别名",order=3)
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	@ExcelResources(title="线下销售渠道",order=4)
	public String getLabelName() {
		return labelName;
	}
	public void setLabelName(String labelName) {
		this.labelName = labelName;
	}
	@ExcelResources(title="标签",order=5)
	public String getServiceTagName() {
		return serviceTagName;
	}	
	public void setServiceTagName(String serviceTagName) {
		this.serviceTagName = serviceTagName;
	}
	@ExcelResources(title="有效期单位",order=6)
	public String getValidityPeriodUnit() {
		return validityPeriodUnit;
	}
	public void setValidityPeriodUnit(String validityPeriodUnit) {
		this.validityPeriodUnit = validityPeriodUnit;
	}
	@ExcelResources(title="有效期",order=7)
	public Integer getValidityPeriod() {
		return validityPeriod;
	}
	public void setValidityPeriod(Integer validityPeriod) {
		this.validityPeriod = validityPeriod;
	}
	@ExcelResources(title="状态",order=8)
	public String getShelveStatus() {
		return shelveStatus;
	}
	public void setShelveStatus(String shelveStatus) {
		this.shelveStatus = shelveStatus;
	}
	@ExcelResources(title="描述",order=9)
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	@ExcelResources(title="创建人",order=10)
	public String getCreateBy() {
		return createBy;
	}
	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}
	@ExcelResources(title="创建时间",order=11)
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	
}
