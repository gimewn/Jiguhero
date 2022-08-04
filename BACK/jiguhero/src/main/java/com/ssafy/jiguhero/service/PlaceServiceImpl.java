package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dao.GroundDao;
import com.ssafy.jiguhero.data.dao.PlaceDao;
import com.ssafy.jiguhero.data.dto.PlaceDto;
import com.ssafy.jiguhero.data.entity.Conn_Ground;
import com.ssafy.jiguhero.data.entity.Conn_Mission;
import com.ssafy.jiguhero.data.entity.Ground;
import com.ssafy.jiguhero.data.entity.Place;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceServiceImpl implements PlaceService{
    private final GroundDao groundDao;
    private final PlaceDao placeDao;

    public PlaceServiceImpl(GroundDao groundDao, PlaceDao placeDao) {
        this.groundDao = groundDao;
        this.placeDao = placeDao;
    }


    @Override
    @Transactional(readOnly = true)
    public List<PlaceDto> getPlaces(Long groundId) {
        Ground groundEntity = groundDao.selectGroundById(groundId);
        List<Conn_Ground> joinPlaceList = placeDao.selectJoinPlaceByGround(groundEntity);
        List<Place> entityList = new ArrayList<>();

        for(Conn_Ground joinPlace : joinPlaceList){
            entityList.add(joinPlace.getPlace());
        }

        List<PlaceDto> dtoList = entityList.stream().map(entity -> PlaceDto.of(entity)).collect(Collectors.toList());
        return dtoList;
    }
}
