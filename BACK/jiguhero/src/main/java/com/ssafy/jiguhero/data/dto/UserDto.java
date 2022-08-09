package com.ssafy.jiguhero.data.dto;

import com.ssafy.jiguhero.data.entity.User;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private long userId;
    private String email;
    private Boolean emailVerified;
    private int grade;
    private String name;
    private String nickname;
    private String password;
    private int point;
    private String provider;
    private String role;
    private String imageURL;

    public static UserDto of(User userEntity) {
        UserDto userDto = ModelMapperUtils.getModelMapper().map(userEntity, UserDto.class);

        return userDto;
    }

}
