package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dao.ImageDao;
import com.ssafy.jiguhero.data.dao.MissionDao;
import com.ssafy.jiguhero.data.dao.UserDao;
import com.ssafy.jiguhero.data.dto.MissionDto;
import com.ssafy.jiguhero.data.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MissionServiceImpl implements MissionService {

    private final MissionDao missionDao;
    private final UserDao userDao;
    private final ImageDao imageDao;

    @Autowired
    public MissionServiceImpl(MissionDao missionDao, UserDao userDao, ImageDao imageDao) {
        this.missionDao = missionDao;
        this.userDao = userDao;
        this.imageDao = imageDao;
    }

    @Override
    public List<MissionDto> getTop3NowPerson() {
        List<Mission> entityList = missionDao.selectTop3NowPerson();

        List<MissionDto> dtoList = entityList.stream().map(entity -> MissionDto.of(entity)).collect(Collectors.toList());

        return dtoList;
    }

    @Transactional
    @Override
    public List<MissionDto> getLikeMissions(Long userId) {
        User userEntity = userDao.selectUserById(userId);
        List<Like_Mission> likeMissionList = missionDao.selectLikeMissionByUser(userEntity);
        List<Mission> entityList = new ArrayList<>();

        for (Like_Mission likeMission : likeMissionList) {
            entityList.add(likeMission.getMission());
        }

        List<MissionDto> dtoList = entityList.stream().map(entity -> MissionDto.of(entity)).collect(Collectors.toList());

        return dtoList;
    }

    @Transactional
    @Override
    public List<MissionDto> getJoinMissions(Long userId, HttpServletRequest request) {
        User userEntity = userDao.selectUserById(userId);
        List<Conn_Mission> joinMissionList = missionDao.selectJoinMissionByUser(userEntity);
        List<Mission> entityList = new ArrayList<>();

        for (Conn_Mission joinMission : joinMissionList) {
            entityList.add(joinMission.getMission());
        }

        List<MissionDto> dtoList = entityList.stream().map(entity -> MissionDto.of(entity)).collect(Collectors.toList());

        for(MissionDto missionDto : dtoList) {
            missionDto.setRepImageURL(getRepMissionImageURL(missionDto.getMissionId(), request));
        }

        return dtoList;
    }

    @Override
    public List<MissionDto> getAllMissions(HttpServletRequest request, String array) {
        List<Mission> entityList = missionDao.selectAllMission(array);
        List<MissionDto> dtoList = entityList.stream().map(entity -> MissionDto.of(entity)).collect(Collectors.toList());

        for (MissionDto dto : dtoList) {
            String url = getRepMissionImageURL(dto.getMissionId(), request);
            dto.setRepImageURL(url);
        }

        return dtoList;
    }

    @Override
    @Transactional
    public MissionDto getMissionById(Long missionId, Long userId, HttpServletRequest request) {
        Mission missionEntity = missionDao.selectMissionById(missionId);
        User userEntity = userDao.selectUserById(userId);

        missionEntity.setHits(missionEntity.getHits()+1); // 조회수 +1
        missionDao.insertMission(missionEntity);

        MissionDto dto = MissionDto.of(missionEntity);
        if(missionDao.selectConnMission(missionEntity, userEntity)!=null) {
            dto.setJoinCheck(true); // 사용자가 해당 임무에 참여한 경우
        }
        if(missionDao.selectLikeMission(missionEntity, userEntity) != null) {
            dto.setLikeCheck(true); // 사용자가 해당 임무를 좋아요한 경우
        }
        dto.setRepImageURL(getRepMissionImageURL(missionId, request));
        dto.setImageURL(getMissionImageURL(missionId, request));

        return dto;
    }

    @Override
    public Long insertMission(MissionDto missionDto, Long userId) {
        Mission mission = new Mission();

        mission.setRegtime(LocalDateTime.now());
        mission.setTitle(missionDto.getTitle());
        mission.setContent(missionDto.getContent());
        mission.setStartDate(LocalDate.parse(missionDto.getStartDate(), DateTimeFormatter.ISO_DATE));
        mission.setEndDate(LocalDate.parse(missionDto.getEndDate(), DateTimeFormatter.ISO_DATE));
        mission.setEntryPoint(missionDto.getEntryPoint());
        mission.setSidoCode(missionDto.getSidoCode());
        mission.setGugunCode(missionDto.getGugunCode());
        mission.setDongCode(missionDto.getDongCode());
        mission.setNowPerson(1);
        mission.setMaxPerson(missionDto.getMaxPerson());
        mission.setFailedPerson(0);
        mission.setLikes(0);
        mission.setHits(0);
        mission.setUser(userDao.selectUserById(userId));
        Mission insertedMission = missionDao.insertMission(mission);

        Conn_Mission connMission = new Conn_Mission();
        User userEntity = userDao.selectUserById(userId);
        connMission.setState("BEFORE");
        connMission.setRole(1);
        connMission.setSuccessRate(0);
        connMission.setMission(mission);
        connMission.setUser(userEntity);
        missionDao.insertConnMission(connMission);

        return insertedMission.getMissionId();
    }

    @Transactional
    public int joinMission(Long userId, Long missionId){
        Conn_Mission connMission = new Conn_Mission();
        Mission missionEntity = missionDao.selectMissionById(missionId);
        User userEntity = userDao.selectUserById(userId);

        if(missionEntity.getStartDate().isAfter(LocalDate.now()) && missionEntity.getMaxPerson() > missionEntity.getNowPerson() && missionDao.selectConnMission(missionEntity, userEntity)==null) {
            connMission.setState("BEFORE");
            connMission.setRole(2);
            connMission.setSuccessRate(0);
            connMission.setMission(missionEntity);
            connMission.setUser(userEntity);
            missionDao.insertConnMission(connMission);

            missionEntity.setNowPerson(missionEntity.getNowPerson() + 1);
            missionDao.insertMission(missionEntity);

            userEntity.setPoint(userEntity.getPoint() - missionEntity.getEntryPoint());
            userDao.updatePoint(userEntity);

            return 1; // 임무가 시작되기 전이며 성공적으로 임무 참여가 완료된 경우
        }
        else {
            return 2; // 임무가 시작되었거나 임무 참여가 실패한 경우
        }
    }

    @Transactional
    public int likeMission(Long missionId, Long userId){
        Like_Mission likeMission = new Like_Mission();
        User userEntity = userDao.selectUserById(userId);
        Mission missionEntity = missionDao.selectMissionById(missionId);

        if(missionDao.selectLikeMission(missionEntity, userEntity) == null) { // 임무의 좋아요 클릭 여부 체크
            likeMission.setUser(userEntity);
            likeMission.setMission(missionEntity);
            missionDao.insertLikeMission(likeMission);

            missionEntity.setLikes(missionEntity.getLikes()+1);
            missionDao.insertMission(missionEntity);

            return 1; // 임무의 좋아요를 클릭한 경우
        }
        else {
            deleteLikeMission(missionEntity, userEntity);

            missionEntity.setLikes(missionEntity.getLikes()-1);
            missionDao.insertMission(missionEntity);

            return 2; // 임무의 좋아요를 취소한 경우
        }
    }

    public void deleteLikeMission(Mission mission, User user){
        missionDao.deleteLikeMission(mission, user);
    }

    @Transactional
    public int deleteMission(Long missionId, Long userId){
        User userEntity = userDao.selectUserById(userId);
        Mission missionEntity = missionDao.selectMissionById(missionId);
        
        Conn_Mission connMission = missionDao.selectConnMission(missionEntity, userEntity);
        
        if((connMission != null) && (connMission.getRole() == 1)) {
            List<Image_Mission> list = imageDao.selectImageMissions(missionEntity);
            for(Image_Mission imageMission : list){
                try {
                    imageDao.deleteImageMission(imageMission);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }

            missionDao.deleteConnMission(missionEntity);
            missionDao.deleteLikeMission(missionEntity);
            missionDao.deleteMissionById(missionId);

            return 1; // 해당 임무를 등록한 사용자이며 임무 삭제가 완료된 경우
        }
        else {
            return 2; // 해당 임무를 등록한 사용자가 아니거나 임무 삭제가 실패한 경우
        }

    }

    @Override
    public MissionDto updateMission(MissionDto missionDto, Long userId) throws Exception{
        Mission missionEntity = missionDao.selectMissionById(missionDto.getMissionId());
        User userEntity = userDao.selectUserById(userId);

        Conn_Mission connMission = missionDao.selectConnMission(missionEntity, userEntity);

        if((connMission != null) && (connMission.getRole() == 1)) {
            Mission mission = missionDao.updateMission(missionDto);
            MissionDto dto = MissionDto.of(mission);
            return dto; // 해당 임무를 등록한 사용자이며 임무 변경이 완료된 경우
        }
        else {
            throw new Exception(); // 임무 변경이 실패한 경우
        }

    }

    public String getRepMissionImageURL(Long missionId, HttpServletRequest request) {
        Image_Mission imageMission = imageDao.selectRepImageMission(missionDao.selectMissionById(missionId));
        if (imageMission == null) return null;

        String saveFile = imageMission.getSaveFile();
        String saveFolder = imageMission.getSaveFolder();
        String sep = saveFolder.substring(0,1);
        if (sep.equals("\\")) sep = "\\\\";
        String target = saveFolder.split(sep)[1];
        String date = saveFolder.split(sep)[2];
        String url = request.getRequestURL().toString().replace(request.getRequestURI(),"") + "/image/" + saveFile + "?target=" + target + "&date=" + date;

        return url;
    }

    @Override
    public List<List<String>> getMissionImageURL(Long missionId, HttpServletRequest request) {
        List<Image_Mission> imageMissions = imageDao.selectFeedImageMissions(missionDao.selectMissionById(missionId));
        List<List<String>> urlList = new ArrayList<>();

        for (Image_Mission imageMission : imageMissions) {
            List<String> data = new ArrayList<>();
            Long imageId = imageMission.getImageId();
            String saveFile = imageMission.getSaveFile();
            String saveFolder = imageMission.getSaveFolder();
            String sep = saveFolder.substring(0,1);
            if (sep.equals("\\")) sep = "\\\\";
            String target = saveFolder.split(sep)[1];
            String date = saveFolder.split(sep)[2];
            String url = request.getRequestURL().toString().replace(request.getRequestURI(),"") + "/image/" + saveFile + "?target=" + target + "&date=" + date;

            String userId = String.valueOf(imageMission.getUser().getUserId());

            data.add(imageId.toString());
            data.add(url);
            data.add(userId);
            urlList.add(data);
        }

        return urlList;
    }

    @Override
    public List<MissionDto> searchMission(String search, String array, HttpServletRequest request) {
        List<Mission> entityList = missionDao.searchMission(search, array);
        List<MissionDto> dtoList = entityList.stream().map(entity -> MissionDto.of(entity)).collect(Collectors.toList());

        for (MissionDto dto : dtoList) {
            String url = getRepMissionImageURL(dto.getMissionId(), request);
            dto.setRepImageURL(url);
        }

        return dtoList;
    }

    @Override
    public int searchSuccessRate(Long missionId, Long userId){
        Mission missionEntity = missionDao.selectMissionById(missionId);
        User userEntity = userDao.selectUserById(userId);
        Conn_Mission connMissionEntity = missionDao.selectConnMission(missionEntity, userEntity);

        int result;

        if(connMissionEntity != null) {
            result = connMissionEntity.getSuccessRate();
        }
        else {
            result = -1;
        }
        return result;
    }
}
