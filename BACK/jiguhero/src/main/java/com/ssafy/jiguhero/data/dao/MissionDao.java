package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Mission;

import java.util.List;

public interface MissionDao {

    // 임무 Top3 참여자순
    List<Mission> selectTop3NowPerson();

}
