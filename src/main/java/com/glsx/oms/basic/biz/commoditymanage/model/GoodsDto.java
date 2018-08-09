package com.glsx.oms.basic.biz.commoditymanage.model;





import com.glsx.platform.goods.common.entity.MallGoodsImages;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


public class GoodsDto  implements Serializable

{
    /**
     * serialVersionUID
     */
   
    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = -8713977245367257714L;

    /**
     * 主键
     */
    private Integer id;

    /**
     * 商品名称
     */
    private String name;

    /**
     * 商品别名
     */
    private String alias;

    /**
     * 商品编码
     */
    private String code;

    /**
     * 商品类别
     */
    private Integer type;

    public Integer getProductType()
    {
        return productType;
    }

    public void setProductType(Integer productType)
    {
        this.productType = productType;
    }

    private Integer productType;
    
    /**
     * 产品ID
     */
    private Integer productId;

    public List<MallGoodsImages> getMallGoodsImages()
    {
        return mallGoodsImages;
    }

    public void setMallGoodsImages(List<MallGoodsImages> mallGoodsImages)
    {
        this.mallGoodsImages = mallGoodsImages;
    }

    private List<MallGoodsImages> mallGoodsImages;
    
    
    private String[] pic;
    
    /*
     *  图片类型：1表示Icon，2表示商品图，3表示优惠图，4表示logo图（终端显示），5表示底图
     */
    private Integer imgType;
    
    private String ionc1;
    
    private String ionc2;
    
    private String ionc3;
    
    public Integer getImgType() {
		return imgType;
	}

	public void setImgType(Integer imgType) {
		this.imgType = imgType;
	}

	public String[] getPic()
    {
        return pic;
    }

    public void setPic(String[] pic)
    {
        this.pic = pic;
    }

    public String getIonc1()
    {
        return ionc1;
    }

    public void setIonc1(String ionc1)
    {
        this.ionc1 = ionc1;
    }
    
    public String getIonc2()
    {
        return ionc2;
    }

    public void setIonc2(String ionc2)
    {
        this.ionc2 = ionc2;
    }
    
    public String getIonc3()
    {
        return ionc3;
    }

    public void setIonc3(String ionc3)
    {
        this.ionc3 = ionc3;
    }

    public Integer getProductId()
    {
        return productId;
    }

    public void setProductId(Integer productId)
    {
        this.productId = productId;
    }

    /**
     * 商品分类ID
     */
    private Integer mallClassficationId;

    /**
     * 商品分类名称
     */
    private String mallClassficationName;

    /**
     * 销售渠道ID
     */
    private Integer salesChannelsId;

    /**
     * 销售渠道
     */
    private String salesChannels;

    /**
     * 商品定制商ID
     */
    private Integer merchantId;

    /**
     * 商品定制商
     */
    private String merchantName;

    /**
     * 库存数量
     */
    private Integer storageQuantity;

    /**
     * 限购数量
     */
    private Integer purchaseQuantity;

    /**
     * 成本价格
     */
    private BigDecimal costPrice;

    /**
     * 批发价
     */
    private BigDecimal wholesalePrice;

    /**
     * 零售价
     */
    private BigDecimal retailPrice;

    /**
     * 优惠价
     */
    private BigDecimal preferentialPrice;

    /**
     * 上架状态: 1 草稿， 2 上架， 3 下架
     */
    private Integer shelveStatus;

    /**
     * 审核状态  1 成功， 2 失败,3上架审核中，4下降审核中
     */
    private Integer auditingStatus;
    
    
    private String isAudit;

    public String getIsAudit()
    {
        return isAudit;
    }

    public void setIsAudit(String isAudit)
    {
        this.isAudit = isAudit;
    }
    /**
     * 是否推荐
     */
    private Byte recommend;
    /**
     * 是否显示
     */
    private Byte displayed;

    /**
     * 实际销量
     */
    private Integer actualSales;

    /**
     * 显示销量
     */
    private Integer showSalse;

    /**
     * 实际浏览数
     */
    private Integer actualClicks;

    /**
     * 显示浏览数
     */
    private Integer showClicks;

    /**
     * 商品描述
     */
    private String description;

    /**
     * 创建者
     */
    private String createBy;

    /**
     * 修改者
     */
    private String updateBy;
    
    
    //条件查询
    private String queryText;
    
	/**
     * 卡名称
     */
    private Integer cardName;
    
