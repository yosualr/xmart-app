package com.app.xmart.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "transaction")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Transactions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Integer transactionId;

    @Column(name = "customer_id")
    private Integer customerId;

    @Column(name = "rfid")
    private Integer rfid;

    @Column(name = "product_price")
    private String productPrice;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "transaction_datetime")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd:MM:yyyy HH:mm:ss")
    private LocalDateTime transactionDatetime;
}
