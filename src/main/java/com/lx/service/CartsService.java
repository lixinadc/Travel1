package com.lx.service;

import com.lx.bean.Page;
import com.lx.entity.Carts;
import org.springframework.stereotype.Service;

@Service
public interface CartsService {

	public Page<Carts> getAll(int page, int size, String nameKey, String name);
	
	public int getTotalCount(String name);
	
	public double getSelectTotal(int page, int size, String nameKey, String name);

	public void del(int id);

	public double getAll1(String nameKey, String name);

	public void update(Integer id,String pname, double price, int num);

	public void deleteMore(String [] ids);

	public void addCart(Carts carts);
}
