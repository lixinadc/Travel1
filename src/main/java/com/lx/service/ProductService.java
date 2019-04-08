package com.lx.service;

import com.lx.bean.Page;
import com.lx.entity.Product;
import org.springframework.stereotype.Service;

@Service
public interface ProductService {

    public Page<Product> getAllProducts(int page, int size, String nameKey, int typeid);

    public Product getProductOne(Integer id);

    public void addProduct(Product p);

    public void updateProduct(Product p);

    public void delProduct(Integer id);
}
