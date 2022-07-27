package com.ssafy.jiguhero.data.dto;

import com.ssafy.jiguhero.data.entity.User;
import lombok.*;

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
    private String image;
//    List<ReportDto> report;
//    private Image_User imageUser;

    @Builder
    public UserDto(String email, String name, String image) {
        this.email = email;
        this.name = name;
        this.image = image;
    }
}
