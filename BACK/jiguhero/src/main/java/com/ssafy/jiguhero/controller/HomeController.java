package com.ssafy.jiguhero.controller;

import com.ssafy.jiguhero.data.dto.GroundDto;
import com.ssafy.jiguhero.data.dto.MissionDto;
import com.ssafy.jiguhero.data.dto.PromotionDto;
import com.ssafy.jiguhero.service.GroundService;
import com.ssafy.jiguhero.service.MissionService;
import com.ssafy.jiguhero.service.PromotionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/home")
@Api("메인페이지 관련 REST V1")
public class HomeController {

    private final GroundService groundService;
    private final MissionService missionService;
    private final PromotionService promotionService;

    @Autowired
    public HomeController(GroundService groundService, MissionService missionService, PromotionService promotionService) {
        this.groundService = groundService;
        this.missionService = missionService;
        this.promotionService = promotionService;
    }


    @ApiOperation(value = "조회수가 많은 활동구역 Top5 목록을 반환한다. (조회수가 같으면 좋아요순)", response = List.class)
    @GetMapping("/ground")
    public ResponseEntity<List<GroundDto>> getTop5Grounds() {
        List<GroundDto> list = groundService.getTop5HitsLikes();

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "참여자가 많은 활동구역 Top3 목록을 반환한다.", response = List.class)
    @GetMapping("/mission")
    public ResponseEntity<List<MissionDto>> getTop3Missions() {
        List<MissionDto> list = missionService.getTop3NowPerson();

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "최신등록된 소식 Top3 목록을 반환한다.", response = List.class)
    @GetMapping("/promotion")
    public ResponseEntity<List<PromotionDto>> getTop3Promotions(HttpServletRequest request) {
        List<PromotionDto> list = promotionService.getTop3Regtime(request);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

}
