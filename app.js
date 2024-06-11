const express = require("express");
const bodyParser = require("body-parser");
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const audienceRoutes = require("./routes/audienceRoutes");
const { pubsubInit } = require("./utils/pubsub");

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/audiences", audienceRoutes);

// Initialize Pub/Sub
pubsubInit();

module.exports = app;
