package com.lx.controller;

import com.lx.entity.User;
import com.lx.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@Scope("prototype")
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserService userService;
	
	@RequestMapping("regist")
	@ResponseBody
	public Map<String, String> regist(String username,String password,String email,int sex,String phone,String description){
		User user=new User(null, username, email, password, sex, phone, description);
		userService.addUser(user);
		Map<String , String> map=new HashMap<>();
		map.put("result", "true");
		return map;
	}
	
	@RequestMapping("only")
	@ResponseBody
	public Map<String, Boolean> only(String username){
		boolean isExist=userService.getIsExist(username);
		Map<String , Boolean> map=new HashMap<>();
		map.put("valid", !isExist);
    	return map;
		
	}
	
	@RequestMapping("login")
	@ResponseBody
	public User login(String username,String password,int usertype){
		User user=new User(username, password, usertype);
		User user2=userService.getLogin(user);
		return user2;
	}

	@RequestMapping("getUserPage")
	@ResponseBody
	public Map<String,Object> getUserPage(@RequestParam("pageNumber") int page,@RequestParam("pageSize") int size, String nameKey){
		Map<String,Object> map=new HashMap<>();
		map.put("rows",userService.getSelectUser(page,size,nameKey,1).getData());
		map.put("total",userService.getSelectUser(page,size,nameKey,1).getCount());
		return map;
	}
}
