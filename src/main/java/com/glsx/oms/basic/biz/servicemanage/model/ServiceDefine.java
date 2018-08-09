package com.glsx.oms.basic.biz.servicemanage.model;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;
import com.glsx.platform.goods.common.entity.ServiceDefinition;

/**
 * 服务bean
 * platform_service_definition
 */
public class ServiceDefine implements Serializable {
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 6542406019433465522L;
	
	
	private Integer id;
	/**
	 * 服务名称
	 */
	private String name;	
	/**
	 * 服务分类ID
	 */
	private Integer serviceClassficationId;
	/**
	 * 服务名称
	 */
	private String serviceClassficationName;
	/**
	 * 服务标签ID
	 */
	private Integer serviceTagId;
	/**
	 * 服务标签名称
	 */
	private String serviceTagName;
	/**
	 * 服务供应商ID
	 */
	private Integer supplierId;
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
	private Integer shelveStatus;
	
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
	/**
	 * 修改人
	 */
	private String updateBy;
	/**
	 * 修改时间
	 */
	private String updateTime;
	
	
	//条件查询字段
	/**
	 * 开始时间
	 */
	private String startTime;
	/**
	 * 结束时间
	 */
	private String endTime;
	
	/**
	 * 查询类型:1 服务，2 设备
	 */
	private int queryType;	

	/**
	 * 查询服务ID/名称
	 */
	private String queryText;
	
	/**
	 * 查询设备ID
	 */ 
	private String deviceIds; 

	/**
	 * 上下架操作判断
	 */
	private String updown;
	
	
	//添加服务时保存的字段
	/**
	 * 服务列表
	 */
	private String appList;
	/**
	 * 设备列表
	 */
	private String deviceList;
    /**
     * 重庆联通卡
     */
    private int cqltCard;
    /**
     * 广联繁睿卡
     */
    private int glfrCard;
    
    /**
	 * 流量套餐列表
	 */
	private String flowPackageList;
        
  
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getServiceClassficationId() {
		return serviceClassficationId;
	}
	public void setServiceClassficationId(Integer serviceClassficationId) {
		this.serviceClassficationId = serviceClassficationId;
	}
	public String getServiceClassficationName() {
		return serviceClassficationName;
	}
	public void setServiceClassficationName(String serviceClassficationName) {
		this.serviceClassficationName = serviceClassficationName;
	}
	public Integer getServiceTagId() {
		return serviceTagId;
	}
	public void setServiceTagId(Integer serviceTagId) {
		this.serviceTagId = serviceTagId;
	}
	public String getServiceTagName() {
		return serviceTagName;
	}
	public void setServiceTagName(String serviceTagName) {
		this.serviceTagName = serviceTagName;
	}
	public Integer getSupplierId() {
		return supplierId;
	}
	public void setSupplierId(Integer supplierId) {
		this.supplierId = supplierId;
	}
	public String getSupplierName() {
		return supplierName;
	}
	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}
	
	public String getQuantityUnit() {
		return quantityUnit;
	}
	public void setQuantityUnit(String quantityUnit) {
		this.quantityUnit = quantityUnit;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public String getValidityPeriodUnit() {
		return validityPeriodUnit;
	}
	public void setValidityPeriodUnit(String validityPeriodUnit) {
		this.validityPeriodUnit = validityPeriodUnit;
	}
	public Integer getValidityPeriod() {
		return validityPeriod;
	}
	public void setValidityPeriod(Integer validityPeriod) {
		this.validityPeriod = validityPeriod;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Integer getShelveStatus() {
		return shelveStatus;
	}
	public void setShelveStatus(Integer shelveStatus) {
		this.shelveStatus = shelveStatus;
	}
	public String getCreateBy() {
		return createBy;
	}
	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getUpdateBy() {
		return updateBy;
	}
	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public int getQueryType() {
		return queryType;
	}
	public void setQueryType(int queryType) {
		this.queryType = queryType;
	}
	public String getQueryText() {
		return queryText;
	}
	public void setQueryText(String queryText) {
		this.queryText = queryText;
	}
	public String getDeviceIds() {
		return deviceIds;
	}
	public void setDeviceIds(String deviceIds) {
		this.deviceIds = deviceIds;
	}
	public String getUpdown() {
		return updown;
	}
	public void setUpdown(String updown) {
		this.updown = updown;
	}
	public String getAppList() {
		return appList;
	}
	public void setAppList(String appList) {
		this.appList = appList;
	}
	public String getDeviceList() {
		return deviceList;
	}
	public void setDeviceList(String deviceList) {
		this.deviceList = deviceList;
	}
	public int getCqltCard() {
		return cqltCard;
	}
	public void setCqltCard(int cqltCard) {
		this.cqltCard = cqltCard;
	}
	public int getGlfrCard() {
		return glfrCard;
	}
	public void setGlfrCard(int glfrCard) {
		this.glfrCard = glfrCard;
	}
	public String getFlowPackageList() {
	    return flowPackageList;
	}
	public void setFlowPackageList(String flowPackageList) {
		this.flowPackageList = flowPackageList;
	}
	public ServiceDefine copy(ServiceDefinition sf) throws Exception{
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		if(sf==null){
		   sf=new ServiceDefinition();
		}
		this.setId(sf.getId());
		this.setName(sf.getName());
		this.setServiceClassficationId(sf.getServiceClassficationId());
		this.setServiceClassficationName(sf.getServiceClassficationName()==null?"":sf.getServiceClassficationName());
		this.setServiceTagId(sf.getServiceTagId());
		this.setServiceTagName(sf.getServiceTagName()==null?"":sf.getServiceTagName());
		this.setSupplierId(sf.getSupplierId());
		this.setQuantity(sf.getQuantity());
		this.setQuantityUnit(sf.getQuantityUnit());
		this.setValidityPeriod(sf.getValidityPeriod());
		this.setValidityPeriodUnit(sf.getValidityPeriodUnit());
		this.setShelveStatus(sf.getShelveStatus());
		this.setDescription(sf.getDescription());
		this.setCreateBy(sf.getCreateBy());
		this.setCreateTime(sf.getCreateTime()==null?"":sdf.format(sf.getCreateTime()));
		this.setUpdateBy(sf.getUpdateBy());
		this.setUpdateTime(sf.getUpdateTime()==null?"":sdf.format(sf.getUpdateTime()));
		return this;
	}
	public ServiceDefinition copy() throws Exception{
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		ServiceDefinition sd=new ServiceDefinition();
		sd.setId(this.getId());
		sd.setName(this.getName());
		sd.setServiceClassficationId(this.getServiceClassficationId());
		sd.setServiceClassficationName(this.getServiceClassficationName());
		sd.setServiceTagId(this.getServiceTagId());
		sd.setServiceTagName(this.getServiceTagName());
		sd.setSupplierId(this.getSupplierId());
		sd.setQuantity(this.getQuantity());
		sd.setQuantityUnit(this.getQuantityUnit());
		sd.setValidityPeriod(this.getValidityPeriod());
		sd.setValidityPeriodUnit(this.getValidityPeriodUnit());
		sd.setShelveStatus(this.getShelveStatus());
		sd.setDescription(this.getDescription());
		sd.setCreateBy(this.getCreateBy());
		sd.setCreateTime(this.getCreateTime()==null?null:sdf.parse(this.getCreateTime()));
		sd.setUpdateBy(this.getUpdateBy());
		sd.setUpdateTime(this.getUpdateTime()==null?null:sdf.parse(this.getUpdateTime()));
		return sd;
	}
	
	
	public String toString(){
		return ToStringBuilder.reflectionToString(this);
	}
}
