package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Ground;

import java.util.List;

public interface GroundDAO {

    // 활동구역 Top5 조회순
    List<Ground> selectTop5OrderByHits();

    // 활동구역 Top5 좋아요순
    List<Ground> selectTop5OrderByLikes();

}
