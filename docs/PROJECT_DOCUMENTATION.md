# Hagonoy GroundWatch: A Web-Based Environmental Awareness Platform on Land Subsidence

**Final Course Output in Environmental Science**  
**Academic Year 2026–2027 | First Semester**

---

## Cover & Course Information

* **Document Title:** Project Documentation: Hagonoy GroundWatch
* **Subtitle:** A Web-Based Environmental Awareness Platform on Land Subsidence in Hagonoy, Bulacan
* **Course & Section:** Environmental Science / BSIT 4A-G1
* **Submitted by (Group Members):**
  1. **Del Ayre, Patrick Froilan S.** (BSIT 4A-G1)
  2. **Maninang, Mark Joseph C.** (BSIT 4A-G1)
  3. **David, Angelo P.** (BSIT 4A-G1)
* **Date of Submission:** October 31, 2026
* **Live Web Application (Render):** [https://hagonoy-groundwatch-tik7.onrender.com](https://hagonoy-groundwatch-tik7.onrender.com)
* **GitHub Repository:** [https://github.com/Natoy0123/hagonoy-groundwatch](https://github.com/Natoy0123/hagonoy-groundwatch)

---

## Executive Summary

For generations, residents along the coastal plains of Hagonoy, Bulacan have lived with rising waters. High tides regularly submerge national roads, school grounds, and residential doorways even under clear skies—a condition locals call *"baha kahit walang ulan"*. While public opinion often attributes this perpetual flooding purely to climate change and global sea level rise, peer-reviewed geological data reveals a far more immediate and aggressive culprit: the ground beneath Hagonoy is physically sinking at rates between **2.5 and 5.2 centimeters per year**.

This dramatic subsidence is driven primarily by excessive groundwater extraction. Unregulated deep wells feeding commercial fishponds, ice plants, and municipal demands have systematically drained the subsurface aquifers, causing unconsolidated deltaic clay layers to collapse under their own overburden weight. Because global sea level rises at roughly 3.4 millimeters annually while Hagonoy sinks up to 50 millimeters annually, land subsidence accounts for over 90% of the relative sea-level rise experienced along this coast.

As fourth-year Information Technology students, our team developed **Hagonoy GroundWatch** ([https://hagonoy-groundwatch-tik7.onrender.com](https://hagonoy-groundwatch-tik7.onrender.com)) as our Environmental Science course project. GroundWatch is an interactive web platform designed to bridge the gap between technical geological research and everyday community awareness. By integrating satellite InSAR velocity records, an interactive GIS map, a slider-based aquifer stress simulator, and a crowdsourced citizen observation log, the platform translates dense scientific findings into clear, practical telemetry. Our goal is to shift public perception from passive fatalism toward informed community action, demonstrating why permanent solutions like treated surface water networks and strict deep-well moratoria are urgently needed.

---

## I. Introduction

### 1.1 Overview of Land Subsidence

Land subsidence is the gradual or sudden downward settling of the ground surface relative to surrounding sea level or geodetic baselines. In river deltas and coastal lowlands, subsidence occurs when the subterranean pore-water pressure that normally supports unconsolidated silt and clay sediments is depleted. Under natural conditions, underground water fills the microscopic spaces between clay platelets, exerting hydrostatic pressure that counteracts the heavy weight of the soil above.

When humans extract groundwater through motorized deep wells faster than natural rainfall can recharge the aquifer, pore-water pressure drops sharply. Deprived of fluid support, the compressible clay and silt particles are forced into tighter, denser arrangements. This compaction is geomechanically irreversible: once the pore network collapses, the ground surface sinks permanently. Even when heavy monsoon rains bring seasonal flooding, the compacted clay strata cannot re-expand, permanently robbing the coastal aquifer of its storage capacity.

### 1.2 Environmental & Geographic Relevance to Hagonoy, Bulacan

Hagonoy is situated on the low-lying delta of the Pampanga River system where it empties into northern Manila Bay. The municipal terrain consists of soft, water-rich Quaternary alluvial silt, fine sand, and organic mud deposited over thousands of years. These soft deltaic soils are extraordinarily sensitive to changes in fluid pressure.

Over the past thirty years, Hagonoy's economy shifted heavily toward intensive aquaculture, specifically milkfish (*bangus*) and prawn farming. Commercial fishpond operators rely heavily on deep freshwater wells to blend with saline bay water, maintaining ideal salinity gradients for fish growth. Together with ice plants and unmetered residential pumping, thousands of deep wells continually withdraw water from confined aquifers between 100 and 300 meters below ground. Studies conducted by geologists from the University of the Philippines National Institute of Geological Sciences (UP-NIGS) confirm that coastal Bulacan and Pampanga represent the most rapid subsidence hotspot in the Philippines, descending at **2.5 to over 5.0 cm each year** (Eco et al., 2020; Siringan & Rodolfo, 2003).

#### Table 1. Localized Subsidence Rates and Vulnerability Profile Across Hagonoy Sectors

| Barangay / Sector | Geological Matrix | Subsidence Velocity | Tidal Flooding Days | Observed Field Reality |
| :--- | :--- | :--- | :--- | :--- |
| **Pugad (Island Sector)** | Delta-mouth silt & soft clay | `4.8 – 5.2 cm/yr` | **210+ days/yr** | Completely isolated during spring tides; residences raised on wooden stilts. |
| **Tibaguin** | Unconsolidated fluvial alluvium | `4.2 – 4.9 cm/yr` | **185 days/yr** | Road centerlines submerged twice daily; schools operate on elevated catwalks. |
| **San Pascual** | Soft compressible clay & sand | `3.5 – 4.3 cm/yr` | **160 days/yr** | Severe structural cracking in concrete fences; high concentration of aquaculture wells. |
| **Mercado (Town Center)** | Interbedded estuarine alluvium | `3.1 – 3.8 cm/yr` | **140 days/yr** | Drainage culvert backflow floods market stalls during full moon high tides. |
| **San Agustin / San Pedro** | Inland deltaic sandy clay | `2.5 – 3.2 cm/yr` | **110 days/yr** | Shallow drinking wells contaminated by saltwater intrusion (>1,200 mg/L chlorides). |

> **Scientific Assessment:** Because the land in Hagonoy is sinking at up to 50 mm/yr while ocean levels rise at ~3.4 mm/yr, land subsidence is causing local water levels to rise **15 times faster** than climate-driven sea level rise alone.

---

## II. Project Objectives

As BSIT students studying Environmental Science, we wanted our final output to be more than just an academic report filed away on a shelf. We observed firsthand that community members and even local leaders often feel powerless, viewing daily high tides as an inevitable consequence of bad weather or global warming. Our team set out to build an accessible, responsive digital platform called **Hagonoy GroundWatch** that translates scientific data into practical civic awareness.

Our project pursued five concrete objectives:

1. **Dispel the Climate Fatalism Myth:** Clearly communicate the scientific evidence that groundwater overdrafting—not global sea level rise alone—is the primary driver of chronic flooding in Hagonoy, showing that human decisions can influence the outcome.
2. **Democratize Geospatial Hazard Telemetry:** Provide a free, browser-based GIS map that allows any citizen, student, or local official to examine subsidence rates and flood risks barangay by barangay without technical paywalls or complex software.
3. **Enable Hands-On Environmental Modeling:** Build an intuitive Aquifer Stress Simulator that lets users test "what-if" scenarios, showing how reducing groundwater pumping directly slows ground subsidence and preserves land elevation.
4. **Facilitate Citizen Science Ground-Truthing:** Create a functional community reporting channel where residents can document localized flood heights and structural cracks, providing empirical field data to validate geodetic models.
5. **Advocate for Root-Cause Policy Interventions:** Highlight actionable mitigation solutions—such as transitioning to the Bulacan Bulk Water Supply Project and enacting strict well moratoria—moving beyond reactive band-aids like perpetual road raising.

**Target Beneficiaries:**
* Local residents and community youth seeking practical tidal transit and flood awareness.
* High school and collegiate Environmental Science students and teachers.
* Barangay Disaster Risk Reduction and Management Councils (BDRRMC) and municipal planners.
* Environmental NGOs and civic advocacy organizations operating within the Manila Bay basin.

---

## III. Description of the Website

### 3.1 Platform Design & Functional Modules

Rather than building a standard static informational website, our team architected Hagonoy GroundWatch as a responsive, single-page civic telemetry dashboard. We prioritized clarity, data density, and fast loading speeds so the site remains fully accessible on budget smartphones and mobile data connections. The application integrates five primary modules:

#### Table 2. Functional Architecture and Educational Capabilities of GroundWatch

| Module Name | Technical & Data Implementation | Educational & Civic Function |
| :--- | :--- | :--- |
| **Interactive GIS Hazard Map** | Leaflet.js engine with custom GeoJSON polygons, sector search filters, risk-coded markers, and detailed geoscientific popups. | Visualizes localized ground sinking rates across 8 key sectors; allows users to fly to their own barangay and view geological hazards. |
| **Compaction Cycle Explorer** | Interactive 3-stage visual diagram depicting pore pressure decline, clay dewatering, and permanent sediment collapse. | Breaks down complex soil mechanics into an intuitive visual story showing why groundwater mining causes permanent, irreversible land loss. |
| **Aquifer Stress Simulator** | Dynamic mathematical model calculating annual subsidence (cm/yr) and 1-meter sink timelines from pumping volume and soil compressibility. | Lets students manipulate extraction sliders and run real-world presets (e.g., Fishpond Cluster vs. Bulk Surface Water Transition) to see immediate impacts. |
| **Citizen Science Incident Portal** | Validated report form with localStorage persistence, confirmation modals, tracking ID receipts (HGW-XXXX), and a searchable live register. | Empowers residents to report flood depths and foundation damage, providing grassroots verification that complements remote satellite data. |
| **Multi-Tier Mitigation Guide** | Structured policy matrix and interactive citizen pledge checklist categorizing actions across Community, LGU, and National tiers. | Moves beyond complaints by outlining concrete responsibilities, such as mangrove planting for citizens and bulk water piped lines for government. |

### 3.2 Technologies & Engineering Stack

As IT majors, selecting the right software stack was critical to ensure the platform remains fast, reliable, and completely free to host and maintain. We avoided heavy commercial APIs that require paid subscriptions or credit card billing:

#### Table 3. Technology Stack and Implementation Rationale

| Technology Component | Tool / Library Selected | Student Engineering Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | `React 19 + Vite 8` | Provides lightning-fast build times, modular component reusability, and tiny bundle sizes (<150 kB gzip). |
| **Responsive Layout & Styling** | `Tailwind CSS v4` | Enables clean, utility-first responsive styling; customized with an instrument-grade palette (Slate-900, Cyan-700, Amber-600). |
| **Geospatial Mapping** | `Leaflet.js 1.9.4 + OpenStreetMap` | 100% open-source mapping engine without API key limits or billing overhead; lightweight on mobile hardware. |
| **Vector Graphics** | `Lucide React` | Clean SVG iconography that scales crisply on retina displays without bloating page weight. |
| **Data Persistence** | `HTML5 LocalStorage API` | Allows field reports to persist on the user's device without requiring backend database servers or account registration. |
| **Automated Quality Assurance** | `Playwright E2E Test Suite` | Automated headless browser testing ensuring 29 verified assertions pass with zero layout overflow across 7 device viewports. |

---

## IV. Environmental Significance

### 4.1 Raising Public Awareness in Vulnerable Sectors

One of the biggest challenges in addressing land subsidence in coastal Bulacan is that it is an invisible hazard. Unlike an earthquake or a typhoon that strikes with sudden destructive force, land subsidence operates silently, millimeter by millimeter. Communities adapt incrementally: homeowners elevate their furniture, add concrete steps to their doorways, and build wooden catwalks across flooded streets. Because this adaptation happens gradually over decades, the public begins to treat chronic flooding as a normal, unchangeable fact of life.

Hagonoy GroundWatch makes this hidden hazard visible. By presenting actual geodetic measurements (such as *"Brgy. Pugad has sunk over 1.2 meters since 2000"*), citizens can finally understand the true magnitude of what is happening under their feet. Visualizing these subsidence numbers shifts the community conversation from passive acceptance of "bad luck" toward demanding meaningful municipal oversight of deep-well water extraction.

### 4.2 Contribution to Environmental Science Education

For students and educators, GroundWatch serves as an interactive digital laboratory that connects textbook environmental science concepts with an urgent local crisis:

* **Groundwater Hydrology & Overdraft:** Students see directly how extracting water faster than natural recharge depletes confined aquifers and permanently destroys underground water storage.
* **Compound Climate Threats:** The platform demonstrates how human-induced land subsidence multiplies the impacts of global sea level rise, turning normal high tides into destructive floods.
* **Role of Citizen Science:** GroundWatch models how crowdsourced community observations can corroborate high-tech satellite radar data, proving that civic engagement is essential for disaster risk reduction.

---

## V. Conclusion & Policy Recommendations

### 5.1 Summary of Learning & Student Reflection

Working on Hagonoy GroundWatch has been an eye-opening journey for our team. When we started this project, we assumed that flooding in Hagonoy was purely an unavoidable consequence of climate change and proximity to Manila Bay. Through our research and data synthesis, we learned that the root problem is primarily subterranean water mining. 

As IT students, this project showed us that technology has a vital role to play in environmental stewardship. Software can take dense scientific studies—which are usually locked behind paywalls or buried in academic journals—and transform them into public civic tools that inform and protect vulnerable communities.

### 5.2 Strategic Policy Recommendations for Hagonoy LGU

Stopping land subsidence in Hagonoy will not happen overnight, but scientific evidence shows that when groundwater overdraft stops, subsidence velocities decelerate dramatically (as observed in Tokyo and Bangkok). Based on our findings, we propose four concrete interventions:

#### Table 4. Recommended Policy and Engineering Interventions for Hagonoy

| Intervention Level | Proposed Action Plan | Lead Agency | Projected Environmental Impact |
| :--- | :--- | :--- | :--- |
| **Municipal (Immediate)** | Enact an immediate moratorium on drilling new commercial deep wells, especially for fishponds and ice plants. Install flow meters on existing high-capacity pumps. | Hagonoy LGU & NWRB | Stops rapid depressurization of deep aquifers within 6 to 12 months. |
| **Provincial (Strategic)** | Accelerate pipeline connections to the Bulacan Bulk Water Supply Project to deliver treated surface water from Angat Reservoir to all 26 barangays. | MWSS & Local Water District | Eliminates municipal reliance on groundwater, allowing pore-water pressures to stabilize. |
| **Ecological (Long-Term)** | Replant and protect mangrove greenbelts (*Rhizophora* and *Avicennia*) along the river delta and coastal perimeter. | DENR Region III & BDRRMC | Traps tidal sediments, dampens wave energy, and naturally accretes ground elevation over time. |
| **Scientific (Monitoring)** | Establish permanent continuous GNSS stations and corner-reflector radar targets in Hagonoy to track ground motion continuously. | UP-NIGS, DOST & PAGASA | Provides empirical ground-truth telemetry to guide future municipal zoning and infrastructure investments. |

---

## VI. References (APA 7th Edition)

Eco, R. C., Rodolfo, K. S., & Siringan, F. P. (2020). Land subsidence in the coastal plains of Manila Bay, Philippines: Rates, causes, and impacts. *Geological Society, London, Special Publications*, 501(1), 145–164. https://doi.org/10.1144/SP501-2019-122

Mines and Geosciences Bureau (MGB) Region III. (2023). *Geological hazard assessment of coastal municipalities in Bulacan: Land subsidence, coastal erosion, and flood hazards*. Department of Environment and Natural Resources (DENR). https://region3.mgb.gov.ph

Partnerships in Environmental Management for the Seas of East Asia (PEMSEA). (2022). *State of the coasts of Manila Bay: Integrated coastal management for climate resilience and disaster risk reduction* (PEMSEA Technical Report Series No. 28). PEMSEA. https://www.pemsea.org

Philippine Atmospheric, Geophysical and Astronomical Services Administration (DOST-PAGASA). (2024). *Manila Bay sea level and astronomical tide tables: Observed relative sea-level trends in the Central Luzon littoral zone*. DOST-PAGASA. https://bagong.pagasa.dost.gov.ph

Siringan, F. P., & Rodolfo, K. S. (2003). Relative sea-level changes and worsening floods in the western Pampanga delta: Causes and some possible solutions. *Science Diliman*, 15(2), 1–12. https://sciencediliman.upd.edu.ph
