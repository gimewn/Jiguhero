package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dto.PromotionDto;

import java.util.List;

public interface PromotionService {

    List<PromotionDto> getTop3Regtime();

}
