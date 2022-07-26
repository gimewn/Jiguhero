package com.ssafy.jiguhero.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
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

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int grade;

    @Column(nullable = false)
    private int point;

    @OneToMany(mappedBy = "user")
    List<Ground> ground = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    List<Report> report = new ArrayList<>();

    @OneToOne(mappedBy = "user")
    private Image_User imageUser;
}
