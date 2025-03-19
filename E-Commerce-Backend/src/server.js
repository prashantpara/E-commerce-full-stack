const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/route");

const app = express();
app.use(express.json());
app.use("/", router);

mongoose
  .connect(
    "mongodb+srv://prashantpara7:PARAJI%40910921@cluster0.s7ojs.mongodb.net/E-Commerce"
  )
  .then(() => {
    console.log("Database Connected successfully");
  })
  .catch((error) => {
    console.log("Database not Connected successfully", error);
  });

app.get("/test", (req, res) => {
  res.send("hello");
});

const PORT = 4500;
app.listen(PORT, (err) => {
  err
    ? console.error("Something went wrong")
    : console.log(`server running at port ${PORT}`);
});
