package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MissionRepository extends JpaRepository<Mission, Long> {

    // 임무 Top3 참여자순
    List<Mission> findTop3ByOrderByNowPersonDesc();
}
