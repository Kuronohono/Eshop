package com.deloitte.eshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deloitte.eshop.dto.ReviewDto;
import com.deloitte.eshop.service.ReviewService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

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

}
