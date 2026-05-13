package com.deloitte.eshop.service;

import com.deloitte.eshop.entity.Colors;
import com.deloitte.eshop.entity.ProductVariant;
import com.deloitte.eshop.entity.Sizes;

import java.util.List;

public interface ProductVariantService {

    // ----------------- CRUD --------------------//

    // Get Product Variants
    List<ProductVariant> getProductVariants();

    // Add Product Variant
    ProductVariant addProductVariant(ProductVariant variant);

    // Update Product Variant
    ProductVariant updateProductVariant(ProductVariant variant);

    // Delete Product Variant
    String deleteProductVariant(ProductVariant variant);

    // -------------- Filter Operations --------------------//

    // Get Product Variants Based on Product ID
    List<ProductVariant> getProductVariantsByProductId(String product_id);

    // Get Product Variants Colors
    List<Colors> getProductVariantColors(String product_id);

    // Get Product Variant Stock
    List<Integer> getProductVariantsStock(String product_id);

    // Get Product Variant Sizes
    List<Sizes> getProductVariantsSizes(String product_id);
}
