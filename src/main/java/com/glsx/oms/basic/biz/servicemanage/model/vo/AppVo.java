package com.glsx.oms.basic.biz.servicemanage.model.vo;

/**
 * 绑定应用列表vo类
 * 
 * @author Lenovo
 *
 */
public class AppVo {
	private Integer appId;
	private String appCode;
	private String appName;
	private Integer associateId;
	private Integer type;
    
	public Integer getAppId() {
		return appId;
	}
	public void setAppId(Integer appId) {
		this.appId = appId;
	}
	public String getAppCode() {
		return appCode;
	}
	public void setAppCode(String appCode) {
		this.appCode = appCode;
	}
	public String getAppName() {
		return appName;
	}
	public void setAppName(String appName) {
		this.appName = appName;
	}
	public Integer getAssociateId() {
		return associateId;
	}
	public void setAssociateId(Integer associateId) {
		this.associateId = associateId;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public AppVo(Integer appId,String appCode,String appName,Integer associateId,Integer type){
		this.appId=appId;
		this.appCode=appCode;
		this.appName=appName;
		this.associateId=associateId;
		this.type=type;	
	}
	public AppVo (){}
}
