package com.glsx.oms.basic.biz.servicemanage.model.vo;

/**
 * 绑定供应商列表vo类
 * 
 * @author Lenovo
 *
 */
public class MerchantsVo {
    
	private Integer id;
	private Integer merchantId;
    private String merchantName;
    private Integer associateId;
	private Integer type;
    
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getMerchantId() {
		return merchantId;
	}
	public void setMerchantId(Integer merchantId) {
		this.merchantId = merchantId;
	}
	public String getMerchantName() {
		return merchantName;
	}
	public void setMerchantName(String merchantName) {
		this.merchantName = merchantName;
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
	
	public MerchantsVo(Integer id,Integer merchantId,String merchantName,Integer associateId,Integer type){
         this.id=id;
         this.merchantId=merchantId;
         this.merchantName=merchantName;
         this.associateId=associateId;
         this.type=type;
	}
	public MerchantsVo(){}
}
