package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.config.FileUploadProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class ImageServiceImpl implements ImageService {

    private final Path dirPath;

    @Autowired
    public ImageServiceImpl(FileUploadProperties fileUploadProperties) {
        this.dirPath = Paths.get(fileUploadProperties.getPath()).toAbsolutePath().normalize();
    }

    @Override
    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(this.dirPath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String saveImage(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        Path filePath = this.dirPath.resolve(fileName);
        try {
            // 파일이 업로드 되는 부분
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return fileName;
    }

    @Override
    public Resource loadImage(String fileName) throws FileNotFoundException {
        try {
            Path filePath = this.dirPath.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
              throw new FileNotFoundException("Could not find file");
            }
        } catch (MalformedURLException e) {
            throw new FileNotFoundException("Could not download file");
        }
    }


}
