package com.ssafy.jiguhero;

import com.ssafy.jiguhero.oauthlogin.config.properties.AppProperties;
import com.ssafy.jiguhero.oauthlogin.config.properties.CorsProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
		CorsProperties.class,
		AppProperties.class
})
public class JiguheroApplication {
	public static void main(String[] args) {
		SpringApplication.run(JiguheroApplication.class, args);
	}
}
