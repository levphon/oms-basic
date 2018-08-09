package com.glsx.oms.basic.framework.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("goods")
public class GoodsProperty
{
    public String getUrl()
    {
        return url;
    }

    public void setUrl(String url)
    {
        this.url = url;
    }

 

    public String getUser()
    {
        return user;
    }

    public void setUser(String user)
    {
        this.user = user;
    }

    public int getWidth_one()
    {
        return width_one;
    }

    public void setWidth_one(int width_one)
    {
        this.width_one = width_one;
    }

    public int getHeigh_one()
    {
        return heigh_one;
    }

    public void setHeigh_one(int heigh_one)
    {
        this.heigh_one = heigh_one;
    }

    public int getWidth_two()
    {
        return width_two;
    }

    public void setWidth_two(int width_two)
    {
        this.width_two = width_two;
    }

    public int getHeigh_two()
    {
        return heigh_two;
    }

    public void setHeigh_two(int heigh_two)
    {
        this.heigh_two = heigh_two;
    }

    public int getWidth_three()
    {
        return width_three;
    }

    public void setWidth_three(int width_three)
    {
        this.width_three = width_three;
    }

    public int getHeigh_three()
    {
        return heigh_three;
    }

    public void setHeigh_three(int heigh_three)
    {
        this.heigh_three = heigh_three;
    }


    public int getWidth_four() {
		return width_four;
	}

	public void setWidth_four(int width_four) {
		this.width_four = width_four;
	}

	public int getHeigh_four() {
		return heigh_four;
	}

	public void setHeigh_four(int heigh_four) {
		this.heigh_four = heigh_four;
	}

	public int getWidth_five() {
		return width_five;
	}

	public void setWidth_five(int width_five) {
		this.width_five = width_five;
	}

	public int getHeigh_five() {
		return heigh_five;
	}

	public void setHeigh_five(int heigh_five) {
		this.heigh_five = heigh_five;
	}


	public int getWidth_six() {
		return width_six;
	}

	public void setWidth_six(int width_six) {
		this.width_six = width_six;
	}

	public int getHeigh_six() {
		return heigh_six;
	}

	public void setHeigh_six(int heigh_six) {
		this.heigh_six = heigh_six;
	}



	private String url;
    
    private String user;
    
    private int width_one;
    
    private int heigh_one;
    
    private int width_two;
    
    private int heigh_two;
    
    private int width_three;
    
    private int heigh_three;
    
    private int width_four;
    
    private int heigh_four;
    
    private int width_five;
    
    private int heigh_five;
    
    private int width_six;
    
    private int heigh_six;
    
;
    
    

    
  
}
