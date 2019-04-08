package com.lx.controller;

import com.lx.entity.Place;
import com.lx.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@Scope("prototype")
@RequestMapping("/count")
public class PlaceController {
    @Autowired
    PlaceService placeService;
    @RequestMapping("circle")
    @ResponseBody
    public List<Place> getPlace(){
        List<Place> list= placeService.getPlace();
        for(Place ps:list){
            String name=ps.getCity();
            int value=ps.getPeople();
        }
        return list;
    }

    @RequestMapping("getPlacePage")
    @ResponseBody
    public Map<String,Object> getPlacePage(@RequestParam("pageNumber") int page, @RequestParam("pageSize") int size, String nameKey){
        Map<String,Object> map=new HashMap<>();
        map.put("rows",placeService.getPlacePage(page,size,nameKey));
        map.put("total",placeService.getPlaceCount(nameKey));
        return map;
    }
    @RequestMapping("addPlace")
    @ResponseBody
    public Map<String,Object> addPlace(@RequestParam("city1")String city,@RequestParam("people1") int people){
        Place place=new Place(city,people);
        placeService.addPlace(place);
        Map<String,Object> map=new HashMap<>();
        map.put("result","true");
        return map;
    }
    @RequestMapping("updatePlace")
    @ResponseBody
    public Map<String,Object> updatePlace(Integer id,String city,int people){
        Place place=new Place(id,city,people);
        placeService.updatePlace(place);
        Map<String,Object> map=new HashMap<>();
        map.put("result","true");
        return map;
    }
    @RequestMapping("delPlace")
    @ResponseBody
    public String delPlace(Integer id){
        placeService.delPlace(id);

        return "true";
    }
}
