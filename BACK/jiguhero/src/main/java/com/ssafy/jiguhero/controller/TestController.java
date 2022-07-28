package com.ssafy.jiguhero.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class TestController {

    @RequestMapping("/head")
    public String Head(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("/head 입장");
        System.out.println(request.getHeader("Authorization"));
        return "head";
    }
}
