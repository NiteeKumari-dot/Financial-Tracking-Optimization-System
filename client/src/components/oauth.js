import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { FcGoogle } from "react-icons/fc";

const Oauth = () => {
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await axios.post("/api/v1/users/google", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({ ...res.data.user, password: "" })
      );

      message.success("Login SuccessFull");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      type="button"
      className="w-100 m-1 p-3"
      onClick={handleGoogleClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        background: "#f2f2f2", // Whitish gray
        color: "#333", // Dark text
        border: "1px solid #ddd", // Light border for clean look
        borderRadius: "8px",
        fontWeight: "600",
      }}
    >
      <FcGoogle size={22} />
      Continue with Google
    </button>
  );
};

export default Oauth;