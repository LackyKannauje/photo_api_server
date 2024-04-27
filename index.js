const express = require("express");
const app = express();
const uploadRoutes = require("./routes/upload");
const getRoutes = require("./routes/get");

app.use(express.json());

app.use(uploadRoutes);
app.use(getRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server started!!"));
