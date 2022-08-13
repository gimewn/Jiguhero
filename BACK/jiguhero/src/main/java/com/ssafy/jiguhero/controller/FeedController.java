package com.ssafy.jiguhero.controller;

import com.ssafy.jiguhero.data.dto.FeedDto;
import com.ssafy.jiguhero.data.entity.Feed;
import com.ssafy.jiguhero.service.FeedService;
import com.ssafy.jiguhero.service.MissionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feed")
@Api("인증샷 관련 REST V1")
public class FeedController {

    private final FeedService feedService;

    @Autowired
    public FeedController(FeedService feedService) {
        this.feedService = feedService;
    }

    @ApiOperation(value = "인증샷을 등록한다")
    @PostMapping("/")
    public ResponseEntity<String> insertFeed(@RequestParam("missionId") Long missionId, @RequestBody FeedDto feedDto, @RequestParam("userId") Long userId){
        int result = feedService.insertFeed(feedDto, missionId, userId);
        if(result==1) {
            return new ResponseEntity<String>("success", HttpStatus.OK); // 성공적으로 인증샷 등록이 완료된 경우
        }
        else{
            return new ResponseEntity<String>("fail", HttpStatus.OK); // 이미 인증샷이 등록되어 있는 경우
        }
    }

    @ApiOperation(value = "인증샷을 수정한다")
    @PutMapping("/{feed_id}")
    public ResponseEntity<FeedDto> updateFeed(@RequestBody FeedDto feedDto, @RequestParam("userId") Long userId){
        FeedDto feedDtoResult = null;
        try {
            feedDtoResult = feedService.updateFeed(feedDto, userId);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.status(HttpStatus.OK).body(feedDtoResult);
    }

    @ApiOperation(value = "인증샷을 삭제한다")
    @DeleteMapping("/{feed_id}")
    public ResponseEntity<String> deleteFeed(@PathVariable("feed_id") Long feedId, @RequestParam("userId") Long userId, @RequestParam("missionId") Long missionId) {
        int check = feedService.deleteFeed(feedId, userId, missionId);

        if(check == 1) {
            return new ResponseEntity<String>("success", HttpStatus.OK); // 성공적으로 인증샷 삭제가 완료된 경우
        }
        else {
            return new ResponseEntity<String>("fail", HttpStatus.OK); // 인증샷 삭제중 문제 발생한 경우
        }

    }

    @ApiOperation(value = "인증샷(1개)의 정보를 가져온다")
    @GetMapping("/{feed_id}")
    public ResponseEntity<FeedDto> getFeed(@PathVariable("feed_id") Long feedId, @RequestParam("userId") Long userId){
        FeedDto result = feedService.getFeedById(feedId, userId);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
