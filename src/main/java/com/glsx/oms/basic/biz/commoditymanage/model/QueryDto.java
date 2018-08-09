package com.glsx.oms.basic.biz.commoditymanage.model;


public class QueryDto
{
    
    public Integer getPageNo()
    {
        return pageNo;
    }

    public void setPageNo(Integer pageNo)
    {
        this.pageNo = pageNo;
    }

    public Integer getPageSize()
    {
        return pageSize;
    }

    public void setPageSize(Integer pageSize)
    {
        this.pageSize = pageSize;
    }

    public String getQueryText()
    {
        return queryText;
    }

    public void setQueryText(String queryText)
    {
        this.queryText = queryText;
    }

    private Integer pageNo;
    
    private Integer pageSize;
    
    private String queryText;
    
    
    
}
