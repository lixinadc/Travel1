package com.lx.service.impl;

import com.lx.dao.ProTypeDao;
import com.lx.entity.ProType;
import com.lx.service.ProTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProTypeServiceImpl implements ProTypeService{
    @Autowired
    ProTypeDao proTypeDao;
    @Override
    public List<ProType> getType() {
        return proTypeDao.getType();
    }

    @Override
    public void addType(ProType proType) {
        proTypeDao.addType(proType);
    }


}
