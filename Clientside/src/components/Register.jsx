// import React, { useState } from "react";
// import axios from "axios";
// import "./Register.scss";
// import api from "../assets/url";
// import { useNavigate } from "react-router-dom";

// const RegisterPage = () => {
//   const navigate = useNavigate();
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [username, setUsername] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const email = localStorage.getItem("email"); 

//   // Convert file to Base64
//   const convertBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   };

  
//   const handleProfilePhotoChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const base64 = await convertBase64(file);
//       setProfilePhoto(base64);
//     }
//   };


//   const handleSubmit = async (event) => {
//     event.preventDefault();
// console.log(profilePhoto);

//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     const data = {
//       profile: profilePhoto,
//       username,
//       email,
//       phone,
//       pwd: password,
//       cpwd: confirmPassword,
//     };

//     try {
//       const response = await axios.post(`${url}/register`, data);
//       console.log(response.data);
//       alert("Registration successful!");
//       localStorage.removeItem("email");
//       navigate("/login");
//     } catch (error) {
//       console.error("Error during registration:", error);
//       alert("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div className="register-container">
//       <div className="register-card">
//         <h2 className="register-heading">Register</h2>

//         <form className="register-form" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             className="input-field"
//           />

//           <input
//             type="phone"
//             name="phone"
//             placeholder="Phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//             className="input-field"
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="input-field"
//           />

//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//             className="input-field"
//           />

//           <div className="form-group image-upload">
//             <label htmlFor="profile-photo" className="image-label">
//               Upload Profile Image
//             </label>
//             <input
//               type="file"
//               id="profile-photo"
//               accept="image/*"
//               onChange={handleProfilePhotoChange}
//               className="image-input"
//             />
//             {profilePhoto && (
//               <img src={profilePhoto} alt="Preview" className="image-preview" />
//             )}
//           </div>

//           <button type="submit" className="register-button">
//             Register
//           </button>
//         </form>

//         <p>
//           Already have an account?{" "}
//           <span onClick={() => navigate("/login")} className="login-link">
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

import React, { useState } from "react";
import axios from "axios";
import "./Register.scss";
import api from "../assets/url";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const email = localStorage.getItem("email");

  // Password Validation Regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Convert file to Base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleProfilePhotoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertBase64(file);
      setProfilePhoto(base64);
    }
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);

    if (!passwordRegex.test(pwd)) {
      setPasswordError(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert(
        "Invalid password! Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    const data = {
      profile: profilePhoto,
      username,
      email,
      phone,
      pwd: password,
      cpwd: confirmPassword,
    };

    try {
      const response = await axios.post(`${api}/register`, data);
      console.log(response.data);
      alert("Registration successful!");
      localStorage.removeItem("email");
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-heading">Register</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-field"
          />

          <input
            type="phone"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="input-field"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="input-field"
          />
          {passwordError && <p className="error-text">{passwordError}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-field"
          />

          <div className="form-group image-upload">
            <label htmlFor="profile-photo" className="image-label">
              Upload Profile Image
            </label>
            <input
              type="file"
              id="profile-photo"
              accept="image/*"
              onChange={handleProfilePhotoChange}
              className="image-input"
            />
            {profilePhoto && (
              <img src={profilePhoto} alt="Preview" className="image-preview" />
            )}
          </div>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="login-link">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
