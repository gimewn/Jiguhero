package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.*;

import java.util.List;
import java.util.Optional;

public interface GroundDao {

    // 활동구역 Top5 조회순, 조회수가 같으면 좋아요순
    List<Ground> selectTop5HitsLikes();

    // user에 해당하는 like_ground 인스터스 목록
    List<Like_Ground> selectLikeGroundByUser(User user);

    // ground_id로 미션 정보 조회
    Ground selectGroundById(Long groundId);

    List<Ground> selectGrounds();

    Ground selectGround(Long groundId);

    List<Ground> selectGroundByUser(User userEntity);

    void insertGround(Ground groundEntity);

    void insertConnGround(Conn_Ground connGroundEntity);

    List<Conn_Ground> selectConnGroundByGround(Ground groundEntity);

    void deleteConnGroundById(long connGroundId);

    void deleteGroundById(Long groundId);

    Optional<Like_Ground> selectLikeGround(Ground groundEntity, User userEntity);

    void insertLikeGround(Like_Ground likeGround);

    void deleteLikeGround(Ground groundEntity, User userEntity);

    void modifyGround(Ground groundEntity);

    Optional<Ground> findById(Long groundId);

    List<Like_Ground> selectLikeGroundByGround(Ground groundEntity);

    void deleteLikeGroundById(long likeId);
}