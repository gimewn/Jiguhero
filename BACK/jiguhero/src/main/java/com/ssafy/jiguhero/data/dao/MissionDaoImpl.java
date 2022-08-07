package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Conn_Mission;
import com.ssafy.jiguhero.data.entity.Like_Mission;
import com.ssafy.jiguhero.data.entity.Mission;
import com.ssafy.jiguhero.data.entity.User;
import com.ssafy.jiguhero.data.repository.ConnMissionRepository;
import com.ssafy.jiguhero.data.repository.LikeMissionRepository;
import com.ssafy.jiguhero.data.repository.MissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class MissionDaoImpl implements MissionDao {

    private final MissionRepository missionRepository;
    private final LikeMissionRepository likeMissionRepository;
    private final ConnMissionRepository connMissionRepository;

    @Autowired
    public MissionDaoImpl(MissionRepository missionRepository, LikeMissionRepository likeMissionRepository, ConnMissionRepository connMissionRepository) {
        this.missionRepository = missionRepository;
        this.likeMissionRepository = likeMissionRepository;
        this.connMissionRepository = connMissionRepository;
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
}

