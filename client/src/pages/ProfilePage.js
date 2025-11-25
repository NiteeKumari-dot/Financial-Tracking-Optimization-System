import React, { useState } from "react";
import Layout from "./../components/layout/Layout";
import axios from "axios";
import { message } from "antd";

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [pic, setPic] = useState(false);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const selectImg = () => {
    const input = document.getElementById("img-input");
    input.click();
  };

  const updateHandler = async () => {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("userId", user._id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const { data } = await axios.post(
        '/api/v1/users/update-profile',
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.data, password: "" })
      );

      setPic(!pic);
      message.success("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      message.error("Profile Update Failed");
    }
  };

  return (
    <Layout>
      <section
        className="min-vh-75 d-flex align-items-center"
        style={{
          background: "#ffffff",
          padding: "40px 0",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* Outer Card */}
              <div
                className="p-4 rounded-4 shadow-sm bg-white"
                style={{
                  border: "1px solid #e5e7eb",
                }}
              >
                <div className="row g-4">
                  {/* LEFT SIDE */}
                  <div className="col-md-5 text-center border-end">
                    <h3 className="fw-bold text-dark mb-2">{user.name}</h3>

                    <p className="text-muted">Account Overview</p>

                    {/* Avatar */}
                    <div className="d-flex justify-content-center">
                      <img
                        src={pic ? URL.createObjectURL(photo) : user.photo}
                        className="rounded-circle shadow border"
                        style={{
                          width: 160,
                          height: 160,
                          objectFit: "cover",
                          cursor: "pointer",
                          transition: "0.3s",
                        }}
                        onClick={selectImg}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.scale = "1.05")
                        }
                        onMouseOut={(e) => (e.currentTarget.style.scale = "1")}
                      />
                    </div>

                    <input
                      type="file"
                      id="img-input"
                      name="photo"
                      hidden
                      onChange={(e) => {
                        setPhoto(e.target.files[0]);
                        setPic(true);
                      }}
                    />

                    <button
                      className="btn btn-outline-primary mt-4 px-4 fw-semibold"
                      onClick={selectImg}
                      style={{ borderRadius: "8px" }}
                    >
                      Change Photo
                    </button>
                  </div>

                  {/* RIGHT SIDE FORM */}
                  <div className="col-md-7">
                    <h4 className="fw-semibold text-dark mb-3">Edit Profile</h4>

                    {/* Name */}
                    <div className="mb-3">
                      <label className="fw-medium text-dark">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={user.name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                          height: 48,
                          background: "#f8f9fa",
                          color: "#000",
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                      <label className="fw-medium text-dark">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        defaultValue={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          height: 48,
                          background: "#f8f9fa",
                          color: "#000",
                        }}
                      />
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                      <label className="fw-medium text-dark">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter new password"
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                          height: 48,
                          background: "#f8f9fa",
                          color: "#000",
                        }}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      className="btn btn-primary w-100 fw-bold mt-3 py-2"
                      onClick={updateHandler}
                      style={{ borderRadius: "10px" }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProfilePage;