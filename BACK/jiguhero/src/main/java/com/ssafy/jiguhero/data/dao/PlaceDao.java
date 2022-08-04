package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Conn_Ground;
import com.ssafy.jiguhero.data.entity.Ground;
import com.ssafy.jiguhero.data.entity.Place;

import java.util.List;

public interface PlaceDao {
    List<Conn_Ground> selectJoinPlaceByGround(Ground groundEntity);

    Place selectPlaceById(Long placeId);
}
