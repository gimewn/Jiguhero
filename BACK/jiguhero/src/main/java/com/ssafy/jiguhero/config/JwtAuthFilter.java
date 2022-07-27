package com.ssafy.jiguhero.config;

import com.ssafy.jiguhero.data.dto.UserDto;
import com.ssafy.jiguhero.service.OAuth.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;


@RequiredArgsConstructor
public class JwtAuthFilter extends GenericFilterBean {
    private final TokenService tokenService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = ((HttpServletRequest)request).getHeader("Auth");

        // debugging
        token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraWFuNjM2NUBuYXZlci5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY1ODkwODMyOSwiZXhwIjoxNjU4OTExOTI5fQ.p-lo4OiCUpOJlxUZTR_F9I8YaZnMrnO-p9qtIsG32CA";
        System.out.println("프론트에서 헤더에 넣어서 보낼 Access token : " + token);
        System.out.println("토큰 검증 결과 : " + tokenService.verifyToken(token));
        // debugging

        if (token != null && tokenService.verifyToken(token)) {
            String email = tokenService.getUid(token);

            // debugging
            System.out.println("토큰에서 빼낸 email : " + email);60-----------------------------------------------------------------------------------
            // debugging

            UserDto userDto = UserDto.builder()
                    .email(email)
                    .name("이름이에용")
                    .image("프로필 이미지에요").build();

            Authentication auth = getAuthentication(userDto);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        chain.doFilter(request, response);
    }

    public Authentication getAuthentication(UserDto member) {
        return new UsernamePasswordAuthenticationToken(member, "",
                Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));
    }
}