package com.ssafy.jiguhero.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;

public interface ImageService {

    void init();

    String saveImage(MultipartFile file);

    Resource loadImage(String fileName) throws FileNotFoundException;

}
