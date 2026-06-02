package com.deloitte.eshop.service;

import java.util.List;
import com.deloitte.eshop.dto.ReviewDto;
import com.deloitte.eshop.dto.ReviewUpsertRequest;
import com.deloitte.eshop.entity.User;
import java.util.Optional;

public interface ReviewService {

    List<ReviewDto> getReviewsForProduct(String product_id);
    Optional<ReviewDto> getCurrentUserReviewForProduct(String productId, User user);
    ReviewDto upsertReview(String productId, User user, ReviewUpsertRequest request);
}
