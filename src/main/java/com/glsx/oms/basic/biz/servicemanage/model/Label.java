package com.glsx.oms.basic.biz.servicemanage.model;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.glsx.platform.goods.common.entity.ServiceClassfication;
import com.glsx.platform.goods.common.entity.ServiceTag;



public class Label implements Serializable
{

    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = 2118839904853140417L;
    /**
     * 标签编号
     */
    private Integer id;
    
    /**
     * 标签名称
     */
    private String name;
    /**
     * 标签类型
     *  SINGLE_SERVICE(1,"单服务")       PACKAGE_SERVICE(2,"套餐服务")
     */
    private Integer type;
    /**
     * 标签详情
     */
    private String description;
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
    
    
  //条件查询字段
  	private String startTime;
  	private String endTime;
  	private String queryText;
  	

	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public String getQueryText() {
		return queryText;
	}
	public void setQueryText(String queryText) {
		this.queryText = queryText;
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
    public Integer getType()
    {
        return type;
    }
    public void setType(Integer type)
    {
        this.type = type;
    }
    public String getDescription()
    {
        return description;
    }
    public void setDescription(String description)
    {
        this.description = description;
    }
    public String getCreateBy()
    {
        return createBy;
    }
    public void setCreateBy(String createBy)
    {
        this.createBy = createBy;
    }
    public String getCreateTime()
    {
        return createTime;
    }
    public void setCreateTime(String createTime)
    {
        this.createTime = createTime;
    }
    public String getUpdateBy()
    {
        return updateBy;
    }
    public void setUpdateBy(String updateBy)
    {
        this.updateBy = updateBy;
    }
    public String getUpdateTime()
    {
        return updateTime;
    }
    public void setUpdateTime(String updateTime)
    {
        this.updateTime = updateTime;
    }
    
    public ServiceTag copy() throws Exception{
    	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	ServiceTag st=new ServiceTag();
    	st.setId(this.getId());
    	st.setName(this.getName());
    	st.setType(this.getType());
    	st.setDescription(this.getDescription());
    	st.setCreateBy(this.getCreateBy());
		st.setCreateTime(this.getCreateTime()==null?null:sdf.parse(this.getCreateTime()));
        st.setUpdateBy(this.getUpdateBy());
		st.setUpdateTime(this.getUpdateTime()==null?null:sdf.parse(this.getUpdateTime()));
		return st;
	}
    
    public String toString(){
		return ToStringBuilder.reflectionToString(this);
	}
}
