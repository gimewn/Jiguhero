package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.dto.MissionDto;
import com.ssafy.jiguhero.data.entity.*;
import com.ssafy.jiguhero.data.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class MissionDaoImpl implements MissionDao {

    private final MissionRepository missionRepository;
    private final LikeMissionRepository likeMissionRepository;
    private final ConnMissionRepository connMissionRepository;
    private final FeedRepository feedRepository;
    private final LikeFeedRepository likeFeedRepository;

    @Autowired
    public MissionDaoImpl(MissionRepository missionRepository, LikeMissionRepository likeMissionRepository, ConnMissionRepository connMissionRepository, FeedRepository feedRepository, LikeFeedRepository likeFeedRepository) {
        this.missionRepository = missionRepository;
        this.likeMissionRepository = likeMissionRepository;
        this.connMissionRepository = connMissionRepository;
        this.feedRepository = feedRepository;
        this.likeFeedRepository = likeFeedRepository;
    }

    @Override
    public List<Mission> selectTop3NowPerson() {
        List<Mission> selectedMissions = missionRepository.findTop3ByOrderByNowPersonDesc();

        return selectedMissions;
    }

    @Override
    public List<Like_Mission> selectLikeMissionByUser(User user) {
        List<Like_Mission> selectedLikeMissions = likeMissionRepository.findAllByUser(user);

        return selectedLikeMissions;
    }

    @Override
    public Mission selectMissionById(Long missionId) {
        Mission selectedMission = missionRepository.getById(missionId);

        return selectedMission;
    }

    @Override
    public List<Conn_Mission> selectJoinMissionByUser(User user) {
        List<Conn_Mission> selectedJoinMissions = connMissionRepository.findAllByUser(user);

        return selectedJoinMissions;
    }

    @Override
    public List<Mission> selectAllMission() {
        List<Mission> selectedAllMissions = missionRepository.findAll();

        return selectedAllMissions;
    }

    @Override
    public void insertMission(Mission mission){
        missionRepository.save(mission);
    }

    @Override
    public void insertConnMission(Conn_Mission connMission){
        connMissionRepository.save(connMission);
    }

    @Override
    public Optional<Like_Mission> selectLikeMission(Mission mission, User user){
        Optional<Like_Mission> likeMission = likeMissionRepository.findByMissionAndUser(mission, user);
        if(likeMission.isPresent()) return likeMission;
        else return null;
    }

    @Override
    public void insertLikeMission(Like_Mission likeMission){
        likeMissionRepository.save(likeMission);
    }

    @Override
    public void deleteLikeMission(Mission mission, User user){
        likeMissionRepository.deleteByMissionAndUser(mission, user);
    }

    @Override
    public Optional<Conn_Mission> selectConnMission(Mission mission, User user){
        Optional<Conn_Mission> connMission = connMissionRepository.findByMissionAndUser(mission, user);
        if(connMission.isPresent()) return connMission;
        else return null;
    }

    @Override
    public void deleteConnMission(Mission mission){
        connMissionRepository.deleteAllByMission(mission);
    }

    @Override
    public void deleteMissionById(Long missionId){
        missionRepository.deleteById(missionId);
    }

    @Override
    public void deleteLikeMission(Mission mission){
        likeMissionRepository.deleteAllByMission(mission);
    }

    @Override
    public Mission updateMission(MissionDto missionDto) throws Exception{
        Optional<Mission> selectedMission = missionRepository.findById(missionDto.getMissionId());
        Mission updatedMission;

        if(selectedMission.isPresent()) {
            Mission mission = selectedMission.get();
            mission.setTitle(missionDto.getTitle());
            mission.setStartDate(missionDto.getStartDate());
            mission.setEndDate(missionDto.getEndDate());
            mission.setEntryPoint(missionDto.getEntryPoint());
            mission.setSidoCode(missionDto.getSidoCode());
            mission.setGugunCode(missionDto.getGugunCode());
            mission.setDongCode(missionDto.getDongCode());

            updatedMission = missionRepository.save(mission);
        }
        else {
            throw new Exception();
        }

        return updatedMission;
    }


    @Override
    public Feed selectFeedById(Long feedId){
        Feed selectedFeed = feedRepository.findByFeedId(feedId);

        return selectedFeed;
    }

    @Override
    public Like_Feed selectLikeFeedByUser(Feed feed, User user){
        Like_Feed selectedFeed = likeFeedRepository.findByFeedAndUser(feed, user);

        return selectedFeed;
    }

    @Override
    public int countByFeed(Feed feed){
        int cnt = likeFeedRepository.countAllByFeed(feed);

        return cnt;
    }
}

