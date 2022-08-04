package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Place;

import java.util.List;

public interface PlaceDao {

    // 모든 친환경 가게 가져오기
    List<Place> selectAll();

}
