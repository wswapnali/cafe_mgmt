const express = require("express");
const cors = require("cors");
const cafeRouter = require("./routes/cafeRoutes");
const employeeRouter = require("./routes/employeeRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/cafe", cafeRouter);
app.use("/employee", employeeRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
