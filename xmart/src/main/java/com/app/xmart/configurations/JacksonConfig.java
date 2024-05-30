package com.app.xmart.configurations;

import java.time.format.DateTimeFormatter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

@Configuration
public class JacksonConfig {
    
    @Bean
    public Jackson2ObjectMapperBuilder jacksonBuilder() {
        Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd:MM:yyyy HH:mm:ss");

        builder.serializers(new LocalDateTimeSerializer(dateTimeFormatter));
        builder.deserializers(new LocalDateTimeDeserializer(dateTimeFormatter));

        return builder;
    }
}
