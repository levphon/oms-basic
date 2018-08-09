package com.glsx.oms.basic.framework;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;


@Configuration
public class WebMvcConfigurer extends WebMvcConfigurerAdapter
{
    @Override  
    public void addCorsMappings(CorsRegistry registry) {  
        registry.addMapping("/**")  
                .allowedOrigins("*")  
                .allowCredentials(true)  
                .allowedMethods("HEAD","GET", "POST", "DELETE", "PUT")  
                .maxAge(3600);  
    }  
}