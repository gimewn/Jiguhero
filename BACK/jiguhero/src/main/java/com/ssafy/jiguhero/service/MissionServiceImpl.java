package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dao.MissionDao;
import com.ssafy.jiguhero.data.dto.MissionDto;
import com.ssafy.jiguhero.data.entity.Mission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MissionServiceImpl implements MissionService {

    private final MissionDao missionDao;

    @Autowired
    public MissionServiceImpl(MissionDao missionDao) {
        this.missionDao = missionDao;
    }

    @Override
    public List<MissionDto> getTop3NowPerson() {
        List<Mission> entityList = missionDao.selectTop3NowPerson();

        List<MissionDto> dtoList = entityList.stream().map(entity -> MissionDto.of(entity)).collect(Collectors.toList());

        return dtoList;
    }
}
