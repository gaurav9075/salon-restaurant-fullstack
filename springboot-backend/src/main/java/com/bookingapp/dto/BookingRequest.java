package com.bookingapp.dto;

import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

// ─── Booking Request ───────────────────────────────────────────────────────
@Data
public class BookingRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Phone is required")
    private String phone;

    @NotBlank(message = "Date is required")
    private String date;

    @NotBlank(message = "Time is required")
    private String time;

    @NotBlank(message = "Business type is required")
    private String businessType;  // "salon" or "restaurant"

    // Salon
    private String service;

    // Restaurant
    private String guests;
    private String occasion;

    // Shared
    private String notes;
    private String status;
}
