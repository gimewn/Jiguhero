package com.ssafy.jiguhero.data.dto;

import com.ssafy.jiguhero.data.entity.User;
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
    private String nickname;
    private String name;
    private int grade;
    private int point;
    List<GroundDto> ground;
//    List<ReportDto> report;
//    private Image_User imageUser;

}
