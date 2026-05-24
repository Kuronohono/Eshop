package com.deloitte.eshop.dto;

import org.hibernate.annotations.SecondaryRow;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginUserDto {

    private String email;
    private String password;
}
