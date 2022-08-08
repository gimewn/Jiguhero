package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dao.MissionDao;
import com.ssafy.jiguhero.data.dao.UserDao;
import com.ssafy.jiguhero.data.dto.FeedDto;
import com.ssafy.jiguhero.data.dto.MissionDto;
import com.ssafy.jiguhero.data.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MissionServiceImpl implements MissionService {

    private final MissionDao missionDao;
    private final UserDao userDao;

    @Autowired
    public MissionServiceImpl(MissionDao missionDao, UserDao userDao) {
        this.missionDao = missionDao;
        this.userDao = userDao;
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
    public List<MissionDto> getAllMissions() {
        List<Mission> entityList = missionDao.selectAllMission();
        List<MissionDto> dtoList = entityList.stream().map(entity -> MissionDto.of(entity)).collect(Collectors.toList());

        return dtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public  MissionDto getMissionById(Long missionId, Long userId) {
        Mission missionEntity = missionDao.selectMissionById(missionId);
        User userEntity = userDao.selectUserById(userId);
        MissionDto dto = MissionDto.of(missionEntity);
        if(missionDao.selectConnMission(missionEntity, userEntity)!=null) {
            dto.setJoinCheck(true);
        }
        if(missionDao.selectLikeMission(missionEntity, userEntity) != null) {
            dto.setLikeCheck(true);
        }
        return dto;
    }

    @Override
    public void saveMission(MissionDto missionDto, Long userId) {
        Mission mission = new Mission();
        mission.setTitle(missionDto.getTitle());
        mission.setStartDate(LocalDateTime.now()); // 바꿔야 함
        mission.setEndDate(LocalDateTime.now()); // 바꿔야 함
        mission.setEntryPoint(missionDto.getEntryPoint());
        mission.setSidoCode(missionDto.getSidoCode());
        mission.setGugunCode(missionDto.getGugunCode());
        mission.setDongCode(missionDto.getDongCode());
        mission.setNowPerson(missionDto.getNowPerson());
        mission.setMaxPerson(missionDto.getMaxPerson());
        mission.setFailedPerson(missionDto.getFailedPerson());
        mission.setLikes(missionDto.getLikes());
        mission.setHits(missionDto.getHits());
        missionDao.insertMission(mission);

        Conn_Mission connMission = new Conn_Mission();
        User userEntity = userDao.selectUserById(userId);
        connMission.setState("BEFORE");
        connMission.setRole(0);
        connMission.setSuccessRate(0);
        connMission.setMission(mission);
        connMission.setUser(userEntity);

    }

    public void joinMission(Long userId, Long missionId){
        Conn_Mission connMission = new Conn_Mission();
        Mission mission = missionDao.selectMissionById(missionId);
        User userEntity = userDao.selectUserById(userId);
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

}
