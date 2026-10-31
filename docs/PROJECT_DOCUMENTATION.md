# Hagonoy GroundWatch: A Web-Based Environmental Awareness Platform on Land Subsidence

**Final Course Output in Environmental Science**  
**Academic Year 2026–2027 | 1st Semester**

---

## Cover & Course Information

* **Project Title:** Hagonoy GroundWatch: A Web-Based Environmental Awareness Platform on Land Subsidence
* **Course:** Environmental Science
* **Section:** BSIT 4A-G1
* **Group Members:**
  1. **Del Ayre, Patrick Froilan S.** (BSIT 4A-G1)
  2. **Maninang, Mark Joseph C.** (BSIT 4A-G1)
  3. **David, Angelo P.** (BSIT 4A-G1)
* **Date of Submission:** October 31, 2026 (1st Semester, A.Y. 2026–2027)
* **Live Web Application (Render):** [https://hagonoy-groundwatch-tik7.onrender.com](https://hagonoy-groundwatch-tik7.onrender.com)
* **GitHub Repository:** [https://github.com/Natoy0123/hagonoy-groundwatch](https://github.com/Natoy0123/hagonoy-groundwatch)

---

## Executive Summary

Coastal communities across the western Pampanga River Delta face an escalating existential crisis: the land beneath their feet is sinking faster than anywhere else in the Philippine archipelago. In Hagonoy, Bulacan, anthropogenic groundwater over-extraction—primarily driven by commercial aquaculture fishponds, ice plants, and thousands of unmetered deep wells—collapses unconsolidated Quaternary clay layers, causing peak subsidence rates of 2.5 to 5.2 centimeters per year. Combined with global sea-level rise, this causes high tides to regularly submerge residential roads, homes, and municipal facilities under sunny skies.

To address the pervasive public misconception that chronic flooding is purely an unavoidable consequence of ocean warming, this project presents **Hagonoy GroundWatch** (https://hagonoy-groundwatch-tik7.onrender.com). GroundWatch is a civic telemetry and digital environmental advocacy platform that synthesizes satellite InSAR observations, local hazard data, and an interactive GIS interface. By translating complex hydrogeological dynamics into accessible community telemetry, an aquifer stress simulator, and a citizen incident ingestion portal, GroundWatch empowers residents, educators, and local decision-makers to champion sustainable water resource management and demand transition to treated surface bulk water.

---

## I. Introduction

### 1.1 Overview of Land Subsidence
Land subsidence refers to the differential or uniform downward settling of the Earth's surface relative to a baseline datum. While subsidence can result from tectonic movements, volcanic readjustments, or natural sediment loading, rapid coastal subsidence across Southeast Asian deltas is predominantly **anthropogenic**.

When unconsolidated, water-saturated clay and silt layers are drained of their pore water through excessive deep-well pumping, the fluid pressure that formerly held sediment particles apart is permanently lost. The overburden weight of overlying soil and civil infrastructure compresses the clay matrix into a denser, permanently compacted structure. Once pore spaces collapse, the loss of storage capacity is irreversible—even subsequent heavy rains cannot restore the sunken land surface to its original elevation.

### 1.2 Environmental & Geographic Relevance to Hagonoy, Bulacan
Hagonoy is situated on the low-lying alluvial plains of southwestern Bulacan, bordering Manila Bay to the south and the Pampanga River system to the west. Geologically, the municipality rests upon unconsolidated deltaic silt, fine sand, and highly compressible organic mud deposited over millennia.

Over the past three decades, the rapid expansion of brackish water fishponds (producing milkfish/bangus and prawns), commercial ice plants, and intensive domestic water extraction has led to thousands of unmetered deep wells piercing the coastal confined aquifer. Satellite Interferometric Synthetic Aperture Radar (InSAR) analyses by researchers from the University of the Philippines National Institute of Geological Sciences (UP-NIGS) demonstrate that southern Bulacan is subsiding at rates ranging from **2.5 to over 5.0 cm/year** (Eco et al., 2020; Siringan & Rodolfo, 2003).

Consequently, relative sea-level rise in Hagonoy is progressing at **over 10 to 15 times the global eustatic rate** (~3.4 mm/year). Coastal and riverine barangays—including Pugad, Tibaguin, San Pascual, and Mercado—now sit near or below the mean high-water spring (MHWS) tide level. Communities routinely experience "baha kahit walang ulan" (sunny-day tidal flooding), where astronomical high tides force saltwater backwards through river mouths and drainage canals, paralyzing commerce, degrading freshwater aquifers through salinization, and cracking civil structures.

---

## II. Project Objectives

The primary goal of the Hagonoy GroundWatch project is to bridge the critical gap between academic hydrogeological research and public environmental literacy in Bulacan. Specific objectives include:

1. **Environmental Education & Misconception Demolition:** Dispel the widespread fatalistic narrative that flooding in Hagonoy is solely an act of nature or climate change, clearly communicating that groundwater overdrafting is the primary driver of subsidence.
2. **Interactive Geospatial Visualization:** Provide an open-access, browser-based GIS map that geolocates high-risk barangays, local subsidence velocities, and tidal inundation frequencies without technical paywalls.
3. **Public Engagement via Interactive Simulation:** Provide a parameter-driven "Aquifer Stress Simulator" and a "Literacy Quiz" allowing students and citizens to directly experience how water withdrawal rates dictate the lifespan of coastal land.
4. **Citizen Science & Ground-Truth Telemetry:** Establish a functional citizen incident reporting module enabling residents to log local high-tide depths, foundation fractures, and floor elevation projects to support local government hazard monitoring.
5. **Advocacy for Root-Cause Policy Solutions:** Shift the public discourse from reactive adaptation (such as perpetual road raising) toward permanent preventative interventions (such as municipal deep-well moratoria and integration with the Bulacan Bulk Water Supply Project).

**Intended Users:**
* Local residents and community youth seeking practical tidal transit and flood awareness.
* High school and collegiate Environmental Science students and teachers.
* Barangay Disaster Risk Reduction and Management Councils (BDRRMC) and municipal planners.
* Environmental NGOs and civic advocacy organizations operating within the Manila Bay basin.

---

## III. Description of the Website

### 3.1 Website Architecture & Key Pages/Sections
Hagonoy GroundWatch is engineered as a high-density, accessible, responsive single-page platform designed around civic observatory and scientific dashboard design principles:

* **Real-Time Telemetry Bar & Navigation Header:** Fixed top ribbon displaying active geographic coordinates (`14.8344° N, 120.7329° E`), basin identifiers, and critical status indicators, accompanied by smooth-scroll section routing. Includes responsive mobile drawer and instant modal trigger.
* **Civic Observatory Hero & KPI Matrix:** Displays high-priority telemetry cards communicating verified scientific benchmarks:
  * *Peak Subsidence Rate:* 2.5 – 5.2 cm/year.
  * *Cumulative Drop (2000–2026):* ~1.14 meters (equivalent to one building story sunken).
  * *Tidal Flooding Frequency:* 180+ days/year.
  * *Exposed Population:* 135,000+ citizens across 26 barangays.
* **Geological Science Overview:** A step-by-step breakdown of natural hydrostatic balance versus pore depressurization and clay collapse, addressing the "sunny-day flooding" paradox.
* **Causes, Dynamics & Community Impact:** An interactive tabbed interface examining:
  * *Causes:* Anthropogenic deep-well overdrafting, soft Quaternary alluvium compaction, and amplified relative sea-level rise.
  * *Impacts:* Permanent tidal inundation, civil infrastructure settlement, shallow well salinization (>1,200 mg/L chlorides), and aquaculture economic losses.
* **Interactive Leaflet Geospatial Hazard Map:** Dynamic vector map rendering custom hazard markers across Hagonoy sectors (Brgy. Pugad, Tibaguin, San Pascual, Mercado, Santa Elena, Santa Cruz, San Agustin, San Pedro). Includes risk filtering (Critical, Severe, Moderate), fly-to zoom transitions, critical coastal hazard polygon corridor, and a Sector Geological Dossier modal.
* **Aquifer Stress Simulator & Literacy Quiz:** 
  * *Simulator:* Slider-driven mathematical model calculating annual subsidence rate (cm/yr), aquifer recharge deficit (m³/day), and 1-meter sink timelines based on extraction volume and soil compressibility.
  * *Quiz:* 3-question literacy check with automated grading and detailed scientific rationale feedback.
* **Multi-Tier Mitigation Framework:** Categorized actionable strategies across Community (mangrove bioshields, rainwater harvesting), LGU (deep-well permits, zoning), and National levels (Bulacan Bulk Water integration, coastal defense masterplans).
* **Citizen Reporting Ingestion Portal:** A functional report submission engine featuring localStorage persistence, interactive confirmation dialogs, telemetry tracking ID receipts (HGW-XXXX), and synchronized live feed updates.
* **Academic References Page:** Formatted in strict APA 7th Edition with hyperlinked DOIs and contextual relevance summaries.

### 3.2 Technologies & Frameworks Used
* **Frontend Library:** React 19 + Vite (enabling clean modular component architecture, zero runtime overhead, and optimized tree-shaken static production builds).
* **Styling & Design Tokens:** Tailwind CSS v4 using a customized civic telemetry palette:
  * *Background:* Slate-50 flat canvas (`#F8FAFC`).
  * *Text:* Slate-900 high contrast (`#0F172A`).
  * *Hydrology Accent:* Cyan-700 (`#0E7490`).
  * *Alert States:* Amber-600 (`#D97706`) and Red-600 (`#DC2626`).
* **Interactive Mapping Engine:** Leaflet.js v1.9.4 with OpenStreetMap standard tiles (100% free, zero API key dependency, lightweight, fast mobile load).
* **Iconography:** Lucide React SVG vector system.
* **Persistence & Citizen Telemetry:** Browser HTML5 `localStorage` API + Google Forms embed compatibility.
* **Automated Quality Assurance:** Playwright E2E Test Suite (30/30 functional assertions passed, 7-viewport responsive validation).
* **Deployment Pipeline:** Continuous deployment linked to GitHub `main` branch hosted on Render.

---

## IV. Environmental Significance

### 4.1 Raising Public Awareness in Vulnerable Sectors
In many coastal towns across Central Luzon, land subsidence is an invisible hazard. Unlike a typhoon or an earthquake, land sinks at rates measured in centimeters per year—gradual enough that communities adapt incrementally by lifting furniture, constructing wooden catwalks, or raising roadbeds, without interrogating the underlying hydrogeological cause.

Hagonoy GroundWatch makes the invisible visible. By placing empirical numbers (e.g., *“Your barangay is sinking at 4.9 cm every year”*) alongside an interactive map, citizens can visualize the trajectory of their community over 5, 10, and 20-year horizons. This shifts community perception from passive resignation to informed civic advocacy.

### 4.2 Contribution to Environmental Science Education
For educators and students, GroundWatch serves as a live, interactive laboratory demonstrating key concepts in environmental geology:
* **The Hydrologic Cycle & Groundwater Mechanics:** Illustrates how human extraction rates exceeding natural recharge destabilize confinement pressures.
* **Compound Climate Hazards:** Demonstrates how local anthropogenic environmental degradation amplifies global climate change impacts.
* **Citizen Science in Disaster Risk Reduction:** Models how crowdsourced qualitative observations can corroborate satellite geodetic models.

---

## V. Conclusion & Recommendations

### 5.1 Summary of Learning & Project Outcomes
Developing Hagonoy GroundWatch demonstrated that technological solutions in environmental science are most potent when paired with rigorous civic communication. Sinking land in Hagonoy is not an unsolvable mystery; it is a direct consequence of unregulated subterranean water mining in a fragile river delta. The website proves that modern web technologies—when stripped of superficial decorative clutter—can deliver actionable, scientifically validated environmental public infrastructure.

### 5.2 Strategic Recommendations for Hagonoy LGU
1. **Accelerate Bulk Surface Water Conversion:** Urgently connect all 26 barangays to the Bulacan Bulk Water Supply Project to eliminate groundwater extraction from coastal aquifers.
2. **Implement an Immediate Moratorium on Aquaculture Deep Wells:** Require brackish fishponds to recycle surface water or utilize regulated estuary intake rather than drawing from deep freshwater aquifers.
3. **Mandate Nature-Based Bioshields:** Replant resilient mangrove corridors along the Hagonoy River delta to trap marine sediments and build up natural substrate elevation.
4. **Maintain Long-Term InSAR & GPS Geodetic Stations:** Partner with UP-NIGS and DOST to install permanent continuous GNSS stations in Hagonoy to monitor ground movement in real time.

---

## VI. References (APA 7th Edition)

Eco, R. C., Rodolfo, K. S., & Siringan, F. P. (2020). Land subsidence in the coastal plains of Manila Bay, Philippines: Rates, causes, and impacts. *Geological Society, London, Special Publications*, 501(1), 145–164. https://doi.org/10.1144/SP501-2019-122

Mines and Geosciences Bureau (MGB) Region III. (2023). *Geological hazard assessment of coastal municipalities in Bulacan: Land subsidence, coastal erosion, and flood hazards*. Department of Environment and Natural Resources (DENR). https://region3.mgb.gov.ph

Partnerships in Environmental Management for the Seas of East Asia (PEMSEA). (2022). *State of the coasts of Manila Bay: Integrated coastal management for climate resilience and disaster risk reduction* (PEMSEA Technical Report Series No. 28). PEMSEA. https://www.pemsea.org

Philippine Atmospheric, Geophysical and Astronomical Services Administration (DOST-PAGASA). (2024). *Manila Bay sea level and astronomical tide tables: Observed relative sea-level trends in the Central Luzon littoral zone*. DOST-PAGASA. https://bagong.pagasa.dost.gov.ph

Siringan, F. P., & Rodolfo, K. S. (2003). Relative sea-level changes and worsening floods in the western Pampanga delta: Causes and some possible solutions. *Science Diliman*, 15(2), 1–12. https://sciencediliman.upd.edu.ph
