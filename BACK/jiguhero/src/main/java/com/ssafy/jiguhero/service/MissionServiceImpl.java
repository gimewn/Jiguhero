package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dao.MissionDao;
import com.ssafy.jiguhero.data.dao.UserDao;
import com.ssafy.jiguhero.data.dto.MissionDto;
import com.ssafy.jiguhero.data.entity.Conn_Mission;
import com.ssafy.jiguhero.data.entity.Like_Mission;
import com.ssafy.jiguhero.data.entity.Mission;
import com.ssafy.jiguhero.data.entity.User;
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
    public  MissionDto getMissionById(Long missionId) {
        Mission entity = missionDao.selectMissionById(missionId);

        MissionDto dto = MissionDto.of(entity);
        return dto;
    }

    @Override
    public void saveMission(String title, java.time.LocalDateTime startDate, LocalDateTime endDate, int entryPoint,
                            String sidoCode, String gugunCode, String dongCode, int nowPerson, int maxPerson,
                            int failedPerson, int likes, int hits) {
        Mission mission = new Mission();
        mission.setTitle(title);
        mission.setStartDate(startDate);
        mission.setEndDate(endDate);
        mission.setEntryPoint(entryPoint);
        mission.setSidoCode(sidoCode);
        mission.setGugunCode(gugunCode);
        mission.setDongCode(dongCode);
        mission.setNowPerson(nowPerson);
        mission.setMaxPerson(maxPerson);
        mission.setFailedPerson(failedPerson);
        mission.setLikes(likes);
        mission.setHits(hits);

        // Conn_Mission도 추가해야함(임무 작성한 대원 저장 등)

    }


}
