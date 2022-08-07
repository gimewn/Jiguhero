package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Image_Mission;
import com.ssafy.jiguhero.data.entity.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageMissionRepository extends JpaRepository<Image_Mission, Long> {

    List<Image_Mission> findAllByMission(Mission mission);

}
