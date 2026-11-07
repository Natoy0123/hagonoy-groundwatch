export const TELEMETRY_STATS = [
  {
    id: "subsidence-rate",
    label: "Peak Subsidence Rate",
    value: "2.5 – 5.2",
    unit: "cm / year",
    change: "+18% over 10-yr baseline",
    status: "critical",
    source: "UP-NIGS / InSAR Analysis (2020)"
  },
  {
    id: "cumulative-drop",
    label: "Cumulative Drop (2000–2026)",
    value: "~1.14",
    unit: "meters",
    change: "Equivalent to 1 story sunken",
    status: "severe",
    source: "MGB Region III Geological Survey"
  },
  {
    id: "high-tide-flooding",
    label: "Tidal Inundation Frequency",
    value: "180+",
    unit: "days / year",
    change: "Daily during monsoon syzygy",
    status: "critical",
    source: "DOST-PAGASA Astronomical Data"
  },
  {
    id: "population-exposed",
    label: "Residents in Hazard Zones",
    value: "135,000+",
    unit: "citizens",
    change: "Across 26 barangays",
    status: "warning",
    source: "PSA Hagonoy Census Data"
  }
];

export const HAGONOY_BARANGAYS = [
  {
    name: "Pugad",
    coords: [14.7831, 120.6974],
    risk: "Critical",
    rateCmYear: 5.2,
    elevationM: -0.4,
    floodDaysYear: 240,
    primaryDriver: "Fishpond deep-well pumping & coastal tidal surge",
    impactNotes: "Isolated island barangay; school pathways elevated on stilts; daily submersion during high tide."
  },
  {
    name: "Tibaguin",
    coords: [14.7952, 120.7042],
    risk: "Critical",
    rateCmYear: 4.9,
    elevationM: -0.2,
    floodDaysYear: 220,
    primaryDriver: "Commercial aquaculture extraction & fine sediment compaction",
    impactNotes: "Residents repeatedly elevate concrete floors by 0.5m every 3–5 years."
  },
  {
    name: "San Pascual",
    coords: [14.8105, 120.7188],
    risk: "Severe",
    rateCmYear: 4.1,
    elevationM: 0.2,
    floodDaysYear: 185,
    primaryDriver: "Domestic well proliferation & mangrove loss",
    impactNotes: "Saltwater intrusion has rendered local shallow aquifers brackish and non-potable."
  },
  {
    name: "Mercado (Poblacion)",
    coords: [14.8344, 120.7329],
    risk: "Severe",
    rateCmYear: 3.6,
    elevationM: 0.5,
    floodDaysYear: 140,
    primaryDriver: "High municipal water demand & dense commercial infrastructure loading",
    impactNotes: "Town center drainage gates backflow during Manila Bay high tides."
  },
  {
    name: "Santa Elena",
    coords: [14.8421, 120.7285],
    risk: "Severe",
    rateCmYear: 3.7,
    elevationM: 0.4,
    floodDaysYear: 155,
    primaryDriver: "Riverbank silt compaction and localized pumping",
    impactNotes: "Hagonoy River overflow combines with tidal backflow; bridge clearances reduced."
  },
  {
    name: "Santa Cruz",
    coords: [14.8210, 120.7412],
    risk: "Severe",
    rateCmYear: 3.9,
    elevationM: 0.3,
    floodDaysYear: 170,
    primaryDriver: "Aquaculture nursery wells and compaction of quaternary alluvium",
    impactNotes: "Major access roads regularly impassable to light vehicles during full moon tides."
  },
  {
    name: "San Agustin",
    coords: [14.8512, 120.7450],
    risk: "Moderate",
    rateCmYear: 2.8,
    elevationM: 1.1,
    floodDaysYear: 80,
    primaryDriver: "Perimeter residential aquifer withdrawal",
    impactNotes: "Flooding concentrated during major typhoons and sustained monsoon rains."
  },
  {
    name: "San Pedro",
    coords: [14.8625, 120.7580],
    risk: "Moderate",
    rateCmYear: 2.4,
    elevationM: 1.6,
    floodDaysYear: 45,
    primaryDriver: "Agricultural irrigation in upper delta",
    impactNotes: "Lower subsidence rate, but serves as primary evacuation route corridor."
  }
];

