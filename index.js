const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 4000;
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

require("dotenv").config();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/uploads", express.static(__dirname + "/uploads"));

// // Define a route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", require("./routes"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(
    `Swagger docs are available at http://localhost:${port}/api-docs`
  );
});
