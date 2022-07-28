package com.ssafy.jiguhero.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "User")
public class User {
    @Id
    @Column(name = "user_id")
    private long userId;

    ///////////////////////////////////////////////////////////////////////////////////////
    @Email
    ///////////////////////////////////////////////////////////////////////////////////////
    //@Column(nullable = false)
    private String email;

    //@Column(nullable = false)
    private String nickname;

    //@Column(nullable = false)
    private String name;

    ///////////////////////////////////////////////////////////////////////////////////////
    @JsonIgnore
    private String password;

    private String imageUrl;

    //@Column(nullable = false)
    private Boolean emailVerified = false;

    //@NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private String providerId;

    @Builder(builderClassName= "social", builderMethodName = "socialBuilder")
    private User(String name, @Email String email, String imageUrl, @NotNull AuthProvider provider, String providerId) {
        this.name = name;
        this.email = email;
        this.imageUrl = imageUrl;
        this.provider = provider;
        this.providerId = providerId;
    }
    ///////////////////////////////////////////////////////////////////////////////////////

    //@Column(nullable = false)
    private int grade;

    //@Column(nullable = false)
    private int point;

    @OneToMany(mappedBy = "user")
    List<Ground> ground = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    List<Report> report = new ArrayList<>();

    @OneToOne(mappedBy = "user")
    private Image_User imageUser;
}
