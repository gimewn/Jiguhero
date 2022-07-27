package com.ssafy.jiguhero.controller;

import com.ssafy.jiguhero.data.dto.GroundDto;
import com.ssafy.jiguhero.service.GroundService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/home")
@Api("메인페이지 관련 REST V1")
public class HomeController {

    private final GroundService groundService;

    @Autowired
    public HomeController(GroundService groundService) {
        this.groundService = groundService;
    }

    @ApiOperation(value = "조회수가 많은 활동구역 Top5 목록을 반환한다. (조회수가 같으면 좋아요순)", response = List.class)
    @GetMapping("/ground")
    public ResponseEntity<List<GroundDto>> getTop5HitsLikes() {
        List<GroundDto> list = groundService.getTop5HitsLikes();

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

}
