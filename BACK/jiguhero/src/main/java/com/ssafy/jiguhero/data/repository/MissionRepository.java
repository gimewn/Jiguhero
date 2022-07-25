package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Mission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MissionRepository extends JpaRepository<Mission, Long> {

    // 임무 Top3 참여자순
    List<Mission> findTop3OrderByNowPersonDesc();
}