    /**
	 * 查询设备ID
	 */ 
	private String deviceIds; 
    
    public String getStartTime()
    {
        return startTime;
    }

    public void setStartTime(String startTime)
    {
        this.startTime = startTime;
    }

    public String getEndTime()
    {
        return endTime;
    }

    public void setEndTime(String endTime)
    {
        this.endTime = endTime;
    }

    private String  startTime;
    
    private String  endTime;
    

    public Date getCreateTime()
    {
        return createTime;
    }

    public void setCreateTime(Date createTime)
    {
        this.createTime = createTime;
    }

    private Date createTime;
    
    
    private Date updateTime;


    public Date getUpdateTime()
    {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime)
    {
        this.updateTime = updateTime;
    }

    public String getQueryText()
    {
        return queryText;
    }

    public void setQueryText(String queryText)
    {
        this.queryText = queryText;
    }

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


    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }


    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }


    public Integer getMallClassficationId() {
        return mallClassficationId;
    }

    public void setMallClassficationId(Integer mallClassficationId) {
        this.mallClassficationId = mallClassficationId;
    }


    public String getMallClassficationName() {
        return mallClassficationName;
    }

    public void setMallClassficationName(String mallClassficationName) {
        this.mallClassficationName = mallClassficationName;
    }


    public Integer getSalesChannelsId() {
        return salesChannelsId;
    }

    public void setSalesChannelsId(Integer salesChannelsId) {
        this.salesChannelsId = salesChannelsId;
    }


    public String getSalesChannels() {
        return salesChannels;
    }

    public void setSalesChannels(String salesChannels) {
        this.salesChannels = salesChannels;
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


    public Integer getStorageQuantity() {
        return storageQuantity;
    }

    public void setStorageQuantity(Integer storageQuantity) {
        this.storageQuantity = storageQuantity;
    }


    public Integer getPurchaseQuantity() {
        return purchaseQuantity;
    }

    public void setPurchaseQuantity(Integer purchaseQuantity) {
        this.purchaseQuantity = purchaseQuantity;
    }


    public BigDecimal getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(BigDecimal costPrice) {
        this.costPrice = costPrice;
    }


    public BigDecimal getWholesalePrice() {
        return wholesalePrice;
    }

    public void setWholesalePrice(BigDecimal wholesalePrice) {
        this.wholesalePrice = wholesalePrice;
    }


    public BigDecimal getRetailPrice() {
        return retailPrice;
    }

    public void setRetailPrice(BigDecimal retailPrice) {
        this.retailPrice = retailPrice;
    }


    public BigDecimal getPreferentialPrice() {
        return preferentialPrice;
    }

    public void setPreferentialPrice(BigDecimal preferentialPrice) {
        this.preferentialPrice = preferentialPrice;
    }



    public Byte getDisplayed() {
        return displayed;
    }

    public void setDisplayed(Byte displayed) {
        this.displayed = displayed;
    }


    public Integer getActualSales() {
        return actualSales;
    }

    public void setActualSales(Integer actualSales) {
        this.actualSales = actualSales;
    }


    public Integer getShowSalse() {
        return showSalse;
    }

    public void setShowSalse(Integer showSalse) {
        this.showSalse = showSalse;
    }

    public Integer getShelveStatus() {
        return shelveStatus;
    }

    public void setShelveStatus(Integer shelveStatus) {
        this.shelveStatus = shelveStatus;
    }

    public Integer getAuditingStatus() {
        return auditingStatus;
    }

    public void setAuditingStatus(Integer auditingStatus) {
        this.auditingStatus = auditingStatus;
    }

    public Integer getActualClicks() {
        return actualClicks;
    }

    public void setActualClicks(Integer actualClicks) {
        this.actualClicks = actualClicks;
    }


    public Integer getShowClicks() {
        return showClicks;
    }

    public void setShowClicks(Integer showClicks) {
        this.showClicks = showClicks;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }


    public String getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy;
    }

    public Integer getCardName() {
		return cardName;
	}

	public void setCardName(Integer cardName) {
		this.cardName = cardName;
	}

	public String getDeviceIds() {
		return deviceIds;
	}

	public void setDeviceIds(String deviceIds) {
		this.deviceIds = deviceIds;
	}

    public Byte getRecommend() {
        return recommend;
    }

    public void setRecommend(Byte recommend) {
        this.recommend = recommend;
    }
}