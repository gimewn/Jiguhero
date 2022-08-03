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

}
