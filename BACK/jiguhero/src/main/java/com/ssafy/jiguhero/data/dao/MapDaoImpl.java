package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Dong;
import com.ssafy.jiguhero.data.entity.Gugun;
import com.ssafy.jiguhero.data.entity.Sido;
import com.ssafy.jiguhero.data.repository.DongRepository;
import com.ssafy.jiguhero.data.repository.GugunRepository;
import com.ssafy.jiguhero.data.repository.SidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MapDaoImpl implements MapDao {

    private final SidoRepository sidoRepository;
    private final GugunRepository gugunRepository;
    private final DongRepository dongRepository;

    @Autowired
    public MapDaoImpl(SidoRepository sidoRepository, GugunRepository gugunRepository, DongRepository dongRepository) {
        this.sidoRepository = sidoRepository;
        this.gugunRepository = gugunRepository;
        this.dongRepository = dongRepository;
    }

    @Override
    public List<Sido> selectSidoList() {
        List<Sido> selectedList = sidoRepository.findAll();

        return selectedList;
    }

    @Override
    public List<Gugun> selectGugunList(Sido sido) {
        List<Gugun> selectedList = gugunRepository.findAllBySido(sido);

        return selectedList;
    }

    @Override
    public Sido selectSidoById(String sidoCode) {
        Sido selectedSido = sidoRepository.getById(sidoCode);
        return selectedSido;
    }

    @Override
    public List<Dong> selectDongList(Gugun gugun) {
        List<Dong> selectedList = dongRepository.findAllByGugun(gugun);
        return selectedList;
    }

    @Override
    public Gugun selectGugunById(String gugunCode) {
        Gugun selectedGugun = gugunRepository.getById(gugunCode);
        return selectedGugun;
    }
}
