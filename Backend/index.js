const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
// const path = require("path")
require("dotenv").config();
// connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Header":
      "Origin, X-Requested-With, Content-Type, Accept",
    credentials: false,
  })
);

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  // app.use(express.static("../Frontend/build"));
  // const buildPath = (path.join(__dirname, "../Frontend/build"));
  // app.use(express.static(buildPath));
  // app.get('(/*)?', (req, res) => {
  //   res.sendFile(path.join(buildPath, "index.html"));
  // });
}
app.get("/", (req, res) => {
  res.send("<h1>DevNotes Backend</h1>");
});

app.listen(port, () => {
  console.log(`Backend listening at port http://localhost:${port}`);
});
