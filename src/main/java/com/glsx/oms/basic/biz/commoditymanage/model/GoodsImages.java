package com.glsx.oms.basic.biz.commoditymanage.model;


public class GoodsImages{

  private Integer id;
  private Integer goodsId;
  private String uri;
  private Boolean icon;

  public Integer getId()
  {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getGoodsId() {
    return this.goodsId;
  }

  public void setGoodsId(Integer goodsId) {
    this.goodsId = goodsId;
  }

  public String getUri() {
    return this.uri;
  }

  public void setUri(String uri) {
    this.uri = uri;
  }

  

  public int hashCode()
  {
    int result = super.hashCode();
    result = 31 * result + (this.id != null ? this.id.hashCode() : 0);
    result = 31 * result + (this.goodsId != null ? this.goodsId.hashCode() : 0);
    result = 31 * result + (this.uri != null ? this.uri.hashCode() : 0);
    return result;
  }

  public Boolean getIcon() {
    return this.icon;
  }

  public void setIcon(Boolean icon) {
    this.icon = icon;
  }

  public String toString()
  {
    return "MallGoodsImages{id=" + this.id + ", goodsId=" + this.goodsId + ", uri='" + this.uri + '\'' + ", icon=" + this.icon + '}';
  }
}