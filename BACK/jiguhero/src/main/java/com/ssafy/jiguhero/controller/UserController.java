package com.ssafy.jiguhero.controller;

import com.ssafy.jiguhero.data.dto.GroundDto;
import com.ssafy.jiguhero.data.dto.UserDto;
import com.ssafy.jiguhero.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/user")
@Api("유저 관련 REST V1")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ApiOperation(value = "user_id로 유저 정보를 조회해 반환한다.", response = UserDto.class)
    @GetMapping("/{user_id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("user_id") Long userId) {
        UserDto result = userService.getUserById(userId);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "user_id로 유저의 프로필 이미지 URL를 조회해 반환한다.", response = String.class)
    @GetMapping("/profile/{user_id}")
    public ResponseEntity<String> getProfileImageURL(@PathVariable("user_id") Long userId, HttpServletRequest request) {
        String url = userService.getProfileImageURL(userId, request);

        return ResponseEntity.status(HttpStatus.OK).body(url);
    }


}
