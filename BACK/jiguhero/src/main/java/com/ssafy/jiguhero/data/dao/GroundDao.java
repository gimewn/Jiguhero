package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.*;

import java.util.List;

public interface GroundDao {

    // 활동구역 Top5 조회순, 조회수가 같으면 좋아요순
    List<Ground> selectTop5HitsLikes();

    // user에 해당하는 like_ground 인스터스 목록
    List<Like_Ground> selectLikeGroundByUser(User user);

    // ground_id로 미션 정보 조회
    Ground selectGroundById(Long groundId);

}