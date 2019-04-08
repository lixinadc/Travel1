package com.lx.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.annotation.WebInitParam;


@WebFilter( "/*")
public class EncodingFilter implements Filter {

	private String encoding ;
    public EncodingFilter() {
        // TODO Auto-generated constructor stub
    }

    /**
     * 销毁资源
     */
	public void destroy() {
	}

	/**
	 * 对要过滤的请求进行过滤处理，会被反复调用
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		
		request.setCharacterEncoding(encoding);
		response.setCharacterEncoding(encoding);
		// pass the request along the filter chain
		chain.doFilter(request, response);   // 向下传递过滤请求，并最终传递到所请求的页面
	}
	/**
	 * 获取initParams中的参数
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		encoding = fConfig.getInitParameter("encode") ;
		if(null == encoding || encoding.trim().length() == 0) {
			encoding = "utf-8" ;
		}
	}

}
