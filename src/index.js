const express = require("express");
const { config } = require("dotenv");
const userRoutes = require("./routes/index");

config();
const app = express();
app.use(express.json());

app.use("/", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
