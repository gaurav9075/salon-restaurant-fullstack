package com.bookingapp.service;

import com.bookingapp.model.Booking;
import com.bookingapp.model.Contact;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String fromEmail;

    @Value("${app.business.salon.email}")
    private String salonEmail;

    @Value("${app.business.restaurant.email}")
    private String restaurantEmail;

    // ── Send booking confirmation to customer ─────────────────────────────
    @Async
    public void sendBookingConfirmation(Booking booking) {
        try {
            String subject = booking.getBusinessType().equals("salon")
                ? "✦ Appointment Confirmed — Glow Studio"
                : "Your Reservation is Confirmed — The Corner Table";

            String html = buildConfirmationEmail(booking);
            sendHtmlEmail(booking.getEmail(), subject, html);
            log.info("Confirmation email sent to {}", booking.getEmail());
        } catch (Exception e) {
            log.error("Failed to send confirmation email: {}", e.getMessage());
        }
    }

    // ── Notify business owner of new booking ──────────────────────────────
    @Async
    public void sendAdminNotification(Booking booking) {
        try {
            String ownerEmail = booking.getBusinessType().equals("salon") ? salonEmail : restaurantEmail;
            String subject = "🔔 New Booking: " + booking.getName() + " — " + booking.getDate() + " " + booking.getTime();
            String html = buildAdminNotificationEmail(booking);
            sendHtmlEmail(ownerEmail, subject, html);
            log.info("Admin notification sent to {}", ownerEmail);
        } catch (Exception e) {
            log.error("Failed to send admin notification: {}", e.getMessage());
        }
    }

    // ── Reminder email (sent 24h before appointment) ──────────────────────
    @Async
    public void sendReminderEmail(Booking booking) {
        try {
            String subject = booking.getBusinessType().equals("salon")
                ? "⏰ Reminder: Your Glow Studio appointment is tomorrow"
                : "⏰ Reminder: Your Corner Table reservation is tomorrow";

            String html = buildReminderEmail(booking);
            sendHtmlEmail(booking.getEmail(), subject, html);
            log.info("Reminder sent to {}", booking.getEmail());
        } catch (Exception e) {
            log.error("Failed to send reminder: {}", e.getMessage());
        }
    }

    // ── Cancellation email ────────────────────────────────────────────────
    @Async
    public void sendCancellationEmail(Booking booking, String reason) {
        try {
            String subject = "Your booking has been cancelled";
            String html = buildCancellationEmail(booking, reason);
            sendHtmlEmail(booking.getEmail(), subject, html);
        } catch (Exception e) {
            log.error("Failed to send cancellation email: {}", e.getMessage());
        }
    }

    // ── Contact auto-reply ─────────────────────────────────────────────────
    @Async
    public void sendContactAutoReply(Contact contact) {
        try {
            String subject = "Thanks for getting in touch!";
            String html = "<div style='font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;'>"
                + "<h2 style='color:#1c1208;'>Hi " + contact.getName() + ",</h2>"
                + "<p>Thanks for reaching out. We've received your message and will get back to you within 24 hours.</p>"
                + "<p style='color:#888;margin-top:32px;font-size:13px;'>This is an automated reply — please don't respond to this email.</p>"
                + "</div>";
            sendHtmlEmail(contact.getEmail(), subject, html);
        } catch (Exception e) {
            log.error("Failed to send contact auto-reply: {}", e.getMessage());
        }
    }

    // ── Helper: send HTML email ───────────────────────────────────────────
    private void sendHtmlEmail(String to, String subject, String html) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom(fromEmail);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(html, true);
        mailSender.send(message);
    }

    // ── Email templates ───────────────────────────────────────────────────
    private String buildConfirmationEmail(Booking b) {
        boolean isSalon = b.getBusinessType().equals("salon");
        String accent = isSalon ? "#c9a96e" : "#c8762a";
        String businessName = isSalon ? "Glow Studio" : "The Corner Table";
        String detail = isSalon
            ? "<tr><td style='padding:10px 0;color:#888;'>Service</td><td style='padding:10px 0;font-weight:500;'>" + b.getService() + "</td></tr>"
            : "<tr><td style='padding:10px 0;color:#888;'>Guests</td><td style='padding:10px 0;font-weight:500;'>" + b.getGuests() + " people</td></tr>";

        return "<!DOCTYPE html><html><body style='margin:0;padding:0;background:#f5f5f5;'>"
            + "<div style='max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;'>"
            + "<div style='background:" + accent + ";padding:40px 32px;text-align:center;'>"
            + "<h1 style='color:#fff;font-family:Georgia,serif;margin:0;font-weight:400;font-size:28px;'>" + businessName + "</h1>"
            + "<p style='color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;letter-spacing:2px;text-transform:uppercase;'>Booking Confirmed</p>"
            + "</div>"
            + "<div style='padding:40px 32px;'>"
            + "<h2 style='font-family:Georgia,serif;font-weight:400;color:#1c1208;'>Hi " + b.getName() + " 👋</h2>"
            + "<p style='color:#666;line-height:1.6;'>Your booking is confirmed. We're looking forward to seeing you!</p>"
            + "<table style='width:100%;margin:28px 0;border-top:1px solid #eee;'>"
            + detail
            + "<tr><td style='padding:10px 0;color:#888;'>Date</td><td style='padding:10px 0;font-weight:500;'>" + b.getDate() + "</td></tr>"
            + "<tr><td style='padding:10px 0;color:#888;'>Time</td><td style='padding:10px 0;font-weight:500;'>" + b.getTime() + "</td></tr>"
            + "</table>"
            + "<p style='color:#666;font-size:14px;'>If you need to cancel or reschedule, please contact us at least 24 hours in advance.</p>"
            + "<p style='color:#999;font-size:12px;margin-top:32px;'>© 2026 " + businessName + ". All rights reserved.</p>"
            + "</div></div></body></html>";
    }

    private String buildAdminNotificationEmail(Booking b) {
        return "<div style='font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;'>"
            + "<h2 style='color:#1c1208;'>🔔 New Booking Received</h2>"
            + "<table style='width:100%;border-collapse:collapse;'>"
            + "<tr><td style='padding:8px 0;color:#888;font-size:14px;'>Name</td><td style='padding:8px 0;font-weight:600;'>" + b.getName() + "</td></tr>"
            + "<tr><td style='padding:8px 0;color:#888;font-size:14px;'>Email</td><td style='padding:8px 0;'>" + b.getEmail() + "</td></tr>"
            + "<tr><td style='padding:8px 0;color:#888;font-size:14px;'>Phone</td><td style='padding:8px 0;'>" + b.getPhone() + "</td></tr>"
            + "<tr><td style='padding:8px 0;color:#888;font-size:14px;'>Date</td><td style='padding:8px 0;font-weight:600;'>" + b.getDate() + "</td></tr>"
            + "<tr><td style='padding:8px 0;color:#888;font-size:14px;'>Time</td><td style='padding:8px 0;font-weight:600;'>" + b.getTime() + "</td></tr>"
            + (b.getService() != null ? "<tr><td style='padding:8px 0;color:#888;font-size:14px;'>Service</td><td style='padding:8px 0;'>" + b.getService() + "</td></tr>" : "")
            + (b.getGuests() != null ? "<tr><td style='padding:8px 0;color:#888;font-size:14px;'>Guests</td><td style='padding:8px 0;'>" + b.getGuests() + "</td></tr>" : "")
            + (b.getNotes() != null && !b.getNotes().isEmpty() ? "<tr><td style='padding:8px 0;color:#888;font-size:14px;'>Notes</td><td style='padding:8px 0;'>" + b.getNotes() + "</td></tr>" : "")
            + "</table></div>";
    }

    private String buildReminderEmail(Booking b) {
        boolean isSalon = b.getBusinessType().equals("salon");
        String businessName = isSalon ? "Glow Studio" : "The Corner Table";
        return "<div style='font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;'>"
            + "<h2>Hi " + b.getName() + " — just a reminder!</h2>"
            + "<p>Your " + (isSalon ? "appointment" : "reservation") + " at <strong>" + businessName + "</strong> is <strong>tomorrow</strong>.</p>"
            + "<p><strong>Date:</strong> " + b.getDate() + "</p>"
            + "<p><strong>Time:</strong> " + b.getTime() + "</p>"
            + "<p>If you need to cancel, please let us know at least 24 hours in advance. See you tomorrow!</p>"
            + "</div>";
    }

    private String buildCancellationEmail(Booking b, String reason) {
        return "<div style='font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;'>"
            + "<h2>Booking Cancelled</h2>"
            + "<p>Hi " + b.getName() + ", unfortunately your booking on <strong>" + b.getDate() + " at " + b.getTime() + "</strong> has been cancelled.</p>"
            + (reason != null && !reason.isEmpty() ? "<p><strong>Reason:</strong> " + reason + "</p>" : "")
            + "<p>We apologise for any inconvenience. Please contact us to rebook.</p>"
            + "</div>";
    }
}
