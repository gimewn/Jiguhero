package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Hero;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeroRepository extends JpaRepository<Hero, Long> {

    Hero findByUserId(String userId);
}
