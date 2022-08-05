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
@Table(name = "Category")
public class Category {
    @Id
    private String code;

    @Column(nullable = false)
    private String name;

//    @OneToMany(mappedBy = "category")
//    List<Place> place = new ArrayList<>();
}
