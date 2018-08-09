package com.glsx.oms.basic.biz.commoditymanage.model;

import java.io.Serializable;


public class ServiceDto implements Serializable {

	/**
	 * serialVersionUID
	 */

	/**
     * serialVersionUID
     */
    private static final long serialVersionUID = -3072206356124365478L;

    /**
	 * id
	 */
	private Integer id;
	
	
	private Integer type;

	public Integer getType()
    {
        return type;
    }
    public void setType(Integer type)
    {
        this.type = type;
    }
    public Integer getId()
    {
        return id;
    }
    public void setId(Integer id)
    {
        this.id = id;
    }
    public String getName()
    {
        return name;
    }
    public void setName(String name)
    {
        this.name = name;
    }
    public Integer getServiceTagId()
    {
        return serviceTagId;
    }
    public void setServiceTagId(Integer serviceTagId)
    {
        this.serviceTagId = serviceTagId;
    }
    public String getServiceTagName()
    {
        return serviceTagName;
    }
    public void setServiceTagName(String serviceTagName)
    {
        this.serviceTagName = serviceTagName;
    }
    /**
	 * 服务套餐名
	 */
	private String name;
	/**
	 * 服务套餐标签ID
	 */
	private Integer serviceTagId;
	/**
	 * 服务套餐标签
	 */
	private String serviceTagName;

	
}
