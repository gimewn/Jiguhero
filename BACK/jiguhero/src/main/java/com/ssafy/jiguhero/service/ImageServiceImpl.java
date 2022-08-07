package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.config.FileUploadProperties;
import com.ssafy.jiguhero.data.dao.ImageDao;
import com.ssafy.jiguhero.data.dao.UserDao;
import com.ssafy.jiguhero.data.entity.Image_User;
import com.ssafy.jiguhero.data.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class ImageServiceImpl implements ImageService {

    private final Path dirPath;
    private final ImageDao imageDao;
    private final UserDao userDao;

    @Autowired
    public ImageServiceImpl(FileUploadProperties fileUploadProperties, ImageDao imageDao, UserDao userDao) {
        this.dirPath = Paths.get(fileUploadProperties.getPath()).toAbsolutePath().normalize();
        this.imageDao = imageDao;
        this.userDao = userDao;
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
    public Map<String, String> saveImage(MultipartFile file, String target) {
        String originalFileName = file.getOriginalFilename(); // 원본 파일 이름
        String saveFileName = UUID.randomUUID().toString() + originalFileName.substring(originalFileName.lastIndexOf('.')); // 변환된 파일 이름
        String today = new SimpleDateFormat("yyMMdd").format(new Date()); // 오늘 날짜 폴더
        String saveFolder = this.dirPath + File.separator + target + File.separator + today; // 파일이 저장될 폴더 경로
        File folder = new File(saveFolder);
        if (!folder.exists()) // 폴더가 존재하지 않을 경우 생성
            folder.mkdirs();
        Path filePath = Path.of(saveFolder + File.separator + saveFileName); // 파일 경로
        try {
            // 파일이 업로드 되는 부분
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }

        Map<String, String> map = new HashMap<>();
        map.put("origin_file", originalFileName);
        map.put("save_file", saveFileName);
        map.put("save_folder", File.separator + target + File.separator + today);

        return map;
    }

    @Override
    public String saveUserImage(MultipartFile file, Long userId) {
        // 이미 프로필 이미지가 등록되어 있는지 확인
        User user = userDao.selectUserById(userId);
        Image_User imageUser = imageDao.selectImageUser(user);
        if (imageUser != null) { // 이미 등록되어 있으면 프로필 이미지 정보 삭제
            try {
                imageDao.deleteImageUser(user);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        Map<String, String> map = saveImage(file, "user");

        Image_User newImageUser = new Image_User();
        newImageUser.setOriginFile(map.get("origin_file"));
        newImageUser.setSaveFile(map.get("save_file"));
        newImageUser.setSaveFolder(map.get("save_folder"));
        newImageUser.setUser(userDao.selectUserById(userId));
        imageDao.insertImageUser(newImageUser);

        return map.get("save_file");
    }

    @Override
    public Resource loadImage(String fileName, String saveFolder) throws FileNotFoundException {
        try {
            Path filePath = Path.of(this.dirPath + File.separator + saveFolder + File.separator + fileName);
            System.out.println(filePath);
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
