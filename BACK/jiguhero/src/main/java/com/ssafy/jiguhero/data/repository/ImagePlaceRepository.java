package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Image_Place;
import com.ssafy.jiguhero.data.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImagePlaceRepository extends JpaRepository<Image_Place, Long> {

    List<Image_Place> findAllByPlace(Place place);

}
