package com.bookingapp.controller;

import com.bookingapp.dto.BookingRequest;
import com.bookingapp.model.Booking;
import com.bookingapp.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class BookingController {

    private final BookingService bookingService;

    // ── POST /api/bookings — Create booking (salon appointment) ───────────
    @PostMapping("/bookings")
    public ResponseEntity<?> createBooking(@Valid @RequestBody BookingRequest req) {
        try {
            Booking booking = bookingService.createBooking(req);
            return ResponseEntity.status(HttpStatus.CREATED).body(booking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ── POST /api/reservations — Create reservation (restaurant) ──────────
    @PostMapping("/reservations")
    public ResponseEntity<?> createReservation(@Valid @RequestBody BookingRequest req) {
        req.setBusinessType("restaurant");
        try {
            Booking booking = bookingService.createBooking(req);
            return ResponseEntity.status(HttpStatus.CREATED).body(booking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ── GET /api/bookings — Get all bookings ──────────────────────────────
    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings(
            @RequestParam(required = false) String type) {
        List<Booking> bookings = type != null
            ? bookingService.getBookingsByType(type)
            : bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    // ── GET /api/bookings/{id} — Get single booking ───────────────────────
    @GetMapping("/bookings/{id}")
    public ResponseEntity<?> getBooking(@PathVariable Long id) {
        return bookingService.getBookingById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // ── PATCH /api/bookings/{id}/confirm ─────────────────────────────────
    @PatchMapping("/bookings/{id}/confirm")
    public ResponseEntity<?> confirmBooking(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(bookingService.confirmBooking(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ── PATCH /api/bookings/{id}/cancel ──────────────────────────────────
    @PatchMapping("/bookings/{id}/cancel")
    public ResponseEntity<?> cancelBooking(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> body) {
        try {
            String reason = body != null ? body.get("reason") : null;
            return ResponseEntity.ok(bookingService.cancelBooking(id, reason));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ── PATCH /api/bookings/{id}/complete ────────────────────────────────
    @PatchMapping("/bookings/{id}/complete")
    public ResponseEntity<?> completeBooking(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(bookingService.completeBooking(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ── GET /api/bookings/slots?date=2026-04-28&type=salon ───────────────
    @GetMapping("/bookings/slots")
    public ResponseEntity<List<String>> getBookedSlots(
            @RequestParam String date,
            @RequestParam String type) {
        return ResponseEntity.ok(bookingService.getBookedSlots(date, type));
    }

    // ── GET /api/health ───────────────────────────────────────────────────
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "Booking API"));
    }
}
