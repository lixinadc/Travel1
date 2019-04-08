package com.lx.service.impl;

import com.lx.dao.FcDao;
import com.lx.entity.Fc;
import com.lx.service.FcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FcServiceImpl implements FcService{
    @Autowired
    FcDao fcDao;
    @Override
    public List<Fc> getFc() {
        return fcDao.getFc();
    }
}
