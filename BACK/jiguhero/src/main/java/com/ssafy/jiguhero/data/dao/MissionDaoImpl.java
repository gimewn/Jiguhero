package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Like_Mission;
import com.ssafy.jiguhero.data.entity.Mission;
import com.ssafy.jiguhero.data.entity.User;
import com.ssafy.jiguhero.data.repository.LikeMissionRepository;
import com.ssafy.jiguhero.data.repository.MissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MissionDaoImpl implements MissionDao {

    private final MissionRepository missionRepository;
    private final LikeMissionRepository likeMissionRepository;

    @Autowired
    public MissionDaoImpl(MissionRepository missionRepository, LikeMissionRepository likeMissionRepository) {
        this.missionRepository = missionRepository;
        this.likeMissionRepository = likeMissionRepository;
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

}
