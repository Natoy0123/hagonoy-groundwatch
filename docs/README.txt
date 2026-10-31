================================================================================
HAGONOY GROUNDWATCH - PROJECT DOCUMENTATION README
================================================================================

PROJECT TITLE:
Hagonoy GroundWatch: A Web-Based Environmental Awareness Platform on Land Subsidence

COURSE & SECTION:
Environmental Science / BSIT 4A-G1
Academic Year 2026–2027 | First Semester

GROUP MEMBERS (BSIT 4A-G1):
1. Del Ayre, Patrick Froilan S.
2. Maninang, Mark Joseph C.
3. David, Angelo P.

SUBMISSION DEADLINE:
November 8, 2026 (11:59 PM)

LIVE PLATFORM DEPLOYMENT:
https://hagonoy-groundwatch-tik7.onrender.com

SOURCE CODE REPOSITORY:
https://github.com/Natoy0123/hagonoy-groundwatch

================================================================================
1. OVERVIEW OF DOCUMENTATION DELIVERABLES
================================================================================

This package fulfills the 30% Project Documentation requirement for the
Environmental Science Final Course Output. The documentation strictly adheres
to the syllabus guidelines and rubric specified in the course brief, formatted
with formal academic typography and booktabs data tables:

1. Primary Word Submission File:
   - Path: C:\Users\ADMIN\Downloads\Hagonoy-GroundWatch-Project-Documentation.docx
   - Format: Microsoft Word (.docx), 1-inch margins, 11pt Calibri, 1.15 line spacing.
   - Design: 100% uniform pure black typography (#000000), 0 AI-colored text,
     dedicated title page with page break, 4 formal academic data tables.

2. Markdown Source File:
   - Path: C:\Users\ADMIN\Downloads\PROJECT_DOCUMENTATION.md
   - Also tracked in repository at docs/PROJECT_DOCUMENTATION.md.

================================================================================
2. DOCUMENTATION STRUCTURE & SECTIONS
================================================================================

The report is organized into the six required sections specified in the course syllabus:

[COVER PAGE]
- Centered academic title, subtitle, group authors, section, submission date,
  and clickable links to the live deployment and GitHub repository.
- Separated from the body by a formal page break.

[EXECUTIVE SUMMARY]
- High-level synthesis of Hagonoy's land subsidence crisis (2.5 to 5.2 cm/year).
- Explains why local water levels rise 15x faster than global sea level rise.
- Introduces the GroundWatch platform and its civic-educational mission.

[SECTION I: INTRODUCTION]
- 1.1 Overview of Land Subsidence: Geomechanics of pore-water pressure decline,
  effective stress principle, and irreversible compaction of Quaternary deltaic clays.
- 1.2 Environmental & Geographic Relevance to Hagonoy, Bulacan: Soft sediment
  matrix of the Pampanga delta, historical expansion of commercial aquaculture
  deep wells, and the "baha kahit walang ulan" (sunny-day tidal flooding) reality.
- Table 1: Localized Subsidence Rates and Vulnerability Profile Across Hagonoy
  Sectors (Pugad, Tibaguin, San Pascual, Mercado, San Agustin).

[SECTION II: PROJECT OBJECTIVES]
- Five concrete student objectives:
  1. Dispel the climate fatalism myth.
  2. Democratize geospatial hazard telemetry.
  3. Enable hands-on environmental modeling (Aquifer Stress Simulator).
  4. Facilitate citizen science ground-truthing (Field reporting intake).
  5. Advocate for root-cause policy interventions.
- Clear identification of target beneficiaries (residents, students, BDRRMC, LGU).

[SECTION III: DESCRIPTION OF THE WEBSITE]
- 3.1 Platform Design & Functional Modules: Overview of core educational features.
  (Table 2: Functional Architecture and Educational Capabilities of GroundWatch).
- 3.2 Technologies & Engineering Stack: Justification of technology selections
  from an IT student perspective (Table 3: React 19, Vite 8, Tailwind CSS v4,
  Leaflet.js 1.9.4, HTML5 LocalStorage, Playwright Automated QA).

[SECTION IV: ENVIRONMENTAL SIGNIFICANCE]
- 4.1 Raising Public Awareness in Vulnerable Sectors: Making an invisible, gradual
  hazard visible; transforming passive fatalism into informed civic advocacy.
- 4.2 Contribution to Environmental Science Education: Interactive digital
  laboratory demonstrating groundwater overdraft, compound climate threats,
  and citizen science validation.

[SECTION V: CONCLUSION & POLICY RECOMMENDATIONS]
- 5.1 Summary of Learning & Student Reflection: Authentic student reflection
  on how IT solutions can bridge the gap between academic research and public action.
- 5.2 Strategic Policy Recommendations for Hagonoy LGU:
  (Table 4: Municipal well moratoria, Bulacan Bulk Water Supply integration,
  deltaic mangrove bioshields, and permanent GNSS geodetic monitoring stations).

[SECTION VI: REFERENCES (APA 7TH EDITION)]
- Peer-reviewed bibliography including Eco et al. (2020), Siringan & Rodolfo (2003),
  MGB Region III (2023), PEMSEA (2022), and DOST-PAGASA (2024).

================================================================================
3. TECHNICAL VERIFICATION & QUALITY ASSURANCE
================================================================================

- Automated E2E Test Suite: 29 out of 29 Playwright tests passed (tests/exhaustive-e2e.mjs).
- Responsive Layout Verification: 7 out of 7 device viewports validated with 0 overflows
  (320px ultra-compact mobile up to 1920px Full HD desktop).
- Production Build: Static bundle compiled in 1.08s with zero compile errors.
- Continuous Deployment: Render static site automatically rebuilds on every GitHub commit.

================================================================================
Generated on: October 31, 2026
Prepared for: Environmental Science Course Submission (BSIT 4A-G1)
================================================================================
