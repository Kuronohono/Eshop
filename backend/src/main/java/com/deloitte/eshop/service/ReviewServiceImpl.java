package com.deloitte.eshop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deloitte.eshop.dto.ReviewDto;
import com.deloitte.eshop.entity.Product;
import com.deloitte.eshop.entity.Review;
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

}