export const ALL_HAGONOY_BARANGAY_NAMES = [
  "Pugad",
  "Tibaguin",
  "San Pascual",
  "Mercado (Poblacion)",
  "Santa Elena",
  "Santa Cruz",
  "San Agustin",
  "San Pedro",
  "Abulalas",
  "Carillo",
  "Iba",
  "Iba-Ibayo",
  "Palapat",
  "Sagrada Familia",
  "San Isidro",
  "San Jose",
  "San Juan",
  "San Miguel",
  "San Nicolas",
  "San Roque",
  "San Sebastian",
  "Santa Monica",
  "Santo Niño (Poblacion)",
  "Santo Rosario",
  "Sto. Cristo",
  "Tampok"
];

export const CAUSES_DATA = [
  {
    id: "groundwater",
    title: "Excessive Groundwater Pumping",
    category: "Anthropogenic Driver (Primary)",
    severity: "Critical",
    metric: "~85% of total subsidence rate",
    summary: "Heavy extraction of deep aquifers by commercial aquaculture, ice plants, and unregulated domestic submersible pumps lowers subsurface pore water pressure, triggering irreversible compaction of clay-rich alluvial beds.",
    points: [
      "Thousands of unpermitted deep wells tapping the coastal confined aquifer.",
      "Intensive water exchange cycles required by brackish water prawn and bangus fishponds.",
      "Drawdown cones merge across southern Bulacan, creating regional sinking depressions."
    ]
  },
  {
    id: "geology",
    title: "Quaternary Alluvial Compaction",
    category: "Natural Geology Driver",
    severity: "High",
    metric: "Soft clay layers 15–30m deep",
    summary: "Hagonoy rests on unconsolidated deltaic silt, sand, and organic mud deposited by the Pampanga River system. These young sediments naturally consolidate under their own weight and civil infrastructure loads.",
    points: [
      "Natural consolidation accelerated by building loads and vibration.",
      "High clay compressibility coefficient in the upper 40 meters.",
      "Absence of hard bedrock near the ground surface."
    ]
  },
  {
    id: "sea-level",
    title: "Accelerated Relative Sea Level Rise",
    category: "Compound Climatic Driver",
    severity: "Severe",
    metric: "13.4 mm/year local relative rise",
    summary: "While global eustatic sea level rises at ~3.4 mm/year, the combination of ocean thermal expansion and land subsidence causes Manila Bay to rise relative to Hagonoy at over 4× the global average.",
    points: [
      "Manila Bay tidal gauge records among the fastest relative sea level rises globally.",
      "Tides penetrate further inland along the Hagonoy and Labangan river channels.",
      "Magnification of storm surge heights during tropical cyclones."
    ]
  }
];

export const EFFECTS_DATA = [
  {
    id: "chronic-flooding",
    title: "Permanent & Tidal Inundation",
    badge: "Public Safety & Sanitation",
    stat: "Up to 1.5m",
    statLabel: "Sunny-day tidal flood depth",
    description: "Coastal barangays experience 'baha kahit walang ulan' (flooding even without rain). High tides twice daily engulf roads, markets, and homes with stagnant, saline water carrying septic runoff."
  },
  {
    id: "structural-damage",
    title: "Civil Infrastructure Settlement",
    badge: "Built Environment",
    stat: "100s of homes",
    statLabel: "Requiring house jacking / floor elevation",
    description: "Differential settlement cracks concrete road slabs, ruptures water conduits, and sinks school classrooms below surrounding street level, necessitating continuous capital expenditure to elevate structures."
  },
  {
    id: "saline-intrusion",
    title: "Aquifer Salinization & Potable Water Crisis",
    badge: "Public Health",
    stat: ">1,200 mg/L",
    statLabel: "Chloride levels in shallow wells",
    description: "Sinking land and depressurized aquifers pull saline seawater from Manila Bay into freshwater layers. Shallow groundwater is no longer safe for drinking or irrigation, forcing dependence on bottled water."
  },
  {
    id: "economic-loss",
    title: "Livelihood & Fisheries Disruption",
    badge: "Socio-Economic",
    stat: "Millions ₱ / yr",
    statLabel: "Fishpond dike washouts & transport delays",
    description: "Fishpond dikes are regularly overtopped by tides, resulting in stock loss. Key transport arteries are paralyzed during tide peaks, halting fish market deliveries to Metro Manila."
  }
];

