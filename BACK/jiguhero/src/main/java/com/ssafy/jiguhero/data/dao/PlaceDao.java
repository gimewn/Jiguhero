package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Conn_Ground;
import com.ssafy.jiguhero.data.entity.Ground;

import java.util.List;

public interface PlaceDao {
    List<Conn_Ground> selectJoinPlaceByGround(Ground groundEntity);
}
