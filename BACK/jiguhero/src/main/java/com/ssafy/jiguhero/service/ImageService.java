package com.ssafy.jiguhero.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.FileNotFoundException;
import java.util.Map;

public interface ImageService {

    void init();

    Map<String, String> saveImage(MultipartFile file, String target);

    String saveUserImage(MultipartFile file, Long userId, HttpServletRequest request);

    String savePlaceImage(MultipartFile file, Long userId, String placeId);

    Long saveMissionImage(MultipartFile file, Long userId, Long missionId, int rep);

    String savePromotionImage(MultipartFile file, Long promotionId, HttpServletRequest request);

    void deleteMissionImage(Long imageId);

    Resource loadImage(String fileName, String saveFolder) throws FileNotFoundException;

}
