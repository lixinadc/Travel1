package com.lx.interceptor;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginInterceptor extends HandlerInterceptorAdapter{
   @Override
   public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
		throws Exception {
//	     HttpSession session=request.getSession();
//	     Object obj=session.getAttribute("user");
//	     if(null==obj){
//	    	 request.getRequestDispatcher("../login.html").forward(request, response);
//	    	 return false;
//	     }
//	     return true;
	   Cookie[] cookies=request.getCookies();
	   if(null==cookies){
		   //request.getRequestDispatcher("/login.html").forward(request, response);
		   response.sendRedirect(request.getContextPath()+"/login.html");
		   return false;
	   }
	   String uname=null;
	   for(Cookie c:cookies){
		   if(c.getName().equals("username")){
			   uname=c.getValue();
			   break;
		   }
	   }
	   if(null==uname){
		   //request.getRequestDispatcher("/login.html").forward(request, response);
		   response.sendRedirect(request.getContextPath()+"/login.html");
		   return false;
	   }
	   return true;
   }
   @Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		super.postHandle(request, response, handler, modelAndView);
	}
   @Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
		super.afterCompletion(request, response, handler, ex);
	}
}
