package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Ground;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroundRepository extends JpaRepository<Ground, Long> {

    // 활동구역 Top5 조회순
    List<Ground> findTop5OrderByHitsDesc();

    // 활동구역 Top5 좋아요순
    List<Ground> findTop5OrderByLikesDesc();

}
