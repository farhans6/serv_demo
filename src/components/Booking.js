import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const Booking = () => {
  const [service, setService] = useState(""); // Store the service input
  const [message, setMessage] = useState("");  // Store the confirmation message
  const [error, setError] = useState("");      // Store any error message
  const navigate = useNavigate();

  const handleBooking = async (e) => {
    e.preventDefault();

    // Check if the service field is empty
    if (!service.trim()) {
      setError("Please provide the service you need.");
      return;
    }

    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("You must be logged in to book an appointment.");
      }

      // Create a booking object to save in Firestore
      const bookingData = {
        service,
        userId: user.uid,
        userEmail: user.email,
        userMobile: user.phoneNumber, // Assuming phone number is available
        status: "Booked",
        timestamp: new Date(),
      };

      // Save booking details in Firestore (under the "appointments" collection)
      await setDoc(doc(db, "appointments", `${user.uid}-${Date.now()}`), bookingData);

      // Show success message
      setMessage(`Thank you!. Appointment booked for ${service}. You will be contacted with the provided email and mobile no.`);
      setError("");  // Clear any existing errors
    } catch (err) {
      setError(err.message);
      setMessage("");  // Clear message if there's an error
    }
  };

  return (
      <div style={styles.container}>
        <h2>Book an Appointment</h2>
        <form onSubmit={handleBooking} style={styles.form}>
          <input
            type="text"
            placeholder="Enter service (e.g., Denting, Painting, General Service)"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
            style={styles.input} />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Book Appointment</button>
        </form>

        {message && <p style={styles.message}>{message}</p>}
        <h2>Availabe Services</h2>
        <h3>...</h3>
        <h3>...</h3>
        <h3>...</h3>
        <h3>...</h3>
      </div>

  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  form: {
    display: "inline-block",
    textAlign: "left",
    maxWidth: "300px",
  },
  input: {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    padding: "8px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    background: "#007BFF",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
  message: {
    color: "green",
    fontSize: "16px",
    marginTop: "20px",
  },
};

export default Booking;
