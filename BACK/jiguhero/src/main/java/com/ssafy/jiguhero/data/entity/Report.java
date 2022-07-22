package com.ssafy.jiguhero.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Report")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long report_id;

    @Column(nullable = false)
    private int category;

    @Column(nullable = true)
    private String content;

    @Column(nullable = true)
    private long place_id;

    @Column(nullable = true)
    private long user_id;
}
