package com.example.library.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * SecurityConfig - Spring Security Configuration
 * 
 * This class configures Spring Security to:
 * 1. Disable CSRF protection (not needed for stateless REST API)
 * 2. Allow all HTTP requests without authentication
 * 3. Disable form login (since we're using REST API, not traditional login form)
 * 
 * Why we're doing this:
 * - For development and first-year review
 * - Frontend will handle authentication logic
 * - We want all API endpoints to be accessible without login
 * 
 * Annotations:
 * @Configuration - Marks this class as Spring configuration
 * @EnableWebSecurity - Enables Spring Security configuration
 * @Bean - Marks method return as a Spring bean (managed by Spring)
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Configure Spring Security
     * 
     * This method sets up the security filter chain:
     * - CSRF disabled (CSRF protection not needed for stateless REST APIs)
     * - All requests permitted (no authentication required)
     * - Form login disabled (we're using REST API)
     * - HTTP Basic disabled (not using basic authentication)
     * 
     * @param http - HttpSecurity object to configure
     * @return SecurityFilterChain - The configured security filter chain
     * @throws Exception - If configuration fails
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Disable CSRF protection
        // CSRF (Cross-Site Request Forgery) attacks don't affect stateless REST APIs
        // because tokens are not stored in sessions
        http.csrf(csrf -> csrf.disable());

        // Configure authorization
        // authorizeHttpRequests - Set up URL-based access control
        http.authorizeHttpRequests(auth -> 
            auth.anyRequest().permitAll()  // Allow all requests without authentication
        );

        // Disable form login
        // formLogin(form -> form.disable()) - Disables the default Spring login page
        // This prevents the redirect to /login when accessing protected URLs
        http.formLogin(form -> form.disable());

        // Disable HTTP Basic authentication
        // httpBasic(basic -> basic.disable()) - Disables basic auth header
        http.httpBasic(basic -> basic.disable());

        // Build and return the security filter chain
        return http.build();
    }

}
