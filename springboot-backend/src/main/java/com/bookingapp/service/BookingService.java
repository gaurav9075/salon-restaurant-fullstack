package com.bookingapp.service;

import com.bookingapp.dto.BookingRequest;
import com.bookingapp.model.Booking;
import com.bookingapp.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookingService {

    private final BookingRepository bookingRepository;
    private final EmailService emailService;

    // ── Create new booking ────────────────────────────────────────────────
    public Booking createBooking(BookingRequest req) {
        Booking booking = new Booking();
        booking.setName(req.getName());
        booking.setEmail(req.getEmail());
        booking.setPhone(req.getPhone());
        booking.setDate(req.getDate());
        booking.setTime(req.getTime());
        booking.setBusinessType(req.getBusinessType());
        booking.setService(req.getService());
        booking.setGuests(req.getGuests());
        booking.setOccasion(req.getOccasion());
        booking.setNotes(req.getNotes());
        booking.setStatus(Booking.BookingStatus.PENDING);

        Booking saved = bookingRepository.save(booking);

        // Send emails asynchronously
        emailService.sendBookingConfirmation(saved);
        emailService.sendAdminNotification(saved);

        log.info("Booking created: id={}, type={}, customer={}", saved.getId(), saved.getBusinessType(), saved.getName());
        return saved;
    }

    // ── Get all bookings ──────────────────────────────────────────────────
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // ── Get bookings by type ──────────────────────────────────────────────
    public List<Booking> getBookingsByType(String businessType) {
        return bookingRepository.findByBusinessTypeOrderByCreatedAtDesc(businessType);
    }

    // ── Get single booking ────────────────────────────────────────────────
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    // ── Confirm booking ───────────────────────────────────────────────────
    public Booking confirmBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found: " + id));
        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        return bookingRepository.save(booking);
    }

    // ── Cancel booking ────────────────────────────────────────────────────
    public Booking cancelBooking(Long id, String reason) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found: " + id));
        booking.setStatus(Booking.BookingStatus.CANCELLED);
        Booking saved = bookingRepository.save(booking);
        emailService.sendCancellationEmail(saved, reason);
        return saved;
    }

    // ── Complete booking ──────────────────────────────────────────────────
    public Booking completeBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found: " + id));
        booking.setStatus(Booking.BookingStatus.COMPLETED);
        return bookingRepository.save(booking);
    }

    // ── Get booked slots for a given date ─────────────────────────────────
    public List<String> getBookedSlots(String date, String businessType) {
        return bookingRepository.findByDateAndBusinessType(date, businessType)
            .stream()
            .filter(b -> b.getStatus() != Booking.BookingStatus.CANCELLED)
            .map(Booking::getTime)
            .toList();
    }

    // ── Scheduled: Send reminder emails every day at 9 AM ─────────────────
    @Scheduled(cron = "0 0 9 * * *")
    public void sendDailyReminders() {
        String tomorrow = LocalDate.now().plusDays(1)
            .format(DateTimeFormatter.ISO_LOCAL_DATE);

        List<Booking> tomorrowBookings = bookingRepository
            .findByDateAndStatus(tomorrow, Booking.BookingStatus.CONFIRMED);

        tomorrowBookings.forEach(booking -> {
            emailService.sendReminderEmail(booking);
            log.info("Reminder sent for booking id={}", booking.getId());
        });

        log.info("Daily reminders sent: {} bookings for {}", tomorrowBookings.size(), tomorrow);
    }
}
