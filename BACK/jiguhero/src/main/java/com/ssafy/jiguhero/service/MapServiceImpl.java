package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dao.MapDao;
import com.ssafy.jiguhero.data.dao.PlaceDao;
import com.ssafy.jiguhero.data.dto.DongDto;
import com.ssafy.jiguhero.data.dto.GugunDto;
import com.ssafy.jiguhero.data.dto.PlaceDto;
import com.ssafy.jiguhero.data.dto.SidoDto;
import com.ssafy.jiguhero.data.entity.Dong;
import com.ssafy.jiguhero.data.entity.Gugun;
import com.ssafy.jiguhero.data.entity.Place;
import com.ssafy.jiguhero.data.entity.Sido;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MapServiceImpl implements MapService {

    private final MapDao mapDao;
    private final PlaceDao placeDao;

    @Autowired
    public MapServiceImpl(MapDao mapDao, PlaceDao placeDao) {
        this.mapDao = mapDao;
        this.placeDao = placeDao;
    }

    @Override
    @Transactional(readOnly = true)
    public List<SidoDto> getSidoList() {
        List<Sido> entityList = mapDao.selectSidoList();
        List<SidoDto> dtoList = entityList.stream().map(entity -> SidoDto.of(entity)).collect(Collectors.toList());
        return dtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<GugunDto> getGugunList(String sidoCode) {
        Sido sido = mapDao.selectSidoById(sidoCode);
        List<Gugun> entityList = mapDao.selectGugunList(sido);
        List<GugunDto> dtoList = entityList.stream().map(entity -> GugunDto.of(entity)).collect(Collectors.toList());
        return dtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DongDto> getDongList(String gugunCode) {
        Gugun gugun = mapDao.selectGugunById(gugunCode);
        List<Dong> entityList = mapDao.selectDongList(gugun);
        List<DongDto> dtoList = entityList.stream().map(entity -> DongDto.of(entity)).collect(Collectors.toList());
        return dtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PlaceDto> getPlaceList10kmRadius(Double curLat, Double curLng) {
        List<Place> entityList = placeDao.selectAll();
        List<PlaceDto> dtoList = entityList.stream().map(entity -> PlaceDto.of(entity)).collect(Collectors.toList());
        List<PlaceDto> resultList = new ArrayList<>();

        for (PlaceDto placeDto : dtoList) {
            Double X = (Math.cos(placeDto.getLat())*6400*2*3.14/360)*Math.abs(placeDto.getLng()-curLng);
            Double Y = 111*Math.abs(placeDto.getLat()-curLat);
            Double D = Math.sqrt((X*X)+(Y*Y));
            placeDto.setRadius(D);

            if (D <= 10.0) resultList.add(placeDto);
        }

        Collections.sort(resultList);

        return resultList;
    }


}
