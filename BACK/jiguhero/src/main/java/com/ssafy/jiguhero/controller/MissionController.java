package com.ssafy.jiguhero.controller;

import com.ssafy.jiguhero.data.dto.FeedDto;
import com.ssafy.jiguhero.data.dto.GroundDto;
import com.ssafy.jiguhero.data.dto.MissionDto;
import com.ssafy.jiguhero.service.MissionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
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
    @GetMapping("/{user_id}/joins")
    public ResponseEntity<List<MissionDto>> getJoinMissions(@PathVariable("user_id") Long userId, HttpServletRequest request) {
        List<MissionDto> list = missionService.getJoinMissions(userId, request);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "전체 임무 리스트를 제목순(title) or 조회순(hits) or 등록순(time)으로 반환한다.", response = List.class)
    @GetMapping()
    public ResponseEntity<List<MissionDto>> getAllMissions(HttpServletRequest request, @RequestParam("array") String array) {
        List<MissionDto> list = missionService.getAllMissions(request, array);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "임무를 상세보기 한다.", response = String.class) // 좋아요 클릭 여부/ 기능 추가해야 함 o
    @GetMapping("/{mission_id}/details")
    public ResponseEntity<MissionDto> getMission(@PathVariable("mission_id") Long missionId, @RequestParam("userId") Long userId, HttpServletRequest request) {
        MissionDto result = missionService.getMissionById(missionId, userId, request);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "임무를 등록한다.", response = Long.class)
    @PostMapping
    public ResponseEntity<Long> saveMission(@RequestBody MissionDto missionDto, @RequestParam("userId") Long userId) {
        Long savedMissionId = missionService.insertMission(missionDto, userId);

        return new ResponseEntity<Long>(savedMissionId, HttpStatus.OK);
    }

    @ApiOperation(value = "임무에 참여한다.", response = String.class)
    @PostMapping("/join")
    public ResponseEntity<String> joinMission(@RequestParam("userId") Long userId, @RequestParam("missionId") Long missionId) {
        int check = missionService.joinMission(userId, missionId);

        if(check == 1) {
            return new ResponseEntity<String>("success", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("fail", HttpStatus.OK);
        }
    }

    @ApiOperation(value = "임무의 '좋아요'를 클릭한다.", response = List.class)
    @PostMapping("/{mission_id}/hearts")
    public ResponseEntity<String> saveLikeMission(@PathVariable("mission_id") Long missionId, @RequestParam("userId") Long userId) {
        int check = missionService.likeMission(missionId, userId);

        if(check == 1) {
            return new ResponseEntity<String>("success", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("deletesuccess", HttpStatus.OK);
        }
    }

    @ApiOperation(value = "임무를 삭제한다.", response = List.class)
    @DeleteMapping("/{mission_id}/details")
    public ResponseEntity<String> deleteMission(@PathVariable("mission_id") Long missionId, @RequestParam("userId") Long userId) {
        int check = missionService.deleteMission(missionId, userId);

        if(check == 1) {
            return new ResponseEntity<String>("success", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("fail", HttpStatus.OK);
        }
    }

    @ApiOperation(value = "임무의 세부 내용을 변경한다", response = String.class)
    @PutMapping("/{mission_id}/details")
    public ResponseEntity<MissionDto> updateMission(@PathVariable("mission_id") Long missionId, @RequestBody MissionDto missionDto, @RequestParam("userId") Long userId) {
        MissionDto missionDtoResult = null;
        missionDto.setMissionId(missionId);
        try {
            missionDtoResult = missionService.updateMission(missionDto, userId);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.status(HttpStatus.OK).body(missionDtoResult);
    }

    @ApiOperation(value = "검색어로 검색한 임무 리스트 목록을 제목순(title) or 조회순(hits) or 등록순(time)으로 반환한다")
    @GetMapping("/search")
    public ResponseEntity<List<MissionDto>> searchMission(@RequestParam("search") String search, @RequestParam("array") String array, HttpServletRequest request){
        List<MissionDto> list = missionService.searchMission(search, array, request);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "임무의 달성률을 반환한다")
    @GetMapping("/{mission_id}/rate")
    public ResponseEntity<Integer> successRateMission(@PathVariable("mission_id") Long missionId, @RequestParam("userId") Long userId){
        int list = missionService.searchSuccessRate(missionId, userId);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

}