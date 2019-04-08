package com.lx.service.impl;

import com.lx.bean.Page;
import com.lx.dao.ProductDao;
import com.lx.entity.Product;
import com.lx.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductDao productDao;
    @Override
    public Page<Product> getAllProducts(int page, int size, String nameKey, int typeid) {
        Page<Product> pages=new Page<>(page,size);
        pages.setData(productDao.getSelectResult(page, size, nameKey, typeid));
        pages.setCount(productDao.getProductCount(nameKey, typeid));
        return pages;
    }

    @Override
    public Product getProductOne(Integer id) {
        Product product=productDao.getProductOne(id);
        return product;
    }

    @Override
    public void addProduct(Product p) {
        productDao.addProduct(p);
    }

    @Override
    public void updateProduct(Product p) {
        productDao.updateProduct(p);
    }

    @Override
    public void delProduct(Integer id) {
        productDao.delProduct(id);
    }


}
