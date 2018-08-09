/**
 * @Package com.glsx.biz.cyb.common.merchant.entity.Res
 * @Title: MerchantIdAndName.java
 * @Description: TODO
 * @author: zhang xt
 * @date 2013-9-3 上午11:35:56
 * Copyright: Copyright (c) 2013 
 * Company: GLSX.
 * @version V1.0
 */

package com.glsx.oms.basic.biz.commoditymanage.model;

import java.io.Serializable;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;

/**
 * @Description: 商户的Id及名称信息
 * @author: zhang xt
 * @date 2013-9-3 上午11:35:56
 * Copyright: Copyright (c) 2013 
 * Company: GLSX.
 * @version V1.0
 */
public class MerchantIdAndName implements Serializable {

	
	private static final long serialVersionUID = 1L;
	
	// 商户ID
	private Integer id;
	
	// 商户名称
	private String name;
	
	
	//查询
	private String queryText;

	public String getQueryText()
    {
        return queryText;
    }

    public void setQueryText(String queryText)
    {
        this.queryText = queryText;
    }

    /**
	 * getter method
	 * @return the id
	 */
	
	public Integer getId() {
		return id;
	}

	/**
	 * setter method
	 * @param id the id to set
	 */
	
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * getter method
	 * @return the name
	 */
	
	public String getName() {
		return name;
	}

	/**
	 * setter method
	 * @param name the name to set
	 */
	
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * <p>Title: toString</p>
	 * <p>Description: </p>
	 * @return
	 * @see java.lang.Object#toString()
	 */
	
	
	@Override
	public String toString() {
		return "MerchantIdAndName [id=" + id + ", name=" + name + "]";
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof MerchantIdAndName)) {
			return false;
		}
		MerchantIdAndName rhs = (MerchantIdAndName) object;
		return new EqualsBuilder()
				.append(this.id, rhs.id).isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-1635007185, -1163253895).append(this.id).toHashCode();
	}
	

}
