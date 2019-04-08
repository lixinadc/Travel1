package com.lx.service.impl;

import com.lx.bean.Page;
import com.lx.dao.CartsDao;
import com.lx.entity.Carts;
import com.lx.service.CartsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CartsServiceImpl implements CartsService{


	@Autowired
    CartsDao cartsDao;
	@Override
	public Page<Carts> getAll(int page, int size, String nameKey, String name) {
		Page<Carts> pages=new Page<>(page, size);
		pages.setData(cartsDao.getAll(page, size, nameKey, name));
		pages.setCount(cartsDao.getCartCount(nameKey, name));
		return pages;
	}
	@Override
	public int getTotalCount(String name) {
		int count=cartsDao.getCartCount(null, name);
		return count;
	}
	@Override
	public double getSelectTotal(int page, int size, String nameKey, String name) {
		Page<Carts> pages=new Page<>(page, size);
		List<Carts> list=cartsDao.getAll(page, size, nameKey, name);
		int count=cartsDao.getCartCount(nameKey, name);
		pages.setData(list);
		pages.setCount(count);
		double total=0;
		for (Carts carts : list) {
			total+=carts.getNum()*carts.getPrice();
		}
		return total;
	}
	@Override
	public void del(int id){
		cartsDao.del(id);
	}

	@Override
	public double getAll1(String nameKey, String name) {
		List<Carts> list=cartsDao.getAll1(nameKey, name);
		double total=0;
		for(Carts cs:list){
			total+=cs.getNum()*cs.getPrice();
		}
		return  total;
	}

	@Override
	public void update(Integer id, String pname, double price, int num) {
		cartsDao.update(id, pname,price, num);
	}
	@Override
	public void deleteMore(String[] ids) {
		cartsDao.deleteMore(ids);
	}

	@Override
	public void addCart(Carts carts) {
		cartsDao.addCart(carts);
	}

}
