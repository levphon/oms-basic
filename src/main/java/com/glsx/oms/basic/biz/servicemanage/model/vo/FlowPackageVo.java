package com.glsx.oms.basic.biz.servicemanage.model.vo;

/**
 * 绑定流量列表vo类
 * 
 * @author Lenovo
 *
 */
public class FlowPackageVo {
	private Integer id;
	private Integer flowPackageId;
	private Integer associateId;
	private Integer type;

	/**
	 * 套餐名称
	 */
	private String packageName;
	/**
	 * 套餐类别 0=流量套餐/1=流量包
	 */
	private String packageCategory;
	/**
	 * 计费方式 (0=累计/1=分离)
	 */
	private String billingMethods;
	/**
	 * 增值流量类型:0=总流量/1=月付流量
	 */
	private String addedFlowType;
	/**
	 * 基础流量类型:0=总流量/1=月付流量
	 */
	private String basicFlowType;
	/**
	 * 增值总流量(单位:M)
	 */
	private String totalAddedFlow;
	/**
	 * 基础总流量(单位:M)
	 */
	private String totalBasicFlow;
	/**
	 * 增值是否无限流量(0=有限流量/1=无限流量)
	 */
	private String addedIsUnlimitFlow;
	/**
	 * 基础是否无限流量(0=有限流量/1=无限流量)
	 */
	private String basicIsUnlimitFlow;
	/**
	 * 增值月付流量(单位:M)
	 */
	private String addedMonthTotalflow;
	/**
	 * 基础月付流量(单位:M)
	 */
	private String basicMonthTotalflow;
	
	/**
	 * 增值期数
	 */
	private String addedPeriods;
	/**
	 * 基础期数
	 */
	private String basicPeriods;
	/**
	 * 设置有效期
	 */
	private String validityPeriod;
	/**
	 * 设置有效期天数月/日
	 */
	private String validityPeriodUnit;
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getFlowPackageId() {
		return flowPackageId;
	}

	public void setFlowPackageId(Integer flowPackageId) {
		this.flowPackageId = flowPackageId;
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

	public String getPackageName() {
		return packageName;
	}

	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}

	public String getPackageCategory() {
		return packageCategory;
	}

	public void setPackageCategory(String packageCategory) {
		packageCategory = packageCategory == null ? "" : packageCategory;
		switch (packageCategory) {
		case "0":
			this.packageCategory = "流量套餐";
			break;
		case "1":
			this.packageCategory = "流量包";
			break;
		default:
			this.packageCategory = "--";
			break;
		}
	}

	public String getBillingMethods() {
		return billingMethods;
	}

	public void setBillingMethods(String billingMethods) {
		billingMethods = billingMethods == null ? "" : billingMethods;
		switch(billingMethods){
			case "0":
				this.billingMethods = "累计";
				break;
			case "1":
				this.billingMethods = "分离";
				break;
			default:
				this.billingMethods="--";
				break;
		}
	}

	public String getAddedFlowType() {
		return addedFlowType;
	}

	public void setAddedFlowType(String addedFlowType) {
		addedFlowType = addedFlowType == null ? "" : addedFlowType;
		switch(addedFlowType){
			case "0":
				this.addedFlowType = "总流量";
				break;
			case "1":
				this.addedFlowType = "月付流量";
				break;
			default:
				this.addedFlowType="--";
				break;
		}
	}

	public String getBasicFlowType() {
		return basicFlowType;
	}

	public void setBasicFlowType(String basicFlowType) {
		basicFlowType = basicFlowType == null ? "" : basicFlowType;
		switch(basicFlowType){
			case "0":
				this.basicFlowType = "总流量";
				break;
			case "1":
				this.basicFlowType = "月付流量";
				break;
			default:
				this.basicFlowType="--";
				break;
		}
	}

	public String getTotalAddedFlow() {
		return totalAddedFlow;
	}

	public void setTotalAddedFlow(String totalAddedFlow) {
		this.totalAddedFlow = totalAddedFlow;
	}

	public String getTotalBasicFlow() {
		return totalBasicFlow;
	}

	public void setTotalBasicFlow(String totalBasicFlow) {
		this.totalBasicFlow = totalBasicFlow;
	}

	public String getValidityPeriod() {
		return validityPeriod;
	}

	public void setValidityPeriod(String validityPeriod) {
		this.validityPeriod = validityPeriod;
	}

	public String getValidityPeriodUnit() {
		return validityPeriodUnit;
	}

	public void setValidityPeriodUnit(String validityPeriodUnit) {
		this.validityPeriodUnit = validityPeriodUnit;
	}

	public String getAddedIsUnlimitFlow() {
		return addedIsUnlimitFlow;
	}

	public void setAddedIsUnlimitFlow(String addedIsUnlimitFlow) {
		addedIsUnlimitFlow = addedIsUnlimitFlow == null ? "" : addedIsUnlimitFlow;
		switch(addedIsUnlimitFlow){
			case "1":
				this.addedIsUnlimitFlow = "无限流量";
				break;
			default:
				this.addedIsUnlimitFlow="--";
				break;
		}
	}

	public String getBasicIsUnlimitFlow() {
		return basicIsUnlimitFlow;
	}

	public void setBasicIsUnlimitFlow(String basicIsUnlimitFlow) {
		basicIsUnlimitFlow = basicIsUnlimitFlow == null ? "" : basicIsUnlimitFlow;
		switch(basicIsUnlimitFlow){
		case "1":
			this.basicIsUnlimitFlow = "无限流量";
			break;
		default:
			this.basicIsUnlimitFlow="--";
			break;
		}
	}

	public String getAddedMonthTotalflow() {
		return addedMonthTotalflow;
	}

	public void setAddedMonthTotalflow(String addedMonthTotalflow) {
		this.addedMonthTotalflow = addedMonthTotalflow;
	}

	public String getBasicMonthTotalflow() {
		return basicMonthTotalflow;
	}

	public void setBasicMonthTotalflow(String basicMonthTotalflow) {
		this.basicMonthTotalflow = basicMonthTotalflow;
	}

	public String getAddedPeriods() {
		return addedPeriods;
	}

	public void setAddedPeriods(String addedPeriods) {
		this.addedPeriods = addedPeriods;
	}

	public String getBasicPeriods() {
		return basicPeriods;
	}

	public void setBasicPeriods(String basicPeriods) {
		this.basicPeriods = basicPeriods;
	}

}
