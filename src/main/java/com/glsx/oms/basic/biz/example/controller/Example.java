package com.glsx.oms.basic.biz.example.controller;

import javax.servlet.http.HttpServletRequest;

import org.oreframework.boot.security.UserInfoHolder;
import org.oreframework.boot.security.cas.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.glsx.oms.basic.framework.config.StaticProperty;


@RestController
public class Example {

    
    @Autowired
    private StaticProperty staticProperty;
    
	@Autowired
	private UserInfoHolder userInfoHolder;
    @RequestMapping("/staticProperty")
    String home()
    {
        return staticProperty.getResource();
    }
    
    @RequestMapping("/hello/{myName}")
    String index(@PathVariable String myName)
    {
        return "Hello " + myName + "!!!";
    }
    
	@RequestMapping("/userInfo")
	String index(HttpServletRequest request) {
		User userInfo = userInfoHolder.getUserInfo(request.getParameter("jsessionid"));
		return userInfo.toString();
	}
}