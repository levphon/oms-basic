package com.glsx.oms.basic.biz.commoditymanage.model;

public class MallClassficationVo
{

    public Integer getId()
    {
        return id;
    }
    public void setId(Integer id)
    {
        this.id = id;
    }
   
    public String getText()
    {
        return text;
    }
    public void setText(String text)
    {
        this.text = text;
    }
    /*public String getState()
    {
        return state;
    }
    public void setState(String state)
    {
        this.state = state;
    }*/
    private Integer id  ;                 
    private String parent;            
    public String getParent()
    {
        return parent;
    }
    public void setParent(String parent)
    {
        this.parent = parent;
    }
    private String text;                 
   // private String  state="{"+'opened'+":true}";        
         
    
    
    
    
    
    
    
}
