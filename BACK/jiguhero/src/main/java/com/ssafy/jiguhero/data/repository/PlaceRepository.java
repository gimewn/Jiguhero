package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, String> {

    // 모든 친환경 가게 가져오기
    List<Place> findAll();

    // 해당 카테고리 코드와 일치하는 가게만 가져오기
//    List<Place> findAllByCode(String categoryCode);
}
