package com.bookingapp.controller;

import com.bookingapp.model.Contact;
import com.bookingapp.repository.ContactRepository;
import com.bookingapp.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ContactController {

    private final ContactRepository contactRepository;
    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<?> submitContact(@RequestBody Map<String, String> body) {
        try {
            Contact contact = new Contact();
            contact.setName(body.get("name"));
            contact.setEmail(body.get("email"));
            contact.setPhone(body.get("phone"));
            contact.setMessage(body.get("message"));
            contact.setBusinessType(body.getOrDefault("businessType", "general"));

            Contact saved = contactRepository.save(contact);
            emailService.sendContactAutoReply(saved);

            return ResponseEntity.ok(Map.of("message", "Message received. We'll reply within 24 hours."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts() {
        return ResponseEntity.ok(contactRepository.findAllByOrderByCreatedAtDesc());
    }
}
