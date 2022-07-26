package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Long> {

    // 모든 친환경 가게 가져오기
    List<Place> findAll();

    // 해당 카테고리 코드와 일치하는 가게만 가져오기
    List<Place> findAllByCode(String categoryCode);
}
