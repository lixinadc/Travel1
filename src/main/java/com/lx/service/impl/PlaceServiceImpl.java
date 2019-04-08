package com.lx.service.impl;

import com.lx.dao.PlaceDao;
import com.lx.entity.Place;
import com.lx.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceServiceImpl implements PlaceService {
    @Autowired
    PlaceDao placeDao;
    @Override
    public List<Place> getPlace() {
        return placeDao.getPlace();
    }

    @Override
    public List<Place> getPlacePage(int page, int size, String nameKey) {
        return placeDao.getPlacePage(page,size,nameKey);
    }

    @Override
    public int getPlaceCount(String nameKey) {
        return placeDao.getPlaceCount(nameKey);
    }

    @Override
    public void addPlace(Place place) {
         placeDao.addPlace(place);
    }

    @Override
    public void updatePlace(Place place) {
         placeDao.updatePlace(place);
    }

    @Override
    public void delPlace(int id) {
        placeDao.delPlace(id);
    }
}
