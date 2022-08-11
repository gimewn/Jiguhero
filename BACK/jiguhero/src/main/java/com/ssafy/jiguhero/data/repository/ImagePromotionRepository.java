package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Image_Promotion;
import com.ssafy.jiguhero.data.entity.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImagePromotionRepository extends JpaRepository<Image_Promotion, Long> {

    Optional<Image_Promotion> findByPromotion(Promotion promotion);

    void deleteAllByPromotion(Promotion promotion);
}
