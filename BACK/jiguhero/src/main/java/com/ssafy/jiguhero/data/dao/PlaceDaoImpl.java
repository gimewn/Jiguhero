package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Place;
import com.ssafy.jiguhero.data.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PlaceDaoImpl implements PlaceDao {

    private final PlaceRepository placeRepository;

    @Autowired
    public PlaceDaoImpl(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    @Override
    public List<Place> selectAll() {
        List<Place> selectedPlaces = placeRepository.findAll();
        return selectedPlaces;
    }
}
