const path = require("path");
const http = require("http");

const express = require("express");
const dotEnv = require("dotenv");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");
const mongoose = require("mongoose");

const routes = require("./routes");
const logger = require("./middlewares/logger");
const mongoSeeds = require("./utils/seed/mongoSeeds");
const { errorHandler } = require("./middlewares/errors");
const { swaggerOptions } = require("./utils");
const { initialSocketIO } = require("./utils/socket");

const app = express();

//* Load Config
dotEnv.config({ path: "./config.env" });

//* Database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING);

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");

  //* Mongo Seeds
  mongoSeeds();
});

//* BodyPaser
app.use(express.urlencoded({ limit: "1mb", extended: false }));
app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "authorization",
      "X-Authorization",
    ],
  })
);

//* Logs
app.use(logger);

//* Routes
app.use(routes);

//* Static Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//* Error Controller
app.use(errorHandler);

//* Swagger Config
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(
  "/swagger",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs, { explorer: true })
);

//* Create HTTP server.
const server = http.createServer(app);

//* Listening for HTTP connections
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`HTTP Server running on port ${PORT}`));

//* Initial Socket IO
initialSocketIO(server);
