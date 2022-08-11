package com.ssafy.jiguhero.controller;

import com.ssafy.jiguhero.service.ImageService;
import io.swagger.annotations.Api;
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

    @PostMapping("/user")
    public ResponseEntity<String> uploadUserImage(@RequestParam("file") MultipartFile file, @RequestParam("userId") Long userId, HttpServletRequest request) {
        if(file.isEmpty()) {
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        }
        String url = imageService.saveUserImage(file, userId, request);

        return new ResponseEntity<String>(url, HttpStatus.OK);
    }

    @PostMapping("/place")
    public ResponseEntity<String> uploadPlaceImage(@RequestParam("file") MultipartFile file, @RequestParam("userId") Long userId, @RequestParam("placeId") String placeId) {
        if(file.isEmpty()) {
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        }
        imageService.savePlaceImage(file, userId, placeId);

        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }

    @PostMapping("/mission")
    public ResponseEntity<String> uploadMissionImage(@RequestParam("file") MultipartFile file, @RequestParam("userId") Long userId, @RequestParam("missionId") Long missionId, @RequestParam("rep") int rep) {
        if(file.isEmpty()) {
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        }
        imageService.saveMissionImage(file, userId, missionId, rep);

        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }

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
}
