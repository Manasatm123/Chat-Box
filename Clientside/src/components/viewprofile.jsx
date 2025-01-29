import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../assets/url";
import "./Viewprofile.scss";
import { FaArrowLeft } from "react-icons/fa";

const ViewProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${api}/getReciever/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [id, token]);

  return (
    <div className="view-profile">
      
      <div className="navbar">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
      </div>

      
      <div className="profile-container">
        {profile ? (
          <>
            <div className="profile-picture">
              <img
                src={
                  profile.profile ||
                  "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
                }
                alt="Profile"
              />
            </div>
            <div className="profile-info">
              <h3 className="profile-name">{profile.username}</h3>
              <p className="profile-detail">
                <strong>Email:</strong> {profile.email}
              </p>
              <p className="profile-detail">
                <strong>Phone:</strong> {profile.phone || "Not available"}
              </p>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ViewProfile;
