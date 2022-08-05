package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dao.MapDao;
import com.ssafy.jiguhero.data.dto.DongDto;
import com.ssafy.jiguhero.data.dto.GugunDto;
import com.ssafy.jiguhero.data.dto.SidoDto;
import com.ssafy.jiguhero.data.entity.Dong;
import com.ssafy.jiguhero.data.entity.Gugun;
import com.ssafy.jiguhero.data.entity.Sido;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MapServiceImpl implements MapService {

    private final MapDao mapDao;

    @Autowired
    public MapServiceImpl(MapDao mapDao) {
        this.mapDao = mapDao;
    }

    @Override
    public List<SidoDto> getSidoList() {
        List<Sido> entityList = mapDao.selectSidoList();
        List<SidoDto> dtoList = entityList.stream().map(entity -> SidoDto.of(entity)).collect(Collectors.toList());
        return dtoList;
    }

    @Override
    public List<GugunDto> getGugunList(String sidoCode) {
        Sido sido = mapDao.selectSidoById(sidoCode);
        List<Gugun> entityList = mapDao.selectGugunList(sido);
        List<GugunDto> dtoList = entityList.stream().map(entity -> GugunDto.of(entity)).collect(Collectors.toList());
        return dtoList;
    }

    @Override
    public List<DongDto> getDongList(String gugunCode) {
        Gugun gugun = mapDao.selectGugunById(gugunCode);
        List<Dong> entityList = mapDao.selectDongList(gugun);
        List<DongDto> dtoList = entityList.stream().map(entity -> DongDto.of(entity)).collect(Collectors.toList());
        return dtoList;
    }
}
