package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dao.ImageDao;
import com.ssafy.jiguhero.data.dao.MissionDao;
import com.ssafy.jiguhero.data.dao.UserDao;
import com.ssafy.jiguhero.data.entity.Conn_Mission;
import com.ssafy.jiguhero.data.entity.Mission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class Scheduler {

    private final MissionDao missionDao;
    private final UserDao userDao;
    private final ImageDao imageDao;

    @Autowired
    public Scheduler(MissionDao missionDao, UserDao userDao, ImageDao imageDao) {
        this.missionDao = missionDao;
        this.userDao = userDao;
        this.imageDao = imageDao;
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void missionStartAndEndCheck() {
        List<Mission> missionList = missionDao.selectAllMission();
        for (Mission mission : missionList) {
            if(mission.getStartDate().isEqual(LocalDate.now())) { // 해당 미션이 시작한 경우
                List<Conn_Mission> connMissionList = missionDao.selectAllConnMissionByMission(mission);
                for (Conn_Mission connMission : connMissionList) {
                    missionDao.updateConnMissionStart(connMission);
                }
            }

            if(mission.getEndDate().isEqual(LocalDate.now().minusDays(1))){ // 해당 미션이 종료된 경우
                List<Conn_Mission> connMissionList = missionDao.selectAllConnMissionByMission(mission);
                for (Conn_Mission connMission : connMissionList) { // 미션 성공/실패 여부 확인
                    missionDao.updateConnMissionEnd(connMission);
                }
                for (Conn_Mission connMission : connMissionList) { // 미션 성공한 유저 포인트 지급
                    missionDao.providePoint(connMission);
                }
            }
        }
    }

}
