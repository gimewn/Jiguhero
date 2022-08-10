package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dto.PromotionDto;

import java.util.List;

public interface PromotionService {

    List<PromotionDto> getTop3Regtime();

    List<PromotionDto> getPromotions();

    PromotionDto getPromotion(Long promotionId);

    PromotionDto savePromotion(PromotionDto promotionDto);

    void deletePromotion(Long promotionId);

    List<PromotionDto> searchByKeyword(String keyword);
}
