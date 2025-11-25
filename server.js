const express = require("express");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
const cloudinary = require("cloudinary").v2;
const path = require("path");

// cloudinary config

cloudinary.config({
  cloud_name: "dnop3ud2b",
  api_key: "215653516953141",
  api_secret: "LOYWx9U4gQ6pt-nl3O_WEpknMmo",
});

//config deoenv

dotenv.config();

// connect database
connectDb();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

//user routes
app.use("/api/v1/users", require("./routes/userRoutes"));
app.use("/api/v1/otp", require("./routes/otpRoutes"));

//transaction routes
app.use("/api/v1/transaction", require("./routes/transactionRoutes"));

//port

const PORT = 8000 || process.env.PORT;

// listen server

app.listen(PORT, () => {
  console.log(`Server is Running at the port number ${PORT}`);
});