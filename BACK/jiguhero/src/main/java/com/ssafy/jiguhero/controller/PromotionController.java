package com.ssafy.jiguhero.controller;

import com.ssafy.jiguhero.data.dto.PromotionDto;
import com.ssafy.jiguhero.service.PromotionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/promortion")
@Api("프로모션 관련 REST V1")
public class PromotionController {

    private final PromotionService promotionService;

    @Autowired
    public PromotionController(PromotionService promotionService) {
        this.promotionService = promotionService;
    }

    @ApiOperation(value = "모든 프로모션 및 이벤트 소식 리스트를 반환한다.", response = List.class)
    @GetMapping("/list")
    public ResponseEntity<List<PromotionDto>> getPromotions(){
        List<PromotionDto> list = promotionService.getPromotions();
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "특정 프로모션 및 이벤트 소식 정보를 반환한다.", response = PromotionDto.class)
    @GetMapping("/get/{promotion_id}")
    public ResponseEntity<PromotionDto> getPromotion(@PathVariable("promotion_id") Long promotionId){
        PromotionDto dto = promotionService.getPromotion(promotionId);
        return dto;
    }
}
