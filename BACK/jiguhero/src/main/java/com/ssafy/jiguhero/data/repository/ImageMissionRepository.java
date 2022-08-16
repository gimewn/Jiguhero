package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Image_Mission;
import com.ssafy.jiguhero.data.entity.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImageMissionRepository extends JpaRepository<Image_Mission, Long> {

    List<Image_Mission> findAllByMission(Mission mission);

    List<Image_Mission> findAllByMissionAndRep(Mission mission, boolean rep);

    // 임무의 대표 이미지 정보 반환
    Optional<Image_Mission> findByMissionAndRep(Mission mission, Boolean rep);

}
