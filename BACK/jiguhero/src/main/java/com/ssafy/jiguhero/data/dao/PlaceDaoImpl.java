package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Conn_Ground;
import com.ssafy.jiguhero.data.entity.Ground;
import com.ssafy.jiguhero.data.repository.ConnGroundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PlaceDaoImpl implements PlaceDao{

    private final ConnGroundRepository connGroundRepository;

    @Autowired
    public PlaceDaoImpl(ConnGroundRepository connGroundRepository){
        this.connGroundRepository = connGroundRepository;
    }

    @Override
    public List<Conn_Ground> selectJoinPlaceByGround(Ground groundEntity) {
        List<Conn_Ground> selectedJoinPlace = connGroundRepository.findAllByGround(groundEntity);
        return selectedJoinPlace;
    }
}
