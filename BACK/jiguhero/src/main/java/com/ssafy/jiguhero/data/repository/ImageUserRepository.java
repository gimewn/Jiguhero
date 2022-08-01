package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Image_User;
import com.ssafy.jiguhero.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageUserRepository extends JpaRepository<Image_User, Long> {

    Image_User findByUser(User user);

}
