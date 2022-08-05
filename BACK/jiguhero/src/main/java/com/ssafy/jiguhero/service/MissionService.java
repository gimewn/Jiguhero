package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dto.MissionDto;

import java.time.LocalDateTime;
import java.util.List;

public interface MissionService {

    List<MissionDto> getTop3NowPerson();

    // user_id에 해당하는 유저가 좋아요한 임무 목록
    List<MissionDto> getLikeMissions(Long userId);

    // user_id에 해당하는 유저가 좋아요한 임무 목록
    List<MissionDto> getJoinMissions(Long userId);

    // 전체 임무 목록
    List<MissionDto> getAllMissions();

    // missionId에 해당하는 임무
    MissionDto getMissionById(Long missionId);

    void saveMission(Long userId, String title, LocalDateTime startDate, LocalDateTime endDate, int entryPoint, String sidoCode, String gugunCode, String dongCode, int nowPerson, int maxPerson, int failedPerson, int likes, int hits);

    void joinMission(Long userId, Long missionId);
}
