package com.ssafy.jiguhero.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.util.Map;

public interface ImageService {

    void init();

    Map<String, String> saveImage(MultipartFile file, String target);

    String saveUserImage(MultipartFile file, Long userId);

    String savePlaceImage(MultipartFile file, Long userId, String placeId);

    Resource loadImage(String fileName, String saveFolder) throws FileNotFoundException;

}
