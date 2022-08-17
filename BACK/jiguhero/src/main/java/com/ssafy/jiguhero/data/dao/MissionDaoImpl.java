package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.dto.FeedDto;
import com.ssafy.jiguhero.data.dto.MissionDto;
import com.ssafy.jiguhero.data.entity.*;
import com.ssafy.jiguhero.data.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Component
public class MissionDaoImpl implements MissionDao {

    private final MissionRepository missionRepository;
    private final LikeMissionRepository likeMissionRepository;
    private final ConnMissionRepository connMissionRepository;
    private final FeedRepository feedRepository;
    private final LikeFeedRepository likeFeedRepository;
    private final UserRepository userRepository;

    @Autowired
    public MissionDaoImpl(MissionRepository missionRepository, LikeMissionRepository likeMissionRepository, ConnMissionRepository connMissionRepository, FeedRepository feedRepository, LikeFeedRepository likeFeedRepository, UserRepository userRepository) {
        this.missionRepository = missionRepository;
        this.likeMissionRepository = likeMissionRepository;
        this.connMissionRepository = connMissionRepository;
        this.feedRepository = feedRepository;
        this.likeFeedRepository = likeFeedRepository;
        this.userRepository = userRepository;
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
    public List<Mission> selectAllMission(){
        List<Mission> selectedAllMissions = missionRepository.findAll();

        return selectedAllMissions;
    }

    @Override
    public List<Mission> selectAllMission(String array) {
        List<Mission> selectedAllMissions = null;

        if(array=="hits") {
            selectedAllMissions = missionRepository.findAllByOrderByHitsDesc();
        }
        else {
            selectedAllMissions = missionRepository.findAllByOrderByRegtimeDesc();
        }

        return selectedAllMissions;
    }

    @Override
    public Mission insertMission(Mission mission){
        Mission savedMission = missionRepository.save(mission);

        return savedMission;
    }

    @Override
    public void insertConnMission(Conn_Mission connMission){
        connMissionRepository.save(connMission);
    }

    @Override
    public Optional<Like_Mission> selectLikeMission(Mission mission, User user){
        Optional<Like_Mission> likeMission = likeMissionRepository.findByMissionAndUser(mission, user);

        if(likeMission.isPresent()) {
            return likeMission;
        }
        else {
            return null;
        }
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
    public Conn_Mission selectConnMission(Mission mission, User user){
        Conn_Mission connMission = connMissionRepository.findByMissionAndUser(mission, user);

        if(connMission!=null) {
            return connMission;
        }
        else {
            return null;
        }
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
//      DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        if(selectedMission.isPresent()) {
            Mission mission = selectedMission.get();
            mission.setTitle(missionDto.getTitle());
            mission.setContent(missionDto.getContent());
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
    public List<Mission> searchMission(String search,String array){
        List<Mission> selectedAllMissions = null;
        if(array=="title") {
            selectedAllMissions = missionRepository.findAllByTitleContainingOrderByTitleAsc(search);
        }
        else if(array == "hits") {
            selectedAllMissions = missionRepository.findAllByTitleContainingOrderByHitsDesc(search);
        }
        else {
            selectedAllMissions = missionRepository.findAllByTitleContainingOrderByRegtimeDesc(search);
        }

        return selectedAllMissions;
    }

    @Override
    public List<Conn_Mission> selectAllConnMissionByMission(Mission mission){
        List<Conn_Mission> connMissions = connMissionRepository.findAllByMission(mission);

        return connMissions;
    }

    @Override
    public void updateConnMissionStart(Conn_Mission connMission){
        connMission.setState("RUN");
        Conn_Mission result = connMissionRepository.save(connMission);

    }

    @Override
    public void updateConnMissionEnd(Conn_Mission connMission){
        Mission missionEntity = connMission.getMission();

        if(connMission.getSuccessRate()>=80) {
            connMission.setState("SUCCESS");
        }
        else {
            connMission.setState("FAILED");
            missionEntity.setFailedPerson(missionEntity.getFailedPerson()+1);
        }

        connMissionRepository.save(connMission);
    }

    @Override
    public void providePoint(Conn_Mission connMission){
        User userEntity = connMission.getUser();
        Mission missionEntity =connMission.getMission();

        int allSuccessUser = missionEntity.getNowPerson() - missionEntity.getFailedPerson();
        int totalPoint = missionEntity.getEntryPoint() * missionEntity.getEntryPoint();
        int providePoint = totalPoint / allSuccessUser;

        if(connMission.getState() == "SUCCESS"){
            userEntity.setPoint(userEntity.getPoint() + providePoint);
            userRepository.save(userEntity);

            connMission.setState("END");
            connMissionRepository.save(connMission);
        }
    }
}

