package com.ssafy.jiguhero.controller;

import com.ssafy.jiguhero.data.dto.GroundDto;
import com.ssafy.jiguhero.data.dto.MissionDto;
import com.ssafy.jiguhero.service.MissionService;
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
@RequestMapping("/mission")
@Api("임무 관련 REST V1")
public class MissionController {

    private final MissionService missionService;

    @Autowired
    public MissionController(MissionService missionService) {
        this.missionService = missionService;
    }

    @ApiOperation(value = "user_id에 해당하는 유저가 좋아요한 임무 목록을 반환한다.", response = List.class)
    @GetMapping("/{user_id}/hearts")
    public ResponseEntity<List<MissionDto>> getLikeMissions(@PathVariable("user_id") Long userId) {
        List<MissionDto> list = missionService.getLikeMissions(userId);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "user_id에 해당하는 유저가 참여중인 임무 리스트를 반환한다.", response = List.class)
    @GetMapping("/{user_id}")
    public ResponseEntity<List<MissionDto>> getJoinMissions(@PathVariable("user_id") Long userId) {
        List<MissionDto> list = missionService.getJoinMissions(userId);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "전체 임무 리스트를 반환한다.", response = List.class)
    @GetMapping("/")
    public ResponseEntity<List<MissionDto>> getAllMissions() {
        List<MissionDto> list = missionService.getAllMissions();

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }
}
