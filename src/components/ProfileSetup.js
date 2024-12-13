import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const ProfileSetup = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [carName, setCarName] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [carColor, setCarColor] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No authenticated user found!");
      }

      // Save profile data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        mobile,
        carName,
        carNumber,
        carColor,
        email: user.email,
      });

      // Redirect to Profile Page
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSave} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="tel"
          placeholder="Mobile Number(Whats App)"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Car Name"
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Car Number"
          value={carNumber}
          onChange={(e) => setCarNumber(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Car Color"
          value={carColor}
          onChange={(e) => setCarColor(e.target.value)}
          required
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          Save Profile
        </button>
      </form>
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
};

export default ProfileSetup;
