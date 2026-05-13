package com.deloitte.eshop.config;

import com.deloitte.eshop.entity.Brands;
import com.deloitte.eshop.entity.Colors;
import com.deloitte.eshop.entity.DressStyle;
import com.deloitte.eshop.entity.Gender;
import com.deloitte.eshop.entity.Product;
import com.deloitte.eshop.entity.ProductType;
import com.deloitte.eshop.entity.ProductVariant;
import com.deloitte.eshop.entity.Sizes;
import com.deloitte.eshop.service.ProductService;
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

@Component
@Order(1)
public class ProductsJsonDataLoader implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(ProductsJsonDataLoader.class);

    private final ProductService productService;
    private final ObjectMapper objectMapper;
    private final ResourceLoader resourceLoader;

    public ProductsJsonDataLoader(ProductService productService, ObjectMapper objectMapper,
            ResourceLoader resourceLoader) {
        this.productService = productService;
        this.objectMapper = objectMapper;
        this.resourceLoader = resourceLoader;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Resource resource = resourceLoader.getResource("classpath:products.json");
        if (!resource.exists()) {
            log.warn("classpath:products.json not found; skipping product import");
            return;
        }

        try (InputStream in = resource.getInputStream()) {
            List<ProductJsonDto> rows = objectMapper.readValue(in, new TypeReference<>() {
            });
            List<Product> products = new ArrayList<>();
            for (ProductJsonDto dto : rows) {
                products.add(toProduct(dto));
            }
            productService.addProducts(products);
            log.info("Imported {} products from products.json into H2", products.size());
        }
    }

    private Product toProduct(ProductJsonDto dto) {
        List<ProductVariant> variants = new ArrayList<>();
        if (dto.variants() != null) {
            for (VariantJsonDto v : dto.variants()) {
                variants.add(ProductVariant.builder()
                        .color(Colors.valueOf(v.color()))
                        .size(Sizes.valueOf(v.size()))
                        .stock(v.stock())
                        .build());
            }
        }

        return Product.builder()
                .name(dto.name())
                .description(dto.description())
                .price(dto.price())
                .discount(dto.discount())
                .stock(dto.stock())
                .gender(Gender.valueOf(dto.gender()))
                .productType(ProductType.valueOf(dto.productType()))
                .dressStyle(DressStyle.valueOf(dto.dressStyle()))
                .productBrand(Brands.valueOf(dto.productBrand()))
                .imageUrls(dto.imageUrls() == null ? new ArrayList<>() : new ArrayList<>(dto.imageUrls()))
                .variants(variants)
                .build();
    }

    public record VariantJsonDto(String color, String size, int stock) {
    }

    public record ProductJsonDto(
            String name,
            String description,
            double price,
            int discount,
            int stock,
            String gender,
            String productType,
            String dressStyle,
            String productBrand,
            List<String> imageUrls,
            List<VariantJsonDto> variants) {
    }
}
