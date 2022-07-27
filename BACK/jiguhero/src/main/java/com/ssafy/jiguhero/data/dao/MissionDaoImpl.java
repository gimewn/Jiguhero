package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Mission;
import com.ssafy.jiguhero.data.repository.MissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MissionDaoImpl implements MissionDao {

    private final MissionRepository missionRepository;

    @Autowired
    public MissionDaoImpl(MissionRepository missionRepository) {
        this.missionRepository = missionRepository;
    }

    @Override
    public List<Mission> selectTop3NowPerson() {
        List<Mission> selectedMissions = missionRepository.findTop3ByOrderByNowPersonDesc();
        
        return selectedMissions;
    }
}
