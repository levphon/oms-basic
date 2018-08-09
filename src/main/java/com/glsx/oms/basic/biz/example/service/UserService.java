package com.glsx.oms.basic.biz.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.glsx.oms.basic.biz.example.mapper.UserMapper;
import com.glsx.oms.basic.biz.example.model.User;

@Service
public class UserService
{
    
    @Autowired
    private UserMapper userMapper;
    
    public User getUserInfo()
    {
        User user = userMapper.findUserInfo();
        // User user=null;
        return user;
    }
    
}
