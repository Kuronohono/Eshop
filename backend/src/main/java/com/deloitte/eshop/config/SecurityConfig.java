package com.deloitte.eshop.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        private final AuthenticationProvider authenticationProvider;
        private final JwtAuthenticationFilter jwtAuthenticationFilter;

        public SecurityConfig(
                        JwtAuthenticationFilter jwtAuthenticationFilter,
                        AuthenticationProvider authenticationProvider) {
                this.authenticationProvider = authenticationProvider;
                this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

                http
                                .csrf(csrf -> csrf.disable())
                                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                                .authorizeHttpRequests(auth -> auth

                                                // PUBLIC
                                                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                                                .requestMatchers("/auth/**").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/products/**").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/product-variants/**").permitAll()
                                                .requestMatchers(HttpMethod.POST, "/products/filter", "/products/bulk")
                                                .permitAll()
                                                .requestMatchers("/h2-console/**").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/reviews/**").permitAll()

                                                // FRONTEND (USER ONLY AREA)
                                                .requestMatchers("/api/**").hasAuthority("ROLE_USER")
                                                .requestMatchers("/cart/**").hasAuthority("ROLE_USER")
                                                .requestMatchers("/orders/**").hasAuthority("ROLE_USER")
                                                .requestMatchers("/reviews/**").hasAuthority("ROLE_USER")

                                                // BACKOFFICE (ADMIN ONLY AREA)
                                                .requestMatchers("/admin/**").hasAuthority("ROLE_ADMIN")
                                                .requestMatchers(HttpMethod.POST, "/products", "/products/**")
                                                .hasAuthority("ROLE_ADMIN")
                                                .requestMatchers(HttpMethod.PUT, "/products/**")
                                                .hasAuthority("ROLE_ADMIN")
                                                .requestMatchers(HttpMethod.DELETE, "/products/**")
                                                .hasAuthority("ROLE_ADMIN")
                                                .requestMatchers(HttpMethod.POST, "/product-variants/**")
                                                .hasAuthority("ROLE_ADMIN")
                                                .requestMatchers(HttpMethod.PUT, "/product-variants/**")
                                                .hasAuthority("ROLE_ADMIN")
                                                .requestMatchers(HttpMethod.DELETE, "/product-variants/**")
                                                .hasAuthority("ROLE_ADMIN")

                                                // FALLBACK
                                                .anyRequest().authenticated())
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authenticationProvider(authenticationProvider)
                                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                                .headers(headers -> headers
                                                .frameOptions(frame -> frame.disable()));
                return http.build();

        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOriginPatterns(
                                List.of("http://localhost:5173", "http://localhost:8085", "http://localhost:5174"));
                configuration.setAllowedMethods(List.of("GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"));
                configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);

                return source;
        }
}