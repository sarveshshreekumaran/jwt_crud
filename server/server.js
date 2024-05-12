const connectDB = require("./configs/dbConnection");
connectDB();
const express = require("express");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");

//privite route
app.use("/note", noteRoutes);

//public route
app.use("/user", userRoutes);
