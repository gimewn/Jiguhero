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

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        if(file.isEmpty()) {
            // 이미지를 업로드 하지 않았을 경우 처리
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        }
        String fileName = imageService.saveImage(file);
        String fileURI = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/image/download/")
                .path(fileName)
                .toUriString();

        return new ResponseEntity<String>(fileURI, HttpStatus.OK);
    }

    @GetMapping("/download/{file_name:.+}")
    public ResponseEntity<Resource> downloadImage(@PathVariable("file_name") String fileName, HttpServletRequest request) {
        Resource resource = null;
        try {
            resource = imageService.loadImage(fileName);
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
