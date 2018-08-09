package com.glsx.oms.basic.biz.servicemanage.model.vo;

/**
 * 绑定应用列表vo类
 * 
 * @author Lenovo
 *
 */
public class DeviceVo {
    
	
	private Integer id;
	private Integer deviceId;
	private String deviceName;
    private String supplierName;
    private Integer associateId;
	private Integer type;
    
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(Integer deviceId) {
		this.deviceId = deviceId;
	}
	public String getDeviceName() {
		return deviceName;
	}
	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}
	public String getSupplierName() {
		return supplierName;
	}
	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
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
	public DeviceVo(Integer id,Integer deviceId,String deviceName,String supplierName,Integer associateId,Integer type){
         this.id=id;
         this.deviceId=deviceId;
         this.deviceName=deviceName;
         this.supplierName=supplierName;
         this.associateId=associateId;
         this.type=type;
	}
	public DeviceVo(){}
}
