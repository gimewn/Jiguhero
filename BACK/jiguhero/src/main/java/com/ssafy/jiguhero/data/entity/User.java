package com.ssafy.jiguhero.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.jiguhero.data.dto.UserDto;
import com.ssafy.jiguhero.oauthlogin.domain.entity.user.Provider;
import com.ssafy.jiguhero.oauthlogin.domain.entity.user.Role;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;

@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "User")
public class User {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    @JsonIgnore
    private String password;

    @Email
    @Column(nullable = true)
    private String email;

    @Column(nullable = true)
    private Boolean emailVerified = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    private Provider provider;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    private Role role;

    @Column(nullable = true)
    private String nickname;

    @Column(nullable = true)
    private String name;

    @Column(nullable = true)
    private int grade;

    @Column(nullable = true)
    private int point;

    @OneToMany(mappedBy = "user")
    List<Ground> ground = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    List<Report> report = new ArrayList<>();

    @OneToOne(mappedBy = "user")
    private Image_User imageUser;

    ///////////////////////////////////////////////////////////////////
    @OneToMany(mappedBy = "user")
    List<Feed> feed = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    List<Like_Feed> like_feed = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    List<Mission> mission = new ArrayList<>();
    ///////////////////////////////////////////////////////////////////

    public static User of(UserDto userDto) {
        User userEntity = ModelMapperUtils.getModelMapper().map(userDto, User.class);

        return userEntity;
    }

    @Builder
    public User(String name, String email, String password, Role role, Provider provider, String providerId, String imageUrl){
        this.email = email;
        this.name = name;
        this.provider = provider;
        this.role = role;
    }

    public void updateName(String name){
        this.name = name;
    }

}
