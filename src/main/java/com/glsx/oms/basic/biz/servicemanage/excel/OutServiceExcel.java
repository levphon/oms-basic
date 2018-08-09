package com.glsx.oms.basic.biz.servicemanage.excel;

import java.util.List;
import org.oreframework.commons.office.poi.zslin.utils.ExcelUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.glsx.oms.basic.biz.servicemanage.model.ServiceDefineExcel;
import com.glsx.oms.basic.biz.servicemanage.model.ServicePackageExcel;
import com.glsx.oms.basic.framework.config.ExportProperty;

@Repository
public class OutServiceExcel {

	  
    @Autowired
    private ExportProperty exportProperty;
    
    public  String excelServicePath(List<?> list,int type)
    {
    	String fileName="";
    	if(type==1){
    		 fileName="Service.xlsx";
    		 List<ServiceDefineExcel> serviceList=(List<ServiceDefineExcel>)list;
    	     // 不需要模版导出
    	     ExcelUtil.getInstance().exportObj2Excel(exportProperty.getLocation()+"/"+ fileName, serviceList, ServiceDefineExcel.class);
    	    
    	}else if(type==2){
    		fileName ="ServicePackage.xlsx";
    		List<ServicePackageExcel> servicePackageList=(List<ServicePackageExcel>)list;
   	        // 不需要模版导出
   	        ExcelUtil.getInstance().exportObj2Excel(exportProperty.getLocation()+"/"+ fileName, servicePackageList, ServicePackageExcel.class);
   	       
    	}
    	return exportProperty.getDownload()+"/"+ fileName;
       
      
    }
}
