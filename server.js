// server.js (Backend)

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Order = require("./models/order");

const app = express();
const PORT = 5000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://priyanshukushwah516:EirpeR21g5BUJkgN@cluster1.mlebjr3.mongodb.net/CRM?retryWrites=true&w=majority&appName=Cluster1",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const audienceSchema = new mongoose.Schema({
  rules: { type: Array, required: true },
  size: { type: Number, required: true },
});

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Audience = mongoose.model("Audience", audienceSchema);
const Campaign = mongoose.model("Campaign", campaignSchema);

// Routes

// Check audience size
app.post("/check-audience-size", async (req, res) => {
  const { rules } = req.body;
  // Implement logic to calculate audience size based on rules
  const size = await calculateAudienceSize(rules);
  res.json({ size });
});

// Save audience
app.post("/save-audience", async (req, res) => {
  const { rules, size } = req.body;
  const audience = new Audience({ rules, size });
  await audience.save();

  // Implement logic to create a campaign
  const campaign = new Campaign({
    name: `Campaign for audience ${audience._id}`,
  });
  await campaign.save();

  res.status(201).json({ message: "Audience saved and campaign created" });
});

// Get past campaigns
app.get("/campaigns", async (req, res) => {
  const campaigns = await Campaign.find().sort({ createdAt: -1 });
  res.json(campaigns);
});
// Define MongoDB schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      // User exists, handle login logic (e.g., compare passwords)
      if (existingUser.password === password) {
        // Login successful
        res.json({ message: "Login successful" });
      } else {
        // Incorrect password
        res.json({ message: "Incorrect password" });
      }
    } else {
      // User does not exist
      res.json({ message: "User not found" });
    }
  } catch (error) {
    // Handle any errors
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/orders", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.send(order);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
