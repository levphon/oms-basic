package com.glsx.oms.basic.biz.servicemanage.model.vo;

import java.io.Serializable;

import org.apache.commons.lang.builder.ToStringBuilder;

/**
 * 
 *  服务分类Vo
 *  
 */
public class ServiceCategoryVo implements Serializable{
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -8654589092568597578L;
	
	private int id;
	private String parent;
	private String text; 
	private int type;
	
	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
    
	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}
	public String toString(){
		return ToStringBuilder.reflectionToString(this);
	}

}
