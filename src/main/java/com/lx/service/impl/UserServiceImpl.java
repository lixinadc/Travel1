package com.lx.service.impl;

import com.lx.bean.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lx.dao.UserDao;
import com.lx.entity.User;
import com.lx.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	UserDao userDao;
	
	@Override
	public void addUser(User user) {
		userDao.addUser(user);
	}

	@Override
	public boolean getIsExist(String username) {
		boolean flag=false;
		User u=userDao.isExist(username);
		if(u!=null){
			flag=true;
		}
		return flag;
	}

	@Override
	public User getLogin(User user) {
		User user2=userDao.login(user);
		return user2;
	}

	@Override
	public Page<User> getSelectUser(int page,int size,String nameKey,Integer usertype) {
		Page<User> page1=new Page<>(page,size);
		page1.setData(userDao.getSelectUser(page,size,nameKey,usertype));
		page1.setCount(userDao.getUserCount(nameKey,usertype));
		return page1;
	}

	@Override
	public void updateUser(User user) {
		userDao.updateUser(user);
	}

}
