package com.deloitte.eshop.config;

import com.deloitte.eshop.entity.Product;
import com.deloitte.eshop.entity.Review;
import com.deloitte.eshop.entity.User;
import com.deloitte.eshop.repo.ProductRepository;
import com.deloitte.eshop.repo.ReviewRepository;
import com.deloitte.eshop.repo.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Component
@Order(2)
public class ReviewsJsonDataLoader implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(ReviewsJsonDataLoader.class);

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;
    private final ResourceLoader resourceLoader;

    public ReviewsJsonDataLoader(
            ReviewRepository reviewRepository,
            ProductRepository productRepository,
            UserRepository userRepository,
            ObjectMapper objectMapper,
            ResourceLoader resourceLoader) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
        this.resourceLoader = resourceLoader;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Resource resource = resourceLoader.getResource("classpath:reviews.json");
        if (!resource.exists()) {
            log.warn("classpath:reviews.json not found; skipping review import");
            return;
        }

        List<Product> products = productRepository.findAll();
        if (products.isEmpty()) {
            log.warn("No products found; skipping review import");
            return;
        }

        List<User> users = ensureSeedUsers();
        if (users.isEmpty()) {
            log.warn("No users available; skipping review import");
            return;
        }

        List<ReviewSeedDto> rows;
        try (InputStream in = resource.getInputStream()) {
            rows = objectMapper.readValue(in, new TypeReference<>() {
            });
        }

        Random random = new Random(42);
        List<Review> reviews = new ArrayList<>();
        for (ReviewSeedDto dto : rows) {
            Product product = products.get(random.nextInt(products.size()));
            User user = users.get(random.nextInt(users.size()));

            Review review = new Review();
            review.setDescription(dto.description());
            review.setRating(dto.rating());
            review.setProduct(product);
            review.setUser(user);
            reviews.add(review);
        }

        reviewRepository.saveAll(reviews);
        log.info("Imported {} reviews from reviews.json into H2", reviews.size());
    }

    private List<User> ensureSeedUsers() {
        String[][] seeds = new String[][] {
                { "alex", "alex@example.com" },
                { "maria", "maria@example.com" },
                { "john", "john@example.com" },
                { "sophia", "sophia@example.com" },
                { "david", "david@example.com" },
                { "emma", "emma@example.com" },
                { "daniel", "daniel@example.com" },
                { "lina", "lina@example.com" },
                { "isabella", "isabella@example.com" },
                { "michael", "michael@example.com" },
                { "charlotte", "charlotte@example.com" },
                { "james", "james@example.com" },
                { "amelia", "amelia@example.com" },
                { "ethan", "ethan@example.com" },
                { "mia", "mia@example.com" },
                { "lucas", "lucas@example.com" },
                { "grace", "grace@example.com" }
        };

        List<User> users = new ArrayList<>();
        for (String[] seed : seeds) {
            String username = seed[0];
            String email = seed[1];

            Optional<User> existing = userRepository.findByEmail(email);
            if (existing.isPresent()) {
                users.add(existing.get());
                continue;
            }

            User u = User.builder()
                    .username(username)
                    .email(email)
                    // Seed users are only for demo data; use a simple placeholder password.
                    .password("password")
                    .enabled(true)
                    .build();
            users.add(userRepository.save(u));
        }
        return users;
    }

    public record ReviewSeedDto(String description, int rating) {
    }
}
