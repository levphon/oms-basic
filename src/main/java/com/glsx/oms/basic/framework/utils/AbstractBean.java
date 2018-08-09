package com.glsx.oms.basic.framework.utils;

import java.util.Date;



public abstract class AbstractBean {
	/**
	 * 
	 */


	
	
	/**
	 * 创建时间
	 */
	protected Date createTime;
	
	/**
	 * 更新时间
	 */
	protected Date updateTime;

	
	
	

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	
	
	protected String  updateTimeStr;
	
	
	protected String  createTimeStr;
	
    public String getUpdateTimeStr()
    {
        if (null != updateTime)
        {
            updateTimeStr = DateConvertUtil.convertDateToString(updateTime, DateConvertUtil.TIMEF_FORMAT);
        }
        return updateTimeStr;
    }

    public void setUpdateTimeStr(String updateTimeStr)
    {
        this.updateTimeStr = updateTimeStr;
    }

    public String getCreateTimeStr()
    {
        if (null != createTime)
        {
            createTimeStr = DateConvertUtil.convertDateToString(createTime, DateConvertUtil.TIMEF_FORMAT);
        }
        return createTimeStr;
    }

    public void setCreateTimeStr(String createTimeStr)
    {
        this.createTimeStr = createTimeStr;
    }

}
