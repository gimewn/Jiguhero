package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.config.FileUploadProperties;
import com.ssafy.jiguhero.data.dao.*;
import com.ssafy.jiguhero.data.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class ImageServiceImpl implements ImageService {

    private final Path dirPath;
    private final ImageDao imageDao;
    private final UserDao userDao;
    private final PlaceDao placeDao;
    private final MissionDao missionDao;
    private final PromotionDao promotionDao;

    @Autowired
    public ImageServiceImpl(FileUploadProperties fileUploadProperties, ImageDao imageDao, UserDao userDao, PlaceDao placeDao, MissionDao missionDao, PromotionDao promotionDao) {
        this.dirPath = Paths.get(fileUploadProperties.getPath()).toAbsolutePath().normalize();
        this.imageDao = imageDao;
        this.userDao = userDao;
        this.placeDao = placeDao;
        this.missionDao = missionDao;
        this.promotionDao = promotionDao;
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
        map.put("date", today);

        return map;
    }

    @Override
    public String saveUserImage(MultipartFile file, Long userId, HttpServletRequest request) {
        if(file.isEmpty()){
            return "failed";
        }
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

        String url = request.getRequestURL().toString().replace(request.getRequestURI(),"") + "/image/" + map.get("save_file") + "?target=user&date=" + map.get("date");

        return url;
    }

    @Override
    public String savePlaceImage(MultipartFile file, Long userId, String placeId) {
        Map<String, String> map = saveImage(file, "place");

        Image_Place newImagePlace = new Image_Place();
        newImagePlace.setOriginFile(map.get("origin_file"));
        newImagePlace.setSaveFile(map.get("save_file"));
        newImagePlace.setSaveFolder(map.get("save_folder"));
        newImagePlace.setPlace(placeDao.selectPlaceById(placeId));
        newImagePlace.setUser(userDao.selectUserById(userId));
        imageDao.insertImagePlace(newImagePlace);

        return map.get("save_file");
    }

    @Override
    @Transactional
    public Long saveMissionImage(MultipartFile file, Long userId, Long missionId, int rep) {
        if (rep == 1) { // 대표 이미지 등록일 경우
            Image_Mission imageMission = imageDao.selectRepImageMission(missionDao.selectMissionById(missionId));
            if (imageMission != null) { // 대표 이미지가 이미 등록되어 있을 경우
                try {
                    imageDao.deleteImageMission(imageMission);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        }

        Map<String, String> map = saveImage(file, "mission");

        Image_Mission newImageMission = new Image_Mission();
        newImageMission.setOriginFile(map.get("origin_file"));
        newImageMission.setSaveFile(map.get("save_file"));
        newImageMission.setSaveFolder(map.get("save_folder"));
        newImageMission.setMission(missionDao.selectMissionById(missionId));
        newImageMission.setUser(userDao.selectUserById(userId));
        newImageMission.setRegtime(LocalDateTime.now());
        if (rep == 1) newImageMission.setRep(true);
        else {
            List<Optional<Image_Mission>> imageMissions = imageDao.selectImageMissionByUserAndMission(userDao.selectUserById(userId), missionDao.selectMissionById(missionId));
            for(Optional<Image_Mission> imageMission : imageMissions){
                if(imageMission.isPresent() && !imageMission.get().isRep()){
                    if(imageMission.get().getRegtime().toString().substring(0, 10).equals(LocalDateTime.now().toString().substring(0, 10))){
                        return (long)-1;
                    }
                }
            }

            newImageMission.setRep(false);
        }
        Image_Mission insertedImageMission = imageDao.insertImageMission(newImageMission);

        return insertedImageMission.getImageId();
    }

    @Override
    public String savePromotionImage(MultipartFile file, Long promotionId, HttpServletRequest request) {
        // 이미 이미지가 등록되어 있는지 확인
        Promotion promotion = promotionDao.selectPromotion(promotionId);
        Image_Promotion imagePromotion = imageDao.selectImagePromotion(promotion);
        if (imagePromotion != null) { // 이미지가 이미 등록되어 있을 경우
            try {
                imageDao.deleteImagePromotion(imagePromotion);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        Map<String, String> map = saveImage(file, "promotion");

        Image_Promotion newImagePromotion = new Image_Promotion();
        newImagePromotion.setOriginFile(map.get("origin_file"));
        newImagePromotion.setSaveFile(map.get("save_file"));
        newImagePromotion.setSaveFolder(map.get("save_folder"));
        newImagePromotion.setPromotion(promotion);
        imageDao.insertImagePromotion(newImagePromotion);

        String url = request.getRequestURL().toString().replace(request.getRequestURI(),"") + "/image/" + map.get("save_file") + "?target=promotion&date=" + map.get("date");

        return url;
    }

    @Override
    public void deleteMissionImage(Long imageId) {
        Image_Mission imageMission = imageDao.selectImageMissionById(imageId);
        try {
            imageDao.deleteImageMission(imageMission);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
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
