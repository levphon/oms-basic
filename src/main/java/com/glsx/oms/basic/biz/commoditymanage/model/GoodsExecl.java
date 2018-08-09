package com.glsx.oms.basic.biz.commoditymanage.model;

import org.oreframework.commons.office.poi.zslin.utils.ExcelResources;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

public class GoodsExecl
{
    /**
     * 商品名称
     */
    private String name;
    /**
     * 商品编码
     */
    private String code;

    /**
     * 商品类别
     */
    private Integer type;
    
    
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
    
    private String shelveStatusString;

    /**
     * 审核状态  1 成功， 2 失败,3上架审核中，4下降审核中
     */
    private Integer auditingStatus;
    
    private String auditingStatusString;
    /**
     * 是否推荐
     */
    private Byte recommend;
    
    /**
     * 是否显示
     */
    private Byte displayed;

    @ExcelResources(title="商品状态",order=6)
    public String getShelveStatusString()
    {
        return shelveStatusString;
    }

    public void setShelveStatusString(String shelveStatusString)
    {
        this.shelveStatusString = shelveStatusString;
    }
    
    @ExcelResources(title="审核状态",order=7)
    public String getAuditingStatusString()
    {
        return auditingStatusString;
    }

    public void setAuditingStatusString(String auditingStatusString)
    {
        this.auditingStatusString = auditingStatusString;
    }

    @ExcelResources(title="是否显示",order=8)
    public String getDisplayedString()
    {
        return displayedString;
    }

    public void setDisplayedString(String displayedString)
    {
        this.displayedString = displayedString;
    }

    private String displayedString;

    @ExcelResources(title="是否推荐",order=8)
    public String getRecommendString()
    {
        return recommendString;
    }

    public void setRecommendString(String recommendString)
    {
        this.recommendString = recommendString;
    }

    private String recommendString;
    
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
     * 创建者
     */
    private String createBy;
    
    @ExcelResources(title="创建者",order=12)
    public String getCreateBy()
    {
        return createBy;
    }

    public void setCreateBy(String createBy)
    {
        this.createBy = createBy;
    }

    
    public Date getCreateTime()
    {
        return createTime;
    }

    public void setCreateTime(Date createTime)
    {
        this.createTime = createTime;
    }
    
 
    private String createTimeString;
    
    @ExcelResources(title="创建时间",order=13)
    public String getCreateTimeString()
    {
        
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(this.getCreateTime());
    }

    public void setCreateTimeString(String createTimeString)
    {
        this.createTimeString = createTimeString;
    }

    private Date createTime;
    
    @ExcelResources(title="商品名称",order=2)
    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

  
    @ExcelResources(title="商品编号",order=1)
    public String getCode()
    {
        return code;
    }

    public void setCode(String code)
    {
        this.code = code;
    }

    public Integer getType()
    {
        return type;
    }

    public void setType(Integer type)
    {
        this.type = type;
    }

    @ExcelResources(title="商品分类",order=3)
    public String getMallClassficationName()
    {
        return mallClassficationName;
    }

    public void setMallClassficationName(String mallClassficationName)
    {
        this.mallClassficationName = mallClassficationName;
    }

    public Integer getSalesChannelsId()
    {
        return salesChannelsId;
    }

    public void setSalesChannelsId(Integer salesChannelsId)
    {
        this.salesChannelsId = salesChannelsId;
    }

    public String getSalesChannels()
    {
        return salesChannels;
    }

    public void setSalesChannels(String salesChannels)
    {
        this.salesChannels = salesChannels;
    }

    public Integer getMerchantId()
    {
        return merchantId;
    }

    public void setMerchantId(Integer merchantId)
    {
        this.merchantId = merchantId;
    }

    public String getMerchantName()
    {
        return merchantName;
    }

    public void setMerchantName(String merchantName)
    {
        this.merchantName = merchantName;
    }

    @ExcelResources(title="库存",order=9)
    public Integer getStorageQuantity()
    {
        return storageQuantity;
    }

    public void setStorageQuantity(Integer storageQuantity)
    {
        this.storageQuantity = storageQuantity;
    }

    public Integer getPurchaseQuantity()
    {
        return purchaseQuantity;
    }

    public void setPurchaseQuantity(Integer purchaseQuantity)
    {
        this.purchaseQuantity = purchaseQuantity;
    }

    public BigDecimal getCostPrice()
    {
        return costPrice;
    }

    public void setCostPrice(BigDecimal costPrice)
    {
        this.costPrice = costPrice;
    }

    public BigDecimal getWholesalePrice()
    {
        return wholesalePrice;
    }

    public void setWholesalePrice(BigDecimal wholesalePrice)
    {
        this.wholesalePrice = wholesalePrice;
    }
    @ExcelResources(title="零售价/元",order=4)
    public BigDecimal getRetailPrice()
    {
        return retailPrice;
    }

    public void setRetailPrice(BigDecimal retailPrice)
    {
        this.retailPrice = retailPrice;
    }
    @ExcelResources(title="优惠价/元",order=5)
    public BigDecimal getPreferentialPrice()
    {
        return preferentialPrice;
    }

    public void setPreferentialPrice(BigDecimal preferentialPrice)
    {
        this.preferentialPrice = preferentialPrice;
    }

    
    public Integer getShelveStatus()
    {
        return shelveStatus;
    }

    public void setShelveStatus(Integer shelveStatus)
    {
        this.shelveStatus = shelveStatus;
    }

   
    public Integer getAuditingStatus()
    {
        return auditingStatus;
    }

    public void setAuditingStatus(Integer auditingStatus)
    {
        this.auditingStatus = auditingStatus;
    }
    
    
    public Byte getDisplayed()
    {
        return displayed;
    }

    public void setDisplayed(Byte displayed)
    {
        this.displayed = displayed;
    }

    @ExcelResources(title="实际销量",order=10)
    public Integer getActualSales()
    {
        return actualSales;
    }

    public void setActualSales(Integer actualSales)
    {
        this.actualSales = actualSales;
    }

    public Integer getShowSalse()
    {
        return showSalse;
    }

    public void setShowSalse(Integer showSalse)
    {
        this.showSalse = showSalse;
    }


    @ExcelResources(title="实际浏览次数",order=11)
    public Integer getActualClicks()
    {
        return actualClicks;
    }

    public void setActualClicks(Integer actualClicks)
    {
        this.actualClicks = actualClicks;
    }

    public Integer getShowClicks()
    {
        return showClicks;
    }

    public void setShowClicks(Integer showClicks)
    {
        this.showClicks = showClicks;
    }

    public Byte getRecommend() {
        return recommend;
    }

    public void setRecommend(Byte recommend) {
        this.recommend = recommend;
    }
}
