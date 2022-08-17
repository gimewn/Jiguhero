package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dto.FeedDto;
import com.ssafy.jiguhero.data.dto.MissionDto;
import com.ssafy.jiguhero.data.entity.User;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;

public interface MissionService {

    List<MissionDto> getTop3NowPerson();

    // user_id에 해당하는 유저가 좋아요한 임무 목록
    List<MissionDto> getLikeMissions(Long userId);

    // user_id에 해당하는 유저가 좋아요한 임무 목록
    List<MissionDto> getJoinMissions(Long userId, HttpServletRequest request);

    // 전체 임무 목록
    List<MissionDto> getAllMissions(HttpServletRequest request, String array);

    // missionId에 해당하는 임무
    MissionDto getMissionById(Long missionId, Long userId, HttpServletRequest request);

    // 임무 등록
    Long insertMission(MissionDto missionDto, Long userId);

    // 임무 참여
    int joinMission(Long userId, Long missionId);

    // 임무 좋아요 클릭
    int likeMission(Long missionId, Long userId);

    // 임무 삭제
    int deleteMission(Long missionId, Long userId);

    // 임무 수정
    MissionDto updateMission(MissionDto missionDto, Long userId) throws Exception;

    String getRepMissionImageURL(Long missionId, HttpServletRequest request);

    List<List<String>> getMissionImageURL(Long missionId, HttpServletRequest request);

    // 검색어를 만족하는 임무 목록
    List<MissionDto> searchMission(String search, String array, HttpServletRequest request);

    int searchSuccessRate(Long missionId, Long userId);
}
