package com.deloitte.eshop.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deloitte.eshop.dto.ReviewDto;
import com.deloitte.eshop.dto.ReviewUpsertRequest;
import com.deloitte.eshop.entity.User;
import com.deloitte.eshop.service.ReviewService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(originPatterns = { "http://localhost:*", "http://127.0.0.1:*" })
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/product/{product_id}")
    public ResponseEntity<List<ReviewDto>> getReviewsForProduct(@PathVariable String product_id) {
        List<ReviewDto> reviews = reviewService.getReviewsForProduct(product_id);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/product/{product_id}/me")
    public ResponseEntity<?> getCurrentUserReviewForProduct(@PathVariable String product_id, @AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.ok(Map.of());
        }
        return reviewService.getCurrentUserReviewForProduct(product_id, user)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.ok(Map.of()));
    }

    @PutMapping("/product/{product_id}/me")
    public ResponseEntity<?> upsertReview(@PathVariable String product_id, @AuthenticationPrincipal User user,
            @RequestBody ReviewUpsertRequest request) {
        try {
            ReviewDto review = reviewService.upsertReview(product_id, user, request);
            return ResponseEntity.ok(review);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

}
