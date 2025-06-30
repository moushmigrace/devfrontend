import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Profile.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    photoUrl: "",
    about: "",
    skills: "",
  });
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/view");
        const userData = res.data;
        setUser(userData);
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          age: userData.age || "",
          gender: userData.gender || "",
          photoUrl: userData.photoUrl || "",
          about: userData.about || "",
          skills: (userData.skills || []).join(", "),
        });
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("firstName", formData.firstName);
      form.append("lastName", formData.lastName);
      form.append("age", formData.age);
      form.append("gender", formData.gender);
      form.append("about", formData.about);
      form.append("skills", formData.skills);
      if (file) {
        form.append("photo", file);
      }

      const res = await api.patch("/profile/edit", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message);
      setIsEditing(false);
      setUser(res.data.data);
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update profile");
    }
  };

  if (!user) return <p>Loading...</p>;

  const displayImage = file
    ? URL.createObjectURL(file)
    : formData.photoUrl || "https://geographyandyou.com/images/user-profile.png";

  return (
    <>
    <Header />
    <Navbar />
    <div className="profile-wrapperr">
      <h2>My Profile</h2>
      <div className="profile-cardd">
        <div className="profile-leftt">
          <img src={displayImage} alt="Profile" className="profile-imgg" />
          {isEditing && (
            <>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </>
          )}
        </div>

        <div className="profile-rightt">
          {isEditing ? (
            <>
              <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Namee" />
              <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Namee" />
              <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Agee" />
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <textarea name="about" value={formData.about} onChange={handleChange} placeholder="Aboutt" />
              <input name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (comma separated)" />
              <button onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Premium:</strong> {user.isPremium ? "Yes" : "No"}</p>
              <p><strong>About:</strong> {user.about}</p>
              <p><strong>Skills:</strong> {(user.skills || []).join(", ")}</p>
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            </>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>

  );
};

export default Profile;
