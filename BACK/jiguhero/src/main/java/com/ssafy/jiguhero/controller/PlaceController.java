package com.ssafy.jiguhero.controller;

import com.ssafy.jiguhero.data.dto.PlaceDto;
import com.ssafy.jiguhero.service.PlaceService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/place")
@Api("장소 관련 REST V1")
public class PlaceController {

    private final PlaceService placeService;

    @Autowired
    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    @ApiOperation(value = "특정 활동구역에 포함된 모든 장소 정보를 반환한다.", response = PlaceDto.class)
    @GetMapping("/get/{ground_id}")
    public ResponseEntity<List<PlaceDto>> getPlaces(@PathVariable("ground_id") Long groundId){

        List<PlaceDto> list = placeService.getPlaces(groundId);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

}
