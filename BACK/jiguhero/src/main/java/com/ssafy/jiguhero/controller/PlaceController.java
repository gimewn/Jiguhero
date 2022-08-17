package com.ssafy.jiguhero.controller;

import com.ssafy.jiguhero.data.dto.PlaceDto;
import com.ssafy.jiguhero.data.dto.ReportDto;
import com.ssafy.jiguhero.data.dto.ReviewDto;
import com.ssafy.jiguhero.service.PlaceService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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

    @ApiOperation(value = "특정 활동구역에 포함된 모든 장소 정보를 반환한다.", response = List.class)
    @GetMapping("/list/{ground_id}")
    public ResponseEntity<List<PlaceDto>> getPlaces(@PathVariable("ground_id") Long groundId){
        List<PlaceDto> list = placeService.getPlaces(groundId);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "장소를 등록한다.")
    @PostMapping("/")
    public ResponseEntity<String> savePlace(@RequestBody PlaceDto placeDto){
        System.out.println(placeDto.toString());
        placeService.savePlace(placeDto);
        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

    @ApiOperation(value = "특정 장소에 대한 정보를 반환한다.", response = PlaceDto.class)
    @GetMapping("/get/{place_id}")
    public ResponseEntity<PlaceDto> getPlace(@PathVariable("place_id") String placeId, HttpServletRequest request){
        PlaceDto placeDto = placeService.getPlace(placeId, request);

        return ResponseEntity.status(HttpStatus.OK).body(placeDto);
    }

    @ApiOperation(value = "특정 장소에 대한 모든 리뷰 정보를 반환한다.", response = List.class)
    @GetMapping("/review/{place_id}")
    public ResponseEntity<List<ReviewDto>> getReviews(@PathVariable("place_id") String placeId){
        List<ReviewDto> list = placeService.getReviews(placeId);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @ApiOperation(value = "특정 장소에 대한 리뷰를 저장한다.")
    @PostMapping("/review")
    public ResponseEntity<String> saveReview(
            @RequestBody ReviewDto review,
            @RequestParam("placeId") String placeId,
            @RequestParam("userId") Long userId){
        placeService.saveReview(review, placeId, userId);

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

    @ApiOperation(value = "리뷰를 삭제한다.")
    @DeleteMapping("/review/{review_id}")
    public void deleteReview(@PathVariable("review_id") Long reviewId){
        placeService.deleteReview(reviewId);
    }

    @ApiOperation(value = "특정 장소에 대한 신고를 저장한다.")
    @PostMapping("/report")
    public ResponseEntity<String> saveReport(
            @RequestBody ReportDto report,
            @RequestParam("placeId") String placeId,
            @RequestParam("userId") Long userId){
        placeService.saveReport(report, placeId, userId);

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

}