export const MITIGATION_STRATEGIES = [
  {
    level: "Community Level",
    lead: "Barangay Councils & Citizens",
    actions: [
      {
        title: "Mangrove Bioshield Reforestation",
        desc: "Planting and preserving Avicennia marina and Rhizophora species along coastline and river mouths to trap sediments, absorb wave energy, and slow erosion.",
        impact: "Medium-term shoreline stabilization"
      },
      {
        title: "Rooftop Rainwater Harvesting",
        desc: "Installing gutter collectors and cisterns on residential and public buildings to replace groundwater extraction for non-potable sanitation and washing.",
        impact: "Reduces household aquifer overdraft by ~35%"
      },
      {
        title: "Community Sinking Gauges & Early Warning",
        desc: "Installing localized tidal benchmarks and community rain/tide gauge boards at key road intersections for flood transit safety.",
        impact: "Immediate hazard awareness"
      }
    ]
  },
  {
    level: "Local Government (LGU)",
    lead: "Municipality of Hagonoy & Bulacan Province",
    actions: [
      {
        title: "Moratorium & Regulation on Unpermitted Deep Wells",
        desc: "Strict enforcement with the National Water Resources Board (NWRB) to cap unauthorized industrial and large commercial aquaculture extraction wells.",
        impact: "Slows aquifer pressure depletion"
      },
      {
        title: "Zoning & Elevated Building Standards",
        desc: "Updating Comprehensive Land Use Plans (CLUP) to restrict heavy construction in high-subsidence zones and mandate elevated pile foundations.",
        impact: "Prevents catastrophic structural damage"
      },
      {
        title: "Pumping Stations & Automated Tide Gates",
        desc: "Modernizing flap gates and retention basins along Hagonoy River tributaries to prevent Manila Bay backflow while discharging rainfall runoff.",
        impact: "Controls sunny-day tidal intrusion"
      }
    ]
  },
  {
    level: "National & Regional Policy",
    lead: "DENR-MGB, DPWH, NWRB, DOST",
    actions: [
      {
        title: "Surface Water Bulk Supply Integration",
        desc: "Transitioning municipal water districts completely to treated surface water from Angat and Bulacan Bulk Water Supply, eliminating groundwater reliance.",
        impact: "Primary long-term solution to arrest subsidence"
      },
      {
        title: "Integrated Manila Bay Coastal Defense Masterplan",
        desc: "Constructing nature-based dikes, offshore breakwaters, and wetland retention areas coordinated across Pampanga and Bulacan coastal belts.",
        impact: "Regional resilience against 100-year storm surges"
      }
    ]
  }
];

export const REFERENCES_DATA = [
  {
    id: "eco2020",
    citation: "Eco, R. C., Rodolfo, K. S., & Siringan, F. P. (2020). Land subsidence in the coastal plains of Manila Bay, Philippines: Rates, causes, and impacts. Geological Society, London, Special Publications, 501(1), 145–164.",
    doi: "https://doi.org/10.1144/SP501-2019-122",
    relevance: "Primary reference for InSAR measurement of 2.5–5.0+ cm/year subsidence in Bulacan caused by groundwater pumping."
  },
  {
    id: "siringan2003",
    citation: "Siringan, F. P., & Rodolfo, K. S. (2003). Relative sea-level changes and worsening floods in the western Pampanga delta: Causes and some possible solutions. Science Diliman, 15(2), 1–12.",
    doi: "https://sciencediliman.upd.edu.ph",
    relevance: "Foundational study demonstrating that over-extraction for aquaculture outpaces natural sea level rise by orders of magnitude."
  },
  {
    id: "mgb2023",
    citation: "Mines and Geosciences Bureau (MGB) Region III. (2023). Geological hazard assessment of coastal municipalities in Bulacan: Land subsidence, coastal erosion, and flood hazards. Department of Environment and Natural Resources (DENR).",
    doi: "https://region3.mgb.gov.ph",
    relevance: "Official geological field data for Hagonoy alluvial layers and vulnerability mapping."
  },
  {
    id: "pagasa2024",
    citation: "DOST-PAGASA. (2024). Manila Bay sea level and astronomical tide tables: Observed relative sea-level trends in the Central Luzon littoral zone. Philippine Atmospheric, Geophysical and Astronomical Services Administration.",
    doi: "https://bagong.pagasa.dost.gov.ph",
    relevance: "Tidal station data proving chronic tidal flooding in high-subsidence coastal zones."
  },
  {
    id: "pemsea2022",
    citation: "Partnerships in Environmental Management for the Seas of East Asia (PEMSEA). (2022). State of the coasts of Manila Bay: Integrated coastal management for climate resilience and disaster risk reduction. PEMSEA Technical Report Series No. 28.",
    doi: "https://www.pemsea.org",
    relevance: "Framework for nature-based mangrove bioshields and community climate adaptation."
  }
];
