package com.glsx.oms.basic.biz.commoditymanage.model;

import java.io.Serializable;

import com.glsx.oms.basic.framework.utils.AbstractBean;

public class MallClassficationDto extends AbstractBean implements Serializable
{
    



    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = 3405136866277122137L;

    private Integer id;       
    
    public Integer getId()
    {
        return id;
    }

    public void setId(Integer id)
    {
        this.id = id;
    }

    public Integer getParentId()
    {
        return parentId;
    }

    public void setParentId(Integer parentId)
    {
        this.parentId = parentId;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getCreateBy()
    {
        return createBy;
    }

    public void setCreateBy(String createBy)
    {
        this.createBy = createBy;
    }


    public String getUpdateBy()
    {
        return updateBy;
    }

    public void setUpdateBy(String updateBy)
    {
        this.updateBy = updateBy;
    }


    private Integer parentId;  
    
    private String name;      
    
    private String createBy;
    

    
    private String updateBy;
    

    
  public String getCode()
    {
        return code;
    }

    public void setCode(String code)
    {
        this.code = code;
    }

    public String getImageUri()
    {
        return imageUri;
    }

    public void setImageUri(String imageUri)
    {
        this.imageUri = imageUri;
    }

    public Integer getDisplayPosition()
    {
        return displayPosition;
    }

    public void setDisplayPosition(Integer displayPosition)
    {
        this.displayPosition = displayPosition;
    }

    public Byte getDisplayed()
    {
        return displayed;
    }

    public void setDisplayed(Byte displayed)
    {
        this.displayed = displayed;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

private String code;
    
 private String imageUri;
    
 private Integer displayPosition;
    
 private Byte displayed;
    
private String description;
    
  
    
    


    
    
    
    
}
