package com.deloitte.eshop.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "products", uniqueConstraints = {
        @UniqueConstraint(name = "product_name_type", columnNames = { "name", "product_type" })
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    // ---------------- Main Info ------------------//

    // Product ID unique and automatically generated
    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false)
    private String id;

    // Product Name
    @Column(nullable = false)
    private String name;

    // Product Description
    @Column(length = 500)
    private String description;

    // Product Price (Original)
    @Column(nullable = false)
    private double price;

    @Column(name = "arrival_date", updatable = false)
    private LocalDate arrivalDate;

    // Product Stock
    @Column(nullable = false)
    private int stock;

    // Image Url Collection
    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    private List<String> imageUrls;

    @Column(name = "discount_percentage")
    private int discount;

    @Builder.Default
    @Column(name = "sold_count", nullable = false)
    private int soldCount = 0;

    // --------------------- Categories -------------------//

    // Gender Category Men Women Unisex
    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    // Product Type (Shirt, Pants etc)
    @Enumerated(EnumType.STRING)
    @Column(name = "product_type", nullable = false)
    private ProductType productType;

    // Dress Style (Casual, Formal etc)
    @Enumerated(EnumType.STRING)
    @Column(name = "dress_style", nullable = false)
    private DressStyle dressStyle;

    // Product Brand
    @Enumerated(EnumType.STRING)
    @Column(name = "product_brand")
    private Brands productBrand;

    // Product Status
    @Builder.Default
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_statuses", joinColumns = @JoinColumn(name = "product_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "product_status")
    private Set<ProductStatus> statuses = new HashSet<>();

    // ----------------- Product Variants ----------------//
    @Builder.Default
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnore
    private List<ProductVariant> variants = new ArrayList<>();

    // Product Reviews Dont load reviews unless necessary
    @Builder.Default
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Review> reviews = new ArrayList<>();

    // ----------- Methods CRUD ---------//

    @PrePersist
    protected void onCreate() {
        this.arrivalDate = LocalDate.now();
        updateStatus();
    }

    @PreUpdate
    protected void onUpdate() {
        updateStatus();
    }

    private void updateStatus() {
        statuses.clear();
        // Check if the product is a new arrival. New Arrival = has arrived less than a
        // month ago
        boolean isNewArrival = arrivalDate != null && arrivalDate.isAfter(LocalDate.now().minusMonths(1));

        if (isNewArrival)
            statuses.add(ProductStatus.NEW_ARRIVALS);
        // Check if it has sold more than 100 pieces. If true it is top selling
        if (soldCount >= 100)
            statuses.add(ProductStatus.TOP_SELLING);
        // Check if the product is on sale
        if (discount > 0)
            statuses.add(ProductStatus.ON_SALE);
        // If the product has none of the above give it the status none
        if (statuses.isEmpty())
            statuses.add(ProductStatus.NONE);
    }

    // ------ Other Methods -----------//

    public void incrementSoldCount(int quantity) {
        this.soldCount += quantity;
    }

    public int getReviewCount() {
        return reviews == null ? 0 : reviews.size();
    }

    // Get rating
    public double getProductRating() {
        if (reviews == null || reviews.isEmpty())
            return 0.0;

        return reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);

    }

    public LocalDate getArrivalDate() {
        return arrivalDate;
    }

}
