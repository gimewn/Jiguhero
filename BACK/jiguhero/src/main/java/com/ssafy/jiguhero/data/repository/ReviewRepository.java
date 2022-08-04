package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Place;
import com.ssafy.jiguhero.data.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByPlace(Place placeEntity);
}
