package com.glsx.oms.basic.biz.servicemanage.model;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.glsx.platform.goods.common.entity.ServiceClassfication;

/**
 * 
 *  服务分类bean
 *  platform_service_classfication
 */
public class ServiceCategory implements Serializable{
	
	
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 2928718707133735532L;

	/**
	 * 分类ID
	 */
	private Integer id;
	/**
	 * 分类父ID
	 */
	private Integer parentId;
	/**
	 * 分类名称
	 */
	private String name;
	/**
	 * 分类描述
	 */
	private String description;
	/**
	 * 类型 1：流量 2：应用 3：短信
	 */
	private Integer type;
	
	/**
	 * 服务数
	 */
	private int serviceCount;
	
	/**
	 * 创建人
	 */
	private String createBy;
	/**
	 * 创建时间
	 */
	private String createTime;
	/**
	 * 修改人
	 */
	private String updateBy;
	/**
	 * 修改时间
	 */
	private String updateTime;
	
	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public Integer getParentId() {
		return parentId;
	}


	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}

	public Integer getType() {
		return type;
	}

	public int getServiceCount() {
		return serviceCount;
	}


	public void setServiceCount(int serviceCount) {
		this.serviceCount = serviceCount;
	}
	public void setType(int type) {
		this.type = type;
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


	public String getCreateTime() {
		return createTime;
	}


	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}


	public String getUpdateBy() {
		return updateBy;
	}


	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}


	public String getUpdateTime() {
		return updateTime;
	}


	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	public ServiceClassfication copy() throws Exception{
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		ServiceClassfication sf=new ServiceClassfication();
		sf.setId(this.getId());
		sf.setParentId(this.getParentId());
		sf.setName(this.getName());
		sf.setDescription(this.getDescription());
		sf.setType(this.getType());
		sf.setCreateBy(this.getCreateBy());
		sf.setCreateTime(this.getCreateTime()==null?null:sdf.parse(this.getCreateTime()));
		sf.setUpdateBy(this.getUpdateBy());
		sf.setUpdateTime(this.getUpdateTime()==null?null:sdf.parse(this.getUpdateTime()));
		return sf;
	}
	public ServiceCategory copy(ServiceClassfication sf) throws Exception{
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		this.setId(sf.getId());
		this.setParentId(sf.getParentId());
		this.setName(sf.getName());
		this.setDescription(sf.getDescription());
		this.setType(sf.getType());
		this.setCreateBy(sf.getCreateBy());
		this.setCreateTime(sf.getCreateTime()==null?"":sdf.format(sf.getCreateTime()));
		this.setUpdateBy(sf.getUpdateBy());
		this.setUpdateTime(sf.getUpdateTime()==null?"":sdf.format(sf.getUpdateTime()));
		return this;
	}
	
	public String toString(){
		return ToStringBuilder.reflectionToString(this);
	}

}
