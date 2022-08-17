package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Promotion;

import java.util.List;

public interface PromotionDao {

    // 소식 Top3 최신등록순
    List<Promotion> selectTop3Regtime();

    List<Promotion> selectPromotions();

    Promotion selectPromotion(Long promotionId);

    Promotion insertPromotion(Promotion promotion);

    void deletePromotion(Long promotionId);

    List<Promotion> selectPromotionsByKeyword(String keyword);
}
