package com.deloitte.eshop.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.deloitte.eshop.entity.User;
import com.deloitte.eshop.entity.UserRole;
import com.deloitte.eshop.repo.UserRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Only create if no admin exists yet
        userRepository.findByEmail("admin@eshop.com").ifPresent(userRepository::delete);
        boolean adminExists = userRepository.findByEmail("admin@eshop.com").isPresent();

        if (!adminExists) {
            User admin = User.builder()
                    .username("Admin")
                    .email("admin@eshop.com")
                    .password(passwordEncoder.encode("P@ssword!"))
                    .enabled(true)
                    .userRole(UserRole.ROLE_ADMIN)
                    .build();

            userRepository.save(admin);
            System.out.println(">>> Admin user seeded: admin@eshop.com / P@ssword!");
        }
    }
}