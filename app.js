// app.js
const express = require("express");
const app = express();
const path = require("path");


// Working hours middleware (Mon–Fri, 9am–5pm)
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 6=Sat
  const hour = now.getHours();

  if (day === 0 || day === 6 || hour < 4 || hour >= 17) {
    return res.send("<h1>Service unavailable: Only available Mon-Fri, 9am–5pm</h1>");
  }
  next();
};

// Set view engine and public folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Apply middleware
app.use(workingHoursMiddleware);


// Routes
app.get("/", (req, res) => res.render("index"));
app.get("/services", (req, res) => res.render("services"));
app.get("/contact", (req, res) => res.render("contact"));
app.get("/blog", (req, res) => {
  const blogs = [
    { title: "My Cloud Journey", content: "Exploring AWS, Azure, and GCP." },
    { title: "The Future of Tech", content: "AI, Blockchain, and Cybersecurity." },
    { title: "UI Trends 2025", content: "Glassmorphism, Neumorphism, and Beyond." },
    { title: "Freelancing Tips", content: "How I built my brand online." },
    { title: "Productivity Hacks", content: "Balancing tech, school, and life." },
  ];
  res.render("blog", { blogs });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}`);
});
