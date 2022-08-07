package com.ssafy.jiguhero.controller;

import com.ssafy.jiguhero.data.dto.DongDto;
import com.ssafy.jiguhero.data.dto.GugunDto;
import com.ssafy.jiguhero.data.dto.PlaceDto;
import com.ssafy.jiguhero.data.dto.SidoDto;
import com.ssafy.jiguhero.service.MapService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/map")
@Api("지도 관련 REST V1")
public class MapController {

    private final MapService mapService;

    @Autowired
    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @ApiOperation(value = "전국의 모든 시/도 목록을 반환한다.", response = List.class)
    @GetMapping("/sido")
    public ResponseEntity<List<SidoDto>> getSidoList() {
        List<SidoDto> list = mapService.getSidoList();

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "해당 시/도 코드에 속하는 구/군 목록을 반환한다.", response = List.class)
    @GetMapping("/gugun/{sido_code}")
    public ResponseEntity<List<GugunDto>> getGugunList(@PathVariable("sido_code") String sidoCode) {
        List<GugunDto> list = mapService.getGugunList(sidoCode);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "해당 구/군 코드에 속하는 동 목록을 반환한다.", response = List.class)
    @GetMapping("/dong/{gugun_code}")
    public ResponseEntity<List<DongDto>> getDongList(@PathVariable("gugun_code") String gugunCode) {
        List<DongDto> list = mapService.getDongList(gugunCode);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "접속위치와 가까운 순서대로 친환경가게 목록을 반환한다.", response = List.class)
    @GetMapping
    public ResponseEntity<List<PlaceDto>> getPlaceList10kmRadius(@RequestParam("lat") Double curLat, @RequestParam("lng") Double curLng) {
        List<PlaceDto> list = mapService.getPlaceList10kmRadius(curLat, curLng);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

}
