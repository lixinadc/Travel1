package com.lx.service;

import com.lx.bean.Page;
import org.springframework.stereotype.Service;

import com.lx.entity.User;


@Service
public interface UserService {
   
   public void addUser(User user);
	
   public boolean getIsExist(String username);
   
   public User getLogin(User user);

   public Page<User> getSelectUser(int page,int size,String nameKey,Integer usertype);

   public void updateUser(User user);
}
