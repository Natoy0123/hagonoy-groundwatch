# Hagonoy GroundWatch: Environmental Awareness Platform on Land Subsidence

> **Final Course Output in Environmental Science** | 1st Semester, A.Y. 2026–2027  
> Target Municipality: **Hagonoy, Bulacan, Philippines**  
> Suggested Title: *Hagonoy GroundWatch: A Web-Based Environmental Awareness Platform on Land Subsidence*

---

## 🌊 Overview

Hagonoy GroundWatch is an open-access, civic telemetry platform designed to educate the community and policymakers about anthropogenic land subsidence in Hagonoy, Bulacan. By synthesizing satellite InSAR geodesy, geological survey data from UP-NIGS and MGB Region III, and ground-truth citizen incident reports, GroundWatch dispels common misconceptions regarding tidal flooding and highlights actionable solutions.

---

## 🚀 Key Features

* **Real-Time Telemetry Bar & KPI Matrix:** Displays peak subsidence rates (2.5–5.2 cm/yr), cumulative elevation drops (~1.14m), and tidal inundation metrics.
* **Geological Mechanics & Sunny-Day Flooding:** Explains pore water pressure depletion, clay compaction, and why coastal barangays submerge even under clear skies.
* **Interactive Leaflet Geospatial Hazard Map:** Georeferenced map centering on Hagonoy (`14.8344° N, 120.7329° E`) featuring custom markers, risk level filters (Critical, Severe, Moderate), fly-to zoom controls, and sector popups for Brgy. Pugad, Tibaguin, San Pascual, Mercado, Santa Elena, and more.
* **Aquifer Stress Simulator & Literacy Quiz:** Mathematical model simulating annual subsidence from pumping parameters, paired with an automated knowledge-check quiz.
* **Multi-Tier Mitigation Framework:** Actionable strategies categorized for Community (mangrove bioshields), Local Government (well permits, zoning), and National agencies (Bulacan Bulk Water integration).
* **Citizen Reporting Ingestion Portal:** Interactive observation form with browser localStorage persistence and Google Form prototype synchronization.
* **References (APA 7th Edition):** Fully formatted academic bibliography with direct DOIs.

---

## 🛠️ Tech Stack & Architecture

* **Frontend:** React 19 + Vite
* **Styling:** Tailwind CSS v4 (Design Tokens: Slate-50, Slate-900, Cyan-700, Amber-600, Red-600)
* **Mapping Engine:** Leaflet.js v1.9.4 with Carto Light basemap
* **Icons:** Lucide React
* **Zero AI-Slop Guarantee:** Clean, civic observatory aesthetic without generic gradients, bloated animations, or ungrounded copy.

---

## 💻 Local Development & Build

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Production Build
```bash
npm run build
```
Generates production-ready static assets in `/dist`.

### 4. Deploy to GitHub Pages (Free)
1. Push this repository to GitHub.
2. In `vite.config.js`, add `base: '/<repo-name>/'`.
3. In your GitHub repository: Go to **Settings > Pages > Source: GitHub Actions** (or deploy the `dist/` branch).

---

## 📄 Deliverables Summary

1. **Functional Website (70%):** Complete React + Vite source code and compiled static distribution (`dist/`).
2. **Project Documentation (30%):** 
   * Formatted Markdown: `docs/PROJECT_DOCUMENTATION.md`
   * Ready-to-Print Word Document: `docs/Hagonoy-GroundWatch-Project-Documentation.docx`

---

## 👥 Student Group Attribution

* **Course & Section:** Environmental Science / Section [Insert Section]
* **Instructor:** [Insert Instructor Name]
* **Submission Deadline:** November 8, 2026 (11:59 PM)
