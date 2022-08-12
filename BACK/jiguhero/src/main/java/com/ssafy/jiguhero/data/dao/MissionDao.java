package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.dto.FeedDto;
import com.ssafy.jiguhero.data.dto.MissionDto;
import com.ssafy.jiguhero.data.entity.*;

import java.util.List;
import java.util.Optional;

public interface MissionDao {

    // 임무 Top3 참여자순
    List<Mission> selectTop3NowPerson();

    // user에 해당하는 like_mission 인스터스 목록
    List<Like_Mission> selectLikeMissionByUser(User user);

    // mission_id로 미션 정보 조회
    Mission selectMissionById(Long missionId);

    // user에 해당하는 join_mission 인스터스 목록
    List<Conn_Mission> selectJoinMissionByUser(User user);

    // 전체 all_mission 인스터스 목록
    List<Mission> selectAllMission();

    void insertMission(Mission mission);

    void insertConnMission(Conn_Mission connMission);

    Optional<Like_Mission> selectLikeMission(Mission mission, User user);

    void insertLikeMission(Like_Mission likeMission);

    void deleteLikeMission(Mission mission, User user);

    Conn_Mission selectConnMission(Mission mission, User user);

    void deleteConnMission(Mission mission);

    void deleteMissionById(Long missionId);

    void deleteLikeMission(Mission mission);

    Mission updateMission(MissionDto missionDto) throws Exception;

    //Feed selectFeedById(Long missionId);

    //Like_Feed selectLikeFeedByUser(Feed feed, User user);

    //int countByFeed(Feed feed);

    //void insertFeed(Feed feed);

    //Optional<Feed> selectFeed(Long feedId, User user);

    //Feed updateFeed(FeedDto feedDto) throws Exception;

    List<Mission> searchMission(String search, String array);

    //Optional<Feed> searchFeed(User user);


}