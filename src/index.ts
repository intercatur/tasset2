import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// === Setup EJS (pakai ekstensi .html) ===
app.engine("html", ejs.renderFile); // pakai ejs untuk file .html
app.set("view engine", "html");
app.set("views", path.join(__dirname, "../components")); // tempat file html kamu

// === Public folder untuk CSS & gambar ===
app.use(express.static(path.join(__dirname, "../public")));

// === Home ===
app.get("/", (req, res) => {
  res.render("home.html", {
    title: "Home Page",
    message: "Welcome to Express + TypeScript + EJS 😎",
  });
});

// === About ===
app.get("/about", (req, res) => {
  res.render("about.html", {
    title: "About Us",
    message: "This page is rendered by EJS (but saved as .htm)",
  });
});

// === API JSON ===
app.get("/api-data", (req, res) => {
  res.json({
    message: "Here is some sample API data",
    items: ["apple", "banana", "cherry"],
  });
});

// === Health check ===
app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

const port = 3000;
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});

export default app;
