import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map as MapIcon, Filter, Info, AlertTriangle, Navigation, Download, FileJson, RotateCcw, Search, ShieldAlert } from 'lucide-react';
import { HAGONOY_BARANGAYS } from '../data/subsidenceData';

export default function HazardMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const polygonRef = useRef(null);
  const [selectedRisk, setSelectedRisk] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBarangay, setActiveBarangay] = useState(HAGONOY_BARANGAYS[0]);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isCorridorModalOpen, setIsCorridorModalOpen] = useState(false);

  const filteredBarangays = HAGONOY_BARANGAYS.filter((b) => {
    const matchesRisk = selectedRisk === 'All' || b.risk === selectedRisk;
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesRisk && matchesSearch;
  });

  const handleResetView = () => {
    setSelectedRisk('All');
    setSearchQuery('');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([14.825, 120.725], 12, { duration: 1.0 });
      mapInstanceRef.current.closePopup();
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [14.825, 120.725],
        zoom: 12,
        scrollWheelZoom: false,
      });

      // OpenStreetMap Standard Tiles (100% free, zero API key requirement)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      // Add Critical Coastal Inundation Polygon Corridor
      const coastalHazardPolygon = [
        [14.7700, 120.6850],
        [14.7800, 120.7150],
        [14.8150, 120.7300],
        [14.8250, 120.7100],
        [14.8000, 120.6900],
        [14.7700, 120.6850]
      ];

      polygonRef.current = L.polygon(coastalHazardPolygon, {
        color: '#dc2626',
        weight: 1.5,
        fillColor: '#dc2626',
        fillOpacity: 0.15,
        dashArray: '4, 4'
      }).addTo(map);

      polygonRef.current.bindTooltip("Critical Subsidence Corridor (>4.5 cm/yr) - Click for spec", {
        sticky: true,
        className: 'font-mono text-[10px]'
      });

      polygonRef.current.on('click', () => {
        setIsCorridorModalOpen(true);
      });

      mapInstanceRef.current = map;
      setTimeout(() => {
        map.invalidateSize();
      }, 150);
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    // Add markers for filtered barangays
    filteredBarangays.forEach((bg) => {
      const color =
        bg.risk === 'Critical' ? '#dc2626' :
        bg.risk === 'Severe' ? '#ea580c' : '#d97706';

      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div style="
            background-color: ${color};
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 2px solid #ffffff;
            box-shadow: 0 0 8px ${color}88;
          "></div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const marker = L.marker(bg.coords, { icon: customIcon }).addTo(map);

      const popupContent = `
        <div style="font-family: inherit; font-size: 12px; color: #0f172a;">
          <div style="font-weight: 700; font-size: 14px; margin-bottom: 4px; display: flex; align-items: center; justify-content: space-between;">
            <span>Brgy. ${bg.name}</span>
            <span style="font-size: 10px; padding: 2px 6px; border-radius: 2px; background: ${color}22; color: ${color}; font-weight: 700;">
              ${bg.risk}
            </span>
          </div>
          <div style="margin-bottom: 2px;"><strong>Subsidence Rate:</strong> ${bg.rateCmYear} cm/yr</div>
          <div style="margin-bottom: 2px;"><strong>Mean Elevation:</strong> ${bg.elevationM}m MSL</div>
          <div style="margin-bottom: 4px;"><strong>Tidal Inundation:</strong> ~${bg.floodDaysYear} days/yr</div>
          <div style="font-size: 11px; color: #475569; margin-top: 6px; border-top: 1px solid #e2e8f0; padding-top: 4px;">
            ${bg.impactNotes}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        setActiveBarangay(bg);
      });

      markersRef.current[bg.name] = marker;
    });

    return () => {};
  }, [selectedRisk, searchQuery]);

  const handleFocusBarangay = (bg) => {
    setActiveBarangay(bg);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(bg.coords, 14, { duration: 1.2 });
      if (markersRef.current[bg.name]) {
        markersRef.current[bg.name].openPopup();
      }
    }
  };

  return (
    <section id="hazard-map" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-800">
              <MapIcon className="w-4 h-4 text-cyan-700" />
              <span>Interactive Geospatial Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 tracking-tight">
              Hagonoy Subsidence & Vulnerability Hazard Map
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl">
              Georeferenced spatial data showing peak subsidence rates, coastal hazard polygon corridors, and tidal inundation frequencies.
            </p>
          </div>

          {/* Controls: Filter & GeoJSON link */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="./hagonoy-subsidence-map.geojson"
              download="hagonoy-subsidence-map.geojson"
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-semibold rounded bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition shadow-xs"
              title="Download GeoJSON for GIS and VS Code Map Viewer"
            >
              <FileJson className="w-3.5 h-3.5 text-cyan-700" />
              GeoJSON File
            </a>

            <button
              onClick={handleResetView}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition shadow-2xs cursor-pointer"
              title="Reset Map to Full Municipality View"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              Reset View
            </button>

            <div className="flex flex-wrap items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-xs text-slate-600 font-medium">Filter:</span>
              {['All', 'Critical', 'Severe', 'Moderate'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedRisk(lvl)}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition cursor-pointer ${
                    selectedRisk === lvl
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Interactive Leaflet Map Container */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded overflow-hidden shadow-xs relative isolate z-0 flex flex-col">
            <div className="h-[460px] sm:h-[520px] w-full relative z-0 overflow-hidden" ref={mapContainerRef} />

            {/* In-Map Legend Overlay */}
            <div className="p-3 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-slate-500 font-mono text-[11px] uppercase">Legend:</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                  Critical (&gt;4.5 cm/yr)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-600"></span>
                  Severe (3.0 – 4.5 cm/yr)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                  Moderate (&lt;3.0 cm/yr)
                </span>
                <button
                  type="button"
                  onClick={() => setIsCorridorModalOpen(true)}
                  className="flex items-center gap-1.5 text-red-700 hover:text-red-900 cursor-pointer underline text-[11px] font-semibold"
                >
                  <span className="w-4 h-2 border border-red-600 border-dashed bg-red-100/60 inline-block"></span>
                  Hazard Corridor Spec
                </button>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                OpenStreetMap / GeoJSON
              </div>
            </div>
          </div>

          {/* Right: Selected Barangay Detail & Quick Navigator */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Active Barangay Telemetry Card */}
            <div className="bg-white border border-slate-200 rounded p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-mono font-semibold uppercase text-slate-500">
                  Selected Sector
                </span>
                <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                  activeBarangay.risk === 'Critical' ? 'bg-red-50 text-red-700 border border-red-200' :
                  activeBarangay.risk === 'Severe' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                  'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {activeBarangay.risk} Risk
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mt-3">
                Barangay {activeBarangay.name}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {activeBarangay.impactNotes}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100 font-mono text-xs">
                <div className="p-2.5 bg-slate-50 rounded">
                  <span className="text-slate-500 block text-[10px] uppercase">Subsidence Rate</span>
                  <span className="text-base font-bold text-slate-900">{activeBarangay.rateCmYear}</span>
                  <span className="text-[11px] text-slate-500 ml-1">cm/yr</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded">
                  <span className="text-slate-500 block text-[10px] uppercase">Mean Elevation</span>
                  <span className={`text-base font-bold ${activeBarangay.elevationM < 0 ? 'text-red-600' : 'text-slate-900'}`}>
                    {activeBarangay.elevationM}
                  </span>
                  <span className="text-[11px] text-slate-500 ml-1">m MSL</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded col-span-2">
                  <span className="text-slate-500 block text-[10px] uppercase">Annual Tidal Floods</span>
                  <span className="text-base font-bold text-slate-900">~{activeBarangay.floodDaysYear} days/year</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Primary driver: {activeBarangay.primaryDriver}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setIsDossierOpen(true)}
                  className="w-full py-2 px-3 text-xs font-semibold rounded bg-slate-900 text-white hover:bg-slate-800 transition active:scale-98 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-cyan-400" />
                  View Sector Geological Dossier
                </button>
              </div>
            </div>

            {/* Quick Barangay Telemetry Selector with search input */}
            <div className="bg-white border border-slate-200 rounded p-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-xs font-mono font-semibold uppercase text-slate-500">
                  Quick Sector Selector ({filteredBarangays.length})
                </span>
              </div>

              {/* Search box */}
              <div className="relative mb-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search barangay..."
                  className="w-full text-xs p-1.5 pl-7 rounded border border-slate-200 bg-slate-50 text-slate-800 outline-none focus:border-cyan-700"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1.5 text-xs text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="overflow-y-auto max-h-[170px] space-y-1.5 pr-1">
                {filteredBarangays.length === 0 ? (
                  <div className="text-center py-4 text-xs text-slate-400 font-mono">
                    No barangay matches "{searchQuery}".
                  </div>
                ) : (
                  filteredBarangays.map((bg) => {
                    const isCurrent = bg.name === activeBarangay.name;
                    return (
                      <button
                        key={bg.name}
                        onClick={() => handleFocusBarangay(bg)}
                        className={`w-full text-left px-3 py-2 rounded text-xs flex items-center justify-between transition cursor-pointer ${
                          isCurrent
                            ? 'bg-cyan-50 border border-cyan-700 text-cyan-950 font-semibold'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-transparent'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Navigation className={`w-3 h-3 ${isCurrent ? 'text-cyan-700' : 'text-slate-400'}`} />
                          Brgy. {bg.name}
                        </span>
                        <span className="font-mono text-[11px] text-slate-500">
                          {bg.rateCmYear} cm/yr
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sector Geological Dossier Dialog */}
      {isDossierOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-lg max-w-lg w-full p-6 shadow-xl animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-700"></span>
                <h3 className="font-bold text-slate-900 text-base">
                  Geological Dossier: Brgy. {activeBarangay.name}
                </h3>
              </div>
              <button
                onClick={() => setIsDossierOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded font-mono grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Coordinates</span>
                  <span className="font-bold text-slate-800">{activeBarangay.coords[0]}° N, {activeBarangay.coords[1]}° E</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Hazard Index</span>
                  <span className="font-bold text-red-600">{activeBarangay.risk} Category</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Subsidence Velocity</span>
                  <span className="font-bold text-slate-900">{activeBarangay.rateCmYear} cm / year</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Elevation (MSL)</span>
                  <span className="font-bold text-slate-900">{activeBarangay.elevationM} meters</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 uppercase font-mono text-[11px] mb-1">
                  Subsurface Lithology & Extraction Pressure
                </h4>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Underlain by unconsolidated deltaic fine sands and compressible Quaternary clay deposits (15–35m deep). {activeBarangay.primaryDriver}. High susceptibility to irreversible volumetric pore collapse upon aquifer drawdown.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 uppercase font-mono text-[11px] mb-1">
                  Local Field Observations
                </h4>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {activeBarangay.impactNotes}
                </p>
              </div>

              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-900">
                <strong>Emergency Inundation Advisory:</strong> During spring tides and typhoons, road access routes may be submerged by up to 0.8m. Evacuation staging is designated at higher inland elevations.
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setIsDossierOpen(false)}
                className="px-4 py-2 text-xs font-bold rounded bg-slate-900 text-white hover:bg-slate-800 transition active:scale-95 cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Critical Hazard Corridor Spec Dialog */}
      {isCorridorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-lg max-w-md w-full p-6 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <div className="flex items-center gap-2 text-red-700 font-bold text-base">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                <span>Critical Coastal Hazard Corridor</span>
              </div>
              <button
                onClick={() => setIsCorridorModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <p className="leading-relaxed">
                The red-hatched polygon delineated on the map encompasses southwestern Hagonoy's most vulnerable deltaic belt—spanning <strong>Brgy. Pugad, Tibaguin, and San Pascual</strong> along the Manila Bay coastal interface.
              </p>

              <div className="p-3 bg-red-50 border border-red-200 rounded font-mono space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Corridor Area:</span>
                  <span className="font-bold text-slate-900">~14.2 km² delta plain</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Peak Displacement:</span>
                  <span className="font-bold text-red-700">Up to 5.2 cm / year</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Relative Sea Level Rise:</span>
                  <span className="font-bold text-red-700">10× to 15× global average</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-600">
                Ground elevations inside this corridor are currently below the Mean High Water Spring (MHWS) astronomical tide datum. Without municipal deep-well moratoria and surface bulk water connection, this zone faces permanent inundation by 2035.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setIsCorridorModalOpen(false)}
                className="px-4 py-2 text-xs font-bold rounded bg-slate-900 text-white hover:bg-slate-800 transition"
              >
                Close Corridor Spec
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}