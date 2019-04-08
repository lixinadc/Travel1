package com.lx.service;

import com.lx.entity.ProType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProTypeService {

    public List<ProType> getType();

    public void addType(ProType proType);
}
