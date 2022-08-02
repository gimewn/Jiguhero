package com.ssafy.jiguhero;

import com.ssafy.jiguhero.config.FileUploadProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties({FileUploadProperties.class})
@SpringBootApplication
public class JiguheroApplication {

	public static void main(String[] args) {
		SpringApplication.run(JiguheroApplication.class, args);
	}

}
