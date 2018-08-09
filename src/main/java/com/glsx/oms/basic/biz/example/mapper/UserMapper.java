package com.glsx.oms.basic.biz.example.mapper;


import org.apache.ibatis.annotations.Mapper;
import org.oreframework.datasource.mybatis.mapper.OreMapper;

import com.glsx.oms.basic.biz.example.model.User;

@Mapper
public interface UserMapper extends OreMapper<User>
{
    public User findUserInfo();
}
