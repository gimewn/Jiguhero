package com.ssafy.jiguhero.controller;

import com.ssafy.jiguhero.data.dto.GroundDto;
import com.ssafy.jiguhero.data.dto.UserDto;
import com.ssafy.jiguhero.service.ImageService;
import com.ssafy.jiguhero.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/user")
@Api("유저 관련 REST V1")
public class UserController {

    private final UserService userService;

    private final ImageService imageService;

    @Autowired
    public UserController(UserService userService, ImageService imageService) {
        this.userService = userService;
        this.imageService = imageService;
    }

    @ApiOperation(value = "user_id로 유저 정보를 조회해 반환한다.", response = UserDto.class)
    @GetMapping("/{user_id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("user_id") Long userId, HttpServletRequest request) {
        UserDto result = userService.getUserById(userId);
        String url = userService.getProfileImageURL(userId, request);
        result.setImageURL(url);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "user_id로 유저의 프로필 이미지 URL를 조회해 반환한다.", response = String.class)
    @GetMapping("/profile/{user_id}")
    public ResponseEntity<String> getProfileImageURL(@PathVariable("user_id") Long userId, HttpServletRequest request) {
        String url = userService.getProfileImageURL(userId, request);

        return ResponseEntity.status(HttpStatus.OK).body(url);
    }

    @ApiOperation(value = "닉네임의 중복여부를 확인하여 있으면 1을 없으면 0을 반환한다.", response = Integer.class)
    @GetMapping("/nickname/{nickname}")
    public ResponseEntity<Integer> checkNicknameDupl(@PathVariable("nickname") String nickname) {
        Integer check = userService.checkNicknameDupl(nickname);

        return ResponseEntity.status(HttpStatus.OK).body(check);
    }

    @ApiOperation(value = "user_id에 해당하는 유저의 닉네임을 등록 또는 수정한다.(회원가입, 정보변경 둘 다 사용)", response = UserDto.class)
    @PutMapping("/{user_id}")
    public ResponseEntity<UserDto> changeUserNickname(@PathVariable("user_id") Long userId, @RequestParam("nickname") String nickname) {
        UserDto userDto = null;
        try {
            userDto = userService.changeUserNickname(userId, nickname);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.status(HttpStatus.OK).body(userDto);
    }

    @ApiOperation(value = "user_id에 해당하는 유저를 삭제한다.(유저 정보 null로 바꾸기)", response = UserDto.class)
    @DeleteMapping("/{user_id}")
    public ResponseEntity<UserDto> deleteUser(@PathVariable("user_id") Long userId) {
        UserDto userDto = userService.getUserById(userId);
        // 토큰 지우기
        try {
            userService.deleteToken(userDto.getEmail());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        UserDto deletedUser = null;
        // 회원정보 null로 바꾸기
        try {
            deletedUser = userService.deleteUser(userId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.status(HttpStatus.OK).body(deletedUser);
    }

}
