package com.bookingapp.repository;

import com.bookingapp.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByBusinessTypeOrderByCreatedAtDesc(String businessType);

    List<Booking> findByStatusOrderByCreatedAtDesc(Booking.BookingStatus status);

    List<Booking> findByDateAndBusinessType(String date, String businessType);

    List<Booking> findByEmailOrderByCreatedAtDesc(String email);

    @Query("SELECT b FROM Booking b WHERE b.businessType = :type ORDER BY b.createdAt DESC")
    List<Booking> findAllByTypeDesc(String type);

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.businessType = :type AND b.status = :status")
    Long countByTypeAndStatus(String type, Booking.BookingStatus status);

    // Find bookings for tomorrow for reminder emails
    List<Booking> findByDateAndStatus(String date, Booking.BookingStatus status);
}
