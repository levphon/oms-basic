package com.glsx.oms.basic.framework.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("export")
public class ExportProperty
{
    private String location;
    
    private String download;
    
    public String getLocation()
    {
        return location;
    }
    
    public void setLocation(String location)
    {
        this.location = location;
    }
    
    public String getDownload()
    {
        return download;
    }
    
    public void setDownload(String download)
    {
        this.download = download;
    }
    
}
