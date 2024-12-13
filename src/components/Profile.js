import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;

      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2>My Profile</h2>
      <div style={styles.profileContainer}>
        <div style={styles.profileField}>
          <strong>Name:</strong> <span style={styles.profileValue}>{profile.name}</span>
        </div>
        <div style={styles.profileField}>
          <strong>Mobile(whats app):</strong> <span style={styles.profileValue}>{profile.mobile}</span>
        </div>
        <div style={styles.profileField}>
          <strong>Email:</strong> <span style={styles.profileValue}>{profile.email}</span>
        </div>
        <div style={styles.profileField}>
          <strong>Car Name:</strong> <span style={styles.profileValue}>{profile.carName}</span>
        </div>
        <div style={styles.profileField}>
          <strong>Car Number:</strong> <span style={styles.profileValue}>{profile.carNumber}</span>
        </div>
        <div style={styles.profileField}>
          <strong>Car Color:</strong> <span style={styles.profileValue}>{profile.carColor}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  profileContainer: {
    display: "inline-block",
    textAlign: "left",
    maxWidth: "2000px",
    marginTop: "30px",
  },
  profileField: {
    backgroundColor: "#9faded",  // Light blue background
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileValue: {
    color: "#0f0f0f",  // Darker text color for readability
  },
};

export default Profile;
