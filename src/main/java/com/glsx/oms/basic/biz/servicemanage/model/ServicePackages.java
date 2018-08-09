package com.glsx.oms.basic.biz.servicemanage.model;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import org.apache.commons.lang.builder.ToStringBuilder;
import com.glsx.platform.goods.common.entity.ServicePackage;

/**
 * 服务套餐bean platform_service_package
 */
public class ServicePackages implements Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -1122579471357430222L;

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
	 * 服务套餐标签ID
	 */
	private Integer serviceTagId;
	/**
	 * 服务套餐标签
	 */
	private String serviceTagName;
	/**
	 * 有效期
	 */
	private Integer validityPeriod;
	/**
	 * 有效期单位
	 */
	private String validityPeriodUnit;
	/**
	 *渠道 Id
	 */
	private Integer labelId; 
	/**
	 * 服务套餐描述
	 */
	private String description;
	/**
	 * 服务套餐的状态
	 */
	private Integer shelveStatus;
	
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

	// 条件查询字段
	/**
	 * 开始时间
	 */
	private String startTime;
	/**
	 * 结束时间
	 */
	private String endTime;
	/**
	 * 查询服务套餐ID/名称
	 */
	private String queryText;
	/**
	 * 查询设备ID
	 */ 
	private String deviceIds; 
	/**
	 * 卡名称的ID
	 */
	private Integer cardName;

	/**
	 * 上下架操作判断
	 */
	private String updown;

	// 添加服务套餐时保存的字段
	private String serviceList;
	private String deviceList;
	private String merchantList;	
	private int cqltCard;
	private int glfrCard;
	private int gl3GCard;
	private int wbCard;

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
    
	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
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

	public Integer getValidityPeriod() {
		return validityPeriod;
	}

	public void setValidityPeriod(Integer validityPeriod) {
		this.validityPeriod = validityPeriod;
	}

	public String getValidityPeriodUnit() {
		return validityPeriodUnit;
	}

	public void setValidityPeriodUnit(String validityPeriodUnit) {
		this.validityPeriodUnit = validityPeriodUnit;
	}
    
	public Integer getLabelId() {
		return labelId;
	}

	public void setLabelId(Integer labelId) {
		this.labelId = labelId;
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

	public String getDeviceIds() {
		return deviceIds;
	}

	public void setDeviceIds(String deviceIds) {
		this.deviceIds = deviceIds;
	}
	
	public String getQueryText() {
		return queryText;
	}

	public void setQueryText(String queryText) {
		this.queryText = queryText;
	}
    
	public Integer getCardName() {
		return cardName;
	}

	public void setCardName(Integer cardName) {
		this.cardName = cardName;
	}
	
	public String getUpdown() {
		return updown;
	}

	public void setUpdown(String updown) {
		this.updown = updown;
	}

	public String getServiceList() {
		return serviceList;
	}

	public void setServiceList(String serviceList) {
		this.serviceList = serviceList;
	}

	public String getDeviceList() {
		return deviceList;
	}

	public void setDeviceList(String deviceList) {
		this.deviceList = deviceList;
	}
	
	public String getMerchantList() {
		return merchantList;
	}

	public void setMerchantList(String merchantList) {
		this.merchantList = merchantList;
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
	public int getGl3GCard() {
		return gl3GCard;
	}

	public void setGl3GCard(int gl3gCard) {
		gl3GCard = gl3gCard;
	}

	public int getWbCard() {
		return wbCard;
	}

	public void setWbCard(int wbCard) {
		this.wbCard = wbCard;
	}
    public ServicePackages copy(ServicePackage sp) throws Exception{
    	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	if(sp==null){
    		sp=new ServicePackage();
 		}
    	this.setId(sp.getId());
    	this.setName(sp.getName());
        this.setAlias(sp.getAlias());
    	this.setServiceTagId(sp.getServiceTagId());
    	this.setServiceTagName(sp.getServiceTagName()==null?"":sp.getServiceTagName());
    	this.setValidityPeriod(sp.getValidityPeriod());
    	this.setValidityPeriodUnit(sp.getValidityPeriodUnit());
    	this.setLabelId(sp.getLabelId());
    	this.setDescription(sp.getDescription());
    	this.setShelveStatus(sp.getShelveStatus());
    	this.setCreateBy(sp.getCreateBy());
		this.setCreateTime(sp.getCreateTime()==null?"":sdf.format(sp.getCreateTime()));
    	this.setUpdateBy(sp.getUpdateBy());
		this.setUpdateTime(sp.getUpdateTime()==null?"":sdf.format(sp.getUpdateTime()));
    	return this; 	
    }
    public ServicePackage copy() throws Exception{
    	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	ServicePackage sp=new ServicePackage();
    	sp.setId(this.getId());
    	sp.setName(this.getName());
    	sp.setAlias(this.getAlias());
    	sp.setServiceTagId(this.getServiceTagId());
    	sp.setServiceTagName(this.getServiceTagName());
    	sp.setValidityPeriod(this.getValidityPeriod());
    	sp.setValidityPeriodUnit(this.getValidityPeriodUnit());
    	sp.setDescription(this.getDescription());
    	sp.setLabelId(this.getLabelId());
    	sp.setShelveStatus(this.getShelveStatus());
    	sp.setCreateBy(this.getCreateBy());
		sp.setCreateTime(this.getCreateTime()==null?null:sdf.parse(this.getCreateTime()));
    	sp.setUpdateBy(this.getUpdateBy());
		sp.setUpdateTime(this.getUpdateTime()==null?null:sdf.parse(this.getUpdateTime()));
    	return sp;
    }
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
}
