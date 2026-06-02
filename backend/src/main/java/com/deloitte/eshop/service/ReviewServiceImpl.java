package com.deloitte.eshop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deloitte.eshop.dto.ReviewDto;
import com.deloitte.eshop.dto.ReviewUpsertRequest;
import com.deloitte.eshop.entity.Product;
import com.deloitte.eshop.entity.Review;
import com.deloitte.eshop.entity.User;
import com.deloitte.eshop.repo.ProductRepository;
import com.deloitte.eshop.repo.ReviewRepository;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<ReviewDto> getReviewsForProduct(String product_id) {
        Product product = productRepository.findById(product_id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + product_id));
        return reviewRepository.findByProduct(product).stream()
                .map(r -> new ReviewDto(r.getId(), r.getDescription(), r.getRating(), r.getUser().getUsername(),
                        r.getCraetedAt()))
                .toList();
    }

    @Override
    public Optional<ReviewDto> getCurrentUserReviewForProduct(String productId, User user) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));
        return reviewRepository.findByProductAndUser(product, user)
                .map(r -> new ReviewDto(r.getId(), r.getDescription(), r.getRating(), r.getUser().getUsername(),
                        r.getCraetedAt()));
    }

    @Override
    public ReviewDto upsertReview(String productId, User user, ReviewUpsertRequest request) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        String description = request.description() == null ? "" : request.description().trim();
        if (description.isBlank()) {
            throw new RuntimeException("Review description is required.");
        }

        if (request.rating() < 1 || request.rating() > 5) {
            throw new RuntimeException("Rating must be between 1 and 5.");
        }

        Review review = reviewRepository.findByProductAndUser(product, user)
                .orElseGet(Review::new);

        review.setUser(user);
        review.setProduct(product);
        review.setDescription(description);
        review.setRating(request.rating());

        Review saved = reviewRepository.save(review);
        return new ReviewDto(saved.getId(), saved.getDescription(), saved.getRating(), saved.getUser().getUsername(),
                saved.getCraetedAt());
    }

}
