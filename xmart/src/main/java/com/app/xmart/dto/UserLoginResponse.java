package com.app.xmart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginResponse {
    private Integer customerId;
    private String customerName;
    private Integer customerWallet;
}
