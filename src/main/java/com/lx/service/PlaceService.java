package com.lx.service;

import com.lx.entity.Place;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PlaceService {

    public List<Place> getPlace();

    public List<Place> getPlacePage(int page,int size,String nameKey);

    public int getPlaceCount(String nameKey);

    public void addPlace(Place place);

    public void updatePlace(Place place);

    public void delPlace(int id);
}
