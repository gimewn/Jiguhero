package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long> {

    // 소식 Top3 최신등록순
    List<Promotion> findTop3ByOrderByRegtimeDesc();

    List<Promotion> findAllByOrderByRegtimeDesc();

    List<Promotion> findByTitleContaining(String keyword);
}
