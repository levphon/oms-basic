
package com.glsx.oms.basic.biz;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.glsx.oms.basic.framework.config.StaticProperty;

@Scope("prototype")
@Controller
class IndexController
{
    @Autowired
    private StaticProperty staticProperty;
    
    @RequestMapping("/")
    public String index(Map<String, Object> model, HttpServletRequest request)
    {
        model.put("cdnPath", staticProperty.getResource());
        return "index";
    }
}