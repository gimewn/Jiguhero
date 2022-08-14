package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dto.PromotionDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface PromotionService {

    List<PromotionDto> getTop3Regtime(HttpServletRequest request);

    List<PromotionDto> getPromotions(HttpServletRequest request);

    PromotionDto getPromotion(Long promotionId, HttpServletRequest request);

    PromotionDto savePromotion(PromotionDto promotionDto);

    void deletePromotion(Long promotionId);

    List<PromotionDto> searchByKeyword(String keyword, HttpServletRequest request);

    String getPromotionImageURL(Long promotionId, HttpServletRequest request);
}
