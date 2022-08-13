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
    public ResponseEntity<List<MissionDto>> getJoinMissions(@PathVariable("user_id") Long userId) {
        List<MissionDto> list = missionService.getJoinMissions(userId);

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

    @ApiOperation(value = "임무를 등록한다.", response = String.class)
    @PostMapping
    public ResponseEntity<String> saveMission(@RequestBody MissionDto missionDto, @RequestParam("userId") Long userId) {
        missionService.insertMission(missionDto, userId);

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

    @ApiOperation(value = "임무에 참여한다.", response = String.class)
    @PostMapping("/{mission_id}/details")
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
    public ResponseEntity<MissionDto> updateMission(@RequestBody MissionDto missionDto, @RequestParam("user_id") Long userId) {
        MissionDto missionDtoResult = null;

        try {
            missionDtoResult = missionService.updateMission(missionDto, userId);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.status(HttpStatus.OK).body(missionDtoResult);
    }

    /*
    @ApiOperation(value = "선택된 인증샷의 정보를 반환한다")
    @GetMapping("/{mission_id}/feed/{feed_id}/details")
    public ResponseEntity<FeedDto> getFeed(@PathVariable("feed_id") Long feedId, @RequestParam("user_id") Long userId){
        FeedDto result = missionService.getFeedById(feedId, userId);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "인증샷을 등록한다")
    @PostMapping("{mission_id}/feed")
    public ResponseEntity<String> insertFeed(@PathVariable("mission_id") Long missionId, @RequestBody FeedDto feedDto, @RequestParam("user_id") Long userId){
        int result = missionService.saveFeed(feedDto, missionId, userId);
        if(result==1) {
            return new ResponseEntity<String>("success", HttpStatus.OK); // 성공적으로 인증샷 등록이 완료된 경우
        }
        else{
            return new ResponseEntity<String>("already", HttpStatus.OK); // 이미 인증샷이 등록되어 있는 경우
        }
    }

    @ApiOperation(value = "해당 인증샷을 수정한다")
    @PutMapping("/{mission_id}/feed/{feed_id}/details")
    public ResponseEntity<FeedDto> changeFeed(@RequestBody FeedDto feedDto, @RequestParam("user_id") Long userId){
        FeedDto feedDtoResult = null;
        try {
            feedDtoResult = missionService.changeFeed(feedDto, userId);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.status(HttpStatus.OK).body(feedDtoResult);
    }
     */

    @ApiOperation(value = "검색어로 검색한 임무 리스트 목록을 제목순(title) or 조회순(hits) or 등록순(time)으로 반환한다")
    @GetMapping("/search")
    public ResponseEntity<List<MissionDto>> searchMission(@RequestParam("search") String search, @RequestParam("array") String array){
        List<MissionDto> list = missionService.searchMission(search, array);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

}