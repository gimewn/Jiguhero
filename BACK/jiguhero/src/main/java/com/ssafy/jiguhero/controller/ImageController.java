package com.ssafy.jiguhero.controller;

import com.ssafy.jiguhero.service.ImageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

@RestController
@RequestMapping("/image")
@Api("파일/이미지 관련 REST V1")
public class ImageController {

    private final ImageService imageService;
    private final String SUCCESS = "success";
    private final String FAIL = "fail";

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @ApiOperation(value = "유저의 프로필 이미지를 업로드한다.", response = String.class)
    @PostMapping("/user")
    public ResponseEntity<String> uploadUserImage(@RequestParam("file") MultipartFile file, @RequestParam("userId") Long userId, HttpServletRequest request) {
        if(file.isEmpty()) {
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        }
        String url = imageService.saveUserImage(file, userId, request);

        return new ResponseEntity<String>(url, HttpStatus.OK);
    }

    @ApiOperation(value = "특정 장소의 이미지를 업로드한다.", response = String.class)
    @PostMapping("/place")
    public ResponseEntity<String> uploadPlaceImage(@RequestParam("file") MultipartFile file, @RequestParam("userId") Long userId, @RequestParam("placeId") String placeId) {
        if(file.isEmpty()) {
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        }
        imageService.savePlaceImage(file, userId, placeId);

        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }

    @ApiOperation(value = "임무 이미지를 업로드한다.(rep가 1이면 임무 대표 이미지, 0이면 임무 인증샷)", response = String.class)
    @PostMapping("/mission")
    public ResponseEntity<Long> uploadMissionImage(@RequestParam("file") MultipartFile file, @RequestParam("userId") Long userId, @RequestParam("missionId") Long missionId, @RequestParam("rep") int rep) throws Exception {
        if(file.isEmpty()) {
            throw new Exception();
        }
        Long savedImageId = imageService.saveMissionImage(file, userId, missionId, rep);

        return new ResponseEntity<Long>(savedImageId, HttpStatus.OK);
    }

    @ApiOperation(value = "소식 이미지를 업로드한다.", response = String.class)
    @PostMapping("/promotion")
    public ResponseEntity<String> uploadPromotionImage(@RequestParam("file") MultipartFile file, @RequestParam("promotionId") Long promotionId, HttpServletRequest request) {
        if(file.isEmpty()) {
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        }
        String url = imageService.savePromotionImage(file, promotionId, request);

        return new ResponseEntity<String>(url, HttpStatus.OK);
    }

    @ApiOperation(value = "파일명에 해당하는 이미지를 불러온다.", response = Resource.class)
    @GetMapping("/{file_name:.+}")
    public ResponseEntity<Resource> downloadImage(@PathVariable("file_name") String fileName, @RequestParam("target") String target, @RequestParam("date") String date, HttpServletRequest request) {
        Resource resource = null;
        String saveFolder = File.separator + target + File.separator + date;
        try {
            resource = imageService.loadImage(fileName, saveFolder);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+resource.getFilename()+"\"")
                .body(resource);
    }

    @ApiOperation(value = "임무의 인증샷을 삭제한다.", response = String.class)
    @DeleteMapping("/mission/{image_id}")
    public ResponseEntity<String> deleteMissionImage(@PathVariable("image_id") Long imageId) {
        imageService.deleteMissionImage(imageId);

        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }
}
