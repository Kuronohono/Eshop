package com.deloitte.eshop.service;

import java.util.List;
import com.deloitte.eshop.dto.ReviewDto;

public interface ReviewService {

    List<ReviewDto> getReviewsForProduct(String product_id);
}
