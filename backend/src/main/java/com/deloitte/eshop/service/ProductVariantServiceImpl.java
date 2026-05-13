package com.deloitte.eshop.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.deloitte.eshop.entity.Colors;
import com.deloitte.eshop.entity.ProductVariant;
import com.deloitte.eshop.entity.Sizes;
import com.deloitte.eshop.repo.ProductVariantRepository;

@Service
public class ProductVariantServiceImpl implements ProductVariantService {

    @Autowired
    private ProductVariantRepository productVariantRepository;

    @Override
    public List<ProductVariant> getProductVariants() {
        return (List<ProductVariant>) productVariantRepository.findAll();
    }

    @Override
    public ProductVariant addProductVariant(ProductVariant variant) {
        return productVariantRepository.save(variant);
    }

    @Override
    public ProductVariant updateProductVariant(ProductVariant variant) {
        return productVariantRepository.save(variant);
    }

    @Override
    public String deleteProductVariant(ProductVariant variant) {
        productVariantRepository.delete(variant);
        return "Product Variant Deleted";
    }

    @Override
    public List<ProductVariant> getProductVariantsByProductId(String product_id) {
        return (List<ProductVariant>) productVariantRepository.findAll();
    }

    @Override
    public List<Colors> getProductVariantColors(String product_id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getProductVariantColors'");
    }

    @Override
    public List<Integer> getProductVariantsStock(String product_id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getProductVariantsStock'");
    }

    @Override
    public List<Sizes> getProductVariantsSizes(String product_id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getProductVariantsSizes'");
    }

}
