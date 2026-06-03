package com.deloitte.eshop.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users", uniqueConstraints = {
                @UniqueConstraint(columnNames = { "email" })
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Builder
public class User implements UserDetails {

        /* User Authentication Fields */

        @Id
        @UuidGenerator
        @Column(name = "id", unique = true, updatable = false)
        private String id;

        @Column(name = "username", unique = true, nullable = false)
        private String username;

        @Column(name = "email", unique = true, nullable = false)
        private String email;

        @Column(name = "password", nullable = false)
        private String password;

        private boolean enabled;

        @Column(name = "verification_code")
        private String verificationCode;

        @Column(name = "verification_expiration")
        private LocalDateTime verificationCodeExpiration;

        @Enumerated(EnumType.STRING)
        @Column(name = "user_role", nullable = false)
        private UserRole userRole;

        @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
        @Builder.Default
        private List<Address> addresses = new ArrayList<>();

        @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
        @Builder.Default
        private List<CartProduct> products_cart = new ArrayList<>();

        @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
        @Builder.Default
        private List<Order> user_orders = new ArrayList<>();

        @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
        @Builder.Default
        private List<Review> reviews = new ArrayList<>();

        @ManyToMany
        @JoinTable(name = "user_wishlist", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
        @Builder.Default
        private List<ProductVariant> userWishList = new ArrayList<>();

        // Contrsuctors

        public User(String username, String email, String password, UserRole userRole) {
                this.username = username;
                this.email = email;
                this.password = password;
                this.userRole = userRole;
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
                return List.of(new SimpleGrantedAuthority(userRole.name()));
        }

        @Override
        public boolean isAccountNonExpired() {
                return true;
        }

        @Override
        public boolean isAccountNonLocked() {
                return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
                return true;
        }

        @Override
        public boolean isEnabled() {
                return enabled;
        }

        public void addAddress(Address address) {
                addresses.add(address);
                address.setUser(this);
        }

        public void removeAddress(Address address) {
                addresses.remove(address);
                address.setUser(null);
        }

}
