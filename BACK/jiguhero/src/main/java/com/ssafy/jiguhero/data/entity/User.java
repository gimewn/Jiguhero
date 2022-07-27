package com.ssafy.jiguhero.data.entity;

import com.ssafy.jiguhero.data.entity.type.AuthProvider;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@ToString(exclude = "socialAuth")
@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "User", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
@SecondaryTables({
        @SecondaryTable(name = "social_auth", pkJoinColumns = @PrimaryKeyJoinColumn(name = "user_id"))
})
public class User {
    @Id
    @Column(name = "user_id")
    private long userId;

    @Column(name = "email")
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
    private Image_User image_user;

    private String password;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private String providerId;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "providerId", column = @Column(table = "social_auth", name = "provider_id")),
            @AttributeOverride(name = "provider", column = @Column(table = "social_auth", name = "provider")),
            @AttributeOverride(name = "email", column = @Column(table = "social_auth", name = "email", length = 100, nullable = false)),
            @AttributeOverride(name = "name", column = @Column(table = "social_auth", name = "name", length = 100, nullable = false)),
            @AttributeOverride(name = "imageUrl", column = @Column(table = "social_auth", name = "image_url", columnDefinition = "TEXT")),
            @AttributeOverride(name = "attributes", column = @Column(table = "social_auth", name = "attributes", columnDefinition = "TEXT")),
            @AttributeOverride(name = "ip", column = @Column(table = "social_auth", name = "ip", length = 30, nullable = false)),
    })
    private SocialAuth socialAuth;
}
