package com.glsx.oms.basic.biz.commoditymanage.execl;

import java.util.List;

import org.oreframework.commons.office.poi.zslin.utils.ExcelUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.glsx.oms.basic.biz.commoditymanage.model.GoodsExecl;
import com.glsx.oms.basic.framework.config.ExportProperty;



/**
 * 执行类
 * 
 * @author huangzz
 * @version [0.0.1, 2017年4月2日]
 */
@Repository
public class OutOrderExec 
{
    private final static Logger logger = LoggerFactory.getLogger(OutOrderExec.class);
    
  
    @Autowired
    private ExportProperty exportProperty;
    
    public  String execlGoodsPath(List<GoodsExecl> list)
    {
        String fileName ="goods.xlsx";
        // 不需要模版导出
        ExcelUtil.getInstance().exportObj2Excel(exportProperty.getLocation()+"/"+ fileName, list, GoodsExecl.class);
        return exportProperty.getDownload()+"/"+ fileName;
      
    }
    
}
