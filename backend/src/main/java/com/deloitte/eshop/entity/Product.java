package com.deloitte.eshop.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;
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

    // ----------------- Product Variants ----------------//

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<ProductVariant> variants = new ArrayList<>();

    // Product Reviews Dont load reviews unless necessary

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews = new ArrayList<>();

    // ----------- Methods ---------//

    public int getReviewCount() {
        return reviews == null ? 0 : reviews.size();
    }

    public double getDiscountedPrice() {
        return price - price * (discount / 100);
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

}
