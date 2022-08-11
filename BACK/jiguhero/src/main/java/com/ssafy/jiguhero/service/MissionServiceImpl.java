package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dao.ImageDao;
import com.ssafy.jiguhero.data.dao.MissionDao;
import com.ssafy.jiguhero.data.dao.UserDao;
import com.ssafy.jiguhero.data.dto.FeedDto;
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

    @Override
    public List<MissionDto> getJoinMissions(Long userId) {
        User userEntity = userDao.selectUserById(userId);
        List<Conn_Mission> joinMissionList = missionDao.selectJoinMissionByUser(userEntity);
        List<Mission> entityList = new ArrayList<>();

        for (Conn_Mission joinMission : joinMissionList) {
            entityList.add(joinMission.getMission());
        }

        List<MissionDto> dtoList = entityList.stream().map(entity -> MissionDto.of(entity)).collect(Collectors.toList());

        return dtoList;
    }

    @Override
    public List<MissionDto> getAllMissions(HttpServletRequest request) {
        List<Mission> entityList = missionDao.selectAllMission();
        List<MissionDto> dtoList = entityList.stream().map(entity -> MissionDto.of(entity)).collect(Collectors.toList());

        for (MissionDto dto : dtoList) {
            String url = getRepMissionImageURL(dto.getMissionId(), request);
            dto.setRepImageURL(url);
        }

        return dtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public MissionDto getMissionById(Long missionId, Long userId, HttpServletRequest request) {
        Mission missionEntity = missionDao.selectMissionById(missionId);
        User userEntity = userDao.selectUserById(userId);
        MissionDto dto = MissionDto.of(missionEntity);
        if(missionDao.selectConnMission(missionEntity, userEntity)!=null) {
            dto.setJoinCheck(true);
        }
        if(missionDao.selectLikeMission(missionEntity, userEntity) != null) {
            dto.setLikeCheck(true);
        }
        dto.setRepImageURL(getRepMissionImageURL(missionId, request));
        dto.setImageURL(getMissionImageURL(missionId, request));
        return dto;
    }

    @Override
    public void saveMission(MissionDto missionDto, Long userId) {
        Mission mission = new Mission();
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        mission.setRegtime(LocalDateTime.now());
        mission.setTitle(missionDto.getTitle());
        mission.setStartDate(LocalDate.parse(missionDto.getStartDate(), DateTimeFormatter.ISO_DATE)); // 바꿔야 함
        mission.setEndDate(LocalDate.parse(missionDto.getEndDate(), DateTimeFormatter.ISO_DATE)); // 바꿔야 함
        mission.setEntryPoint(missionDto.getEntryPoint());
        mission.setSidoCode(missionDto.getSidoCode());
        mission.setGugunCode(missionDto.getGugunCode());
        mission.setDongCode(missionDto.getDongCode());
        mission.setNowPerson(1);
        mission.setMaxPerson(missionDto.getMaxPerson());
        mission.setFailedPerson(0);
        mission.setLikes(0);
        mission.setHits(0);
        missionDao.insertMission(mission);

        Conn_Mission connMission = new Conn_Mission();
        User userEntity = userDao.selectUserById(userId);
        connMission.setState("BEFORE");
        connMission.setRole(0);
        connMission.setSuccessRate(0);
        connMission.setMission(mission);
        connMission.setUser(userEntity);
        missionDao.insertConnMission(connMission);
    }

    public void joinMission(Long userId, Long missionId){
        Conn_Mission connMission = new Conn_Mission();
        Mission mission = missionDao.selectMissionById(missionId);
        User userEntity = userDao.selectUserById(userId);
        connMission.setState("BEFORE");
        connMission.setRole(2);
        connMission.setSuccessRate(0);
        connMission.setMission(mission);
        connMission.setUser(userEntity);
        missionDao.insertConnMission(connMission);

    }

    @Transactional(readOnly = true)
    public int likeMission(Long missionId, Long userId){
        Like_Mission likeMission = new Like_Mission();
        User userEntity = userDao.selectUserById(userId);
        Mission missionEntity = missionDao.selectMissionById(missionId);

        if(missionDao.selectLikeMission(missionEntity, userEntity) == null) {
            likeMission.setUser(userEntity);
            likeMission.setMission(missionEntity);
            missionDao.insertLikeMission(likeMission);
            return 1;
        }
        else {
            deleteLikeMission(missionEntity, userEntity);
            return 2;
        }
    }

    public void deleteLikeMission(Mission mission, User user){
        missionDao.deleteLikeMission(mission, user);
    }

    @Transactional
    public int deleteMission(Long missionId, Long userId){
        Conn_Mission connMission = new Conn_Mission();
        User userEntity = userDao.selectUserById(userId);
        Mission missionEntity = missionDao.selectMissionById(missionId);

        if(missionDao.selectConnMission(missionEntity, userEntity)!=null) {
            missionDao.deleteConnMission(missionEntity);
            missionDao.deleteLikeMission(missionEntity);
            missionDao.deleteMissionById(missionId);

            return 1;
        }
        else return 2;

    }

    @Override
    public MissionDto changeMission(MissionDto missionDto, Long userId) throws Exception{
        Mission missionEntity = missionDao.selectMissionById(missionDto.getMissionId());
        User userEntity = userDao.selectUserById(userId);

        if(missionDao.selectConnMission(missionEntity, userEntity)!=null) {
            Mission mission = missionDao.updateMission(missionDto);
            MissionDto dto = MissionDto.of(mission);
            return dto;
        }
        else {
            throw new Exception();
        }

    }

    /*
    @Override
    public FeedDto getFeedById(Long feedId, Long userId){
        User userEntity = userDao.selectUserById(userId);
        Feed feedEntity = missionDao.selectFeedById(feedId);
        FeedDto dto = FeedDto.of(feedEntity);

        int cnt = missionDao.countByFeed(feedEntity);
        dto.setLikeCnt(cnt);

        if(missionDao.selectLikeFeedByUser(feedEntity, userEntity)!=null){
            dto.setLikeCheck(true);
        }

        return dto;
    }

     */

    /*
    @Override
    public int saveFeed(FeedDto feedDto,Long missionId, Long userId){
        Feed feed = new Feed();
        Mission missionEntity = missionDao.selectMissionById(missionId);
        User userEntity = userDao.selectUserById(userId);

        if(missionDao.searchFeed(userEntity)==null) {
            feed.setContent(feedDto.getContent());
            feed.setRegtime(LocalDate.now());
            feed.setUser(userEntity);
            feed.setMission(missionEntity);
            missionDao.insertFeed(feed);
            return 1; // <해당 날짜, 유저>로 등록된 인증샷이 없는 경우 인증샷 등록 완료
        }
        else
            return 2; // <해당 날짜, 유저>로 등록된 인증샷이 있는 경우 인증샷 등록 불가

    }
     */

    public String getRepMissionImageURL(Long missionId, HttpServletRequest request) {
        Image_Mission imageMission = imageDao.selectRepImageMission(missionDao.selectMissionById(missionId));

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
    public List<String> getMissionImageURL(Long missionId, HttpServletRequest request) {
        List<Image_Mission> imageMissions = imageDao.selectImageMissions(missionDao.selectMissionById(missionId));
        List<String> urlList = new ArrayList<>();

        for (Image_Mission imageMission : imageMissions) {
            String saveFile = imageMission.getSaveFile();
            String saveFolder = imageMission.getSaveFolder();
            String sep = saveFolder.substring(0,1);
            if (sep.equals("\\")) sep = "\\\\";
            String target = saveFolder.split(sep)[1];
            String date = saveFolder.split(sep)[2];
            String url = request.getRequestURL().toString().replace(request.getRequestURI(),"") + "/image/" + saveFile + "?target=" + target + "&date=" + date;

            urlList.add(url);
        }

        return urlList;
    }

    /*
    @Override
    public FeedDto changeFeed(FeedDto feedDto, Long userId) throws Exception{
        User userEntity = userDao.selectUserById(userId);

        if(missionDao.selectFeed(feedDto.getFeedId(), userEntity)!=null) {
            Feed feed = missionDao.updateFeed(feedDto);
            FeedDto dto = FeedDto.of(feed);
            return dto;
        }
        else {
            throw new Exception();
        }
    }
     */

    @Override
    public List<MissionDto> searchMission(String search, String array) {
        List<Mission> entityList = missionDao.searchMission(search, array);

        List<MissionDto> dtoList = entityList.stream().map(entity -> MissionDto.of(entity)).collect(Collectors.toList());

        return dtoList;
    }

}
