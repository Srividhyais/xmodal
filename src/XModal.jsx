import React, { useState, useRef, useEffect } from "react";
import "./XModal.css"; // Import the CSS

const XModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const modalRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showModal]);

  const validate = () => {
    const { username, email, phone, dob } = formData;

    if (!username.trim()) {
      alert("Please fill in the Username field.");
      return false;
    }

    if (!email.trim()) {
      alert("Please fill in the Email field.");
      return false;
    }

    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return false;
    }

    if (!phone.trim()) {
      alert("Please fill in the Phone Number field.");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return false;
    }

    if (!dob.trim()) {
      alert("Please fill in the Date of Birth field.");
      return false;
    }

    const selectedDate = new Date(dob);
    const today = new Date();
    if (selectedDate > today) {
      alert("Invalid date of birth. Please enter a valid date.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
      setShowModal(false);
      setFormData({ username: "", email: "", phone: "", dob: "" });
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
        User Details Modal
      </h1>
      <button onClick={() => setShowModal(true)}>Open Form</button>

      {showModal && (
          <div className="modal-overlay">
            <div className="modal">
            <div className="modal-content" ref={modalRef}>
              <h2>Fill Details</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />

                <label htmlFor="email">Email Address:</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />

                <label htmlFor="phone">Phone Number:</label>
                <input
                  id="phone"
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />

                <label htmlFor="dob">Date of Birth:</label>
                <input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                  required
                />

                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
          </div>
      )}
    </div>
  );
};

export default XModal;
