package com.deloitte.eshop.entity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="products", uniqueConstraints = {
        @UniqueConstraint(
                name="product_name_type",
                columnNames = {"name","product_type"}
        )
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private int stock;

    //Don't load reviews unless necessary
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @ElementCollection
    @CollectionTable(name = "product_colors", joinColumns = @JoinColumn(name="product_id"))
    @Column(name =  "color")
    private Set<Colors> availableColors = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "product_sizes", joinColumns = @JoinColumn(name="product_id"))
    @Column(name = "sizes")
    private List<String> availableSizes;

    @Enumerated(EnumType.STRING)
    @Column(name = "product_type" ,nullable = false)
    private ProductType productType;

    @Enumerated(EnumType.STRING)
    @Column(name="dress_style",nullable = false)
    private DressStyle dressStyle;

    //----------- Methods ---------//

    public int getReviewCount()
    {
        return reviews == null ? 0 : reviews.size();
    }

    //Get rating
    public double getProductRating(){
        if(reviews == null || reviews.isEmpty())
            return 0.0;

        return reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);

    }


}
