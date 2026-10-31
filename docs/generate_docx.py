import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
import shutil

def set_cell_background(cell, fill_color):
    tcPr = cell._element.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), fill_color)
    tcPr.append(shd)

def create_document():
    doc = docx.Document()

    # Set 1-inch margins (APA standard)
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)

    # Base Normal Style: Times New Roman, 12pt, 1.3 line spacing
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Times New Roman'
    font.size = Pt(12)
    font.color.rgb = RGBColor(0x11, 0x18, 0x27)
    style.paragraph_format.line_spacing = 1.3
    style.paragraph_format.space_after = Pt(6)

    # ------------------ COVER PAGE ------------------
    cover_title = doc.add_paragraph()
    cover_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    cover_title.paragraph_format.space_before = Pt(54)
    run_title = cover_title.add_run("Hagonoy GroundWatch:\nA Web-Based Environmental Awareness Platform on Land Subsidence")
    run_title.font.name = 'Times New Roman'
    run_title.font.size = Pt(18)
    run_title.font.bold = True
    run_title.font.color.rgb = RGBColor(0x0E, 0x74, 0x90)

    sub_title = doc.add_paragraph()
    sub_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    sub_title.paragraph_format.space_before = Pt(10)
    sub_title.paragraph_format.space_after = Pt(60)
    run_sub = sub_title.add_run("Final Course Output in Environmental Science\nAcademic Year 2026–2027 | First Semester")
    run_sub.font.name = 'Times New Roman'
    run_sub.font.size = Pt(12)
    run_sub.font.italic = True
    run_sub.font.color.rgb = RGBColor(0x47, 0x55, 0x69)

    details = doc.add_paragraph()
    details.alignment = WD_ALIGN_PARAGRAPH.CENTER
    details.paragraph_format.space_before = Pt(24)
    
    r1 = details.add_run("Prepared by Group Members (BSIT 4A-G1):\n")
    r1.font.bold = True
    r1.font.size = Pt(12)
    
    members_text = (
        "Del Ayre, Patrick Froilan S.\n"
        "Maninang, Mark Joseph C.\n"
        "David, Angelo P.\n\n"
    )
    r_members = details.add_run(members_text)
    r_members.font.size = Pt(12)
    
    r2 = details.add_run("Course & Section: ")
    r2.font.bold = True
    details.add_run("Environmental Science / BSIT 4A-G1\n")
    
    r3 = details.add_run("Live Web Application (Render): ")
    r3.font.bold = True
    details.add_run("https://hagonoy-groundwatch-tik7.onrender.com\n")

    r4 = details.add_run("GitHub Repository: ")
    r4.font.bold = True
    details.add_run("https://github.com/Natoy0123/hagonoy-groundwatch\n")
    
    r5 = details.add_run("Date of Submission: ")
    r5.font.bold = True
    details.add_run("October 31, 2026\n")

    doc.add_page_break()

    # ------------------ HELPER FUNCTIONS FOR SECTIONS ------------------
    def add_h1(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(16)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.font.name = 'Times New Roman'
        run.font.size = Pt(14)
        run.font.bold = True
        run.font.color.rgb = RGBColor(0x0F, 0x17, 0x2A)
        return p

    def add_h2(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(12)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12.5)
        run.font.bold = True
        run.font.color.rgb = RGBColor(0x0E, 0x74, 0x90)
        return p

    # ------------------ EXECUTIVE SUMMARY ------------------
    add_h1("Executive Summary")
    doc.add_paragraph(
        "Coastal communities in the western Pampanga River Delta face an escalating crisis: the ground beneath their feet is sinking at alarming velocities. In Hagonoy, Bulacan, anthropogenic groundwater over-extraction—predominantly driven by commercial aquaculture and unpermitted deep wells—collapses unconsolidated Quaternary clay layers, resulting in peak subsidence rates of 2.5 to 5.2 cm per year. Coupled with global sea level rise, this induces persistent 'sunny-day tidal flooding' that submerges roads, homes, and public schools twice daily."
    )
    doc.add_paragraph(
        "To dispel the widespread misconception that this chronic flooding is purely an unavoidable consequence of climate change, this project presents Hagonoy GroundWatch (https://hagonoy-groundwatch-tik7.onrender.com). GroundWatch is a civic telemetry platform that synthesizes satellite InSAR geodesy, open spatial hazard data, an interactive Leaflet GIS map, an Aquifer Stress Simulator, and a citizen incident reporting portal. The platform empowers communities, educators, and municipal leaders to understand the hydrogeological roots of the crisis and demand long-term transition to treated surface bulk water."
    )

    # ------------------ SECTION I: INTRODUCTION ------------------
    add_h1("I. Introduction")
    add_h2("1.1 Overview of Land Subsidence")
    doc.add_paragraph(
        "Land subsidence is the gradual or sudden downward settling of the Earth's surface relative to a baseline datum. While subsidence can result from tectonic movements, volcanic readjustments, or natural sediment loading, rapid coastal subsidence across Southeast Asian deltas is predominantly anthropogenic."
    )
    doc.add_paragraph(
        "When unconsolidated, water-saturated clay and silt layers are drained of their pore water through excessive deep-well pumping, the fluid pressure that formerly held sediment particles apart is permanently lost. The overburden weight of overlying soil and civil infrastructure compresses the clay matrix into a denser, permanently compacted structure. Once pore spaces collapse, the loss of storage capacity is irreversible—even subsequent heavy rains cannot restore the sunken land surface to its original elevation."
    )

    add_h2("1.2 Relevance to Hagonoy, Bulacan")
    doc.add_paragraph(
        "Hagonoy is situated on the low-lying alluvial plains of southwestern Bulacan, bordering Manila Bay to the south and the Pampanga River system to the west. Geologically, the municipality rests upon unconsolidated deltaic silt, fine sand, and highly compressible organic mud deposited over millennia."
    )
    doc.add_paragraph(
        "Over the past three decades, the rapid expansion of brackish water fishponds (producing milkfish/bangus and prawns), commercial ice plants, and intensive domestic water extraction has led to thousands of unmetered deep wells piercing the coastal confined aquifer. Satellite InSAR studies by UP-NIGS researchers demonstrate that southern Bulacan is subsiding at rates ranging from 2.5 to over 5.0 cm/year (Eco et al., 2020; Siringan & Rodolfo, 2003)."
    )
    doc.add_paragraph(
        "Consequently, relative sea-level rise in Hagonoy is progressing at over 10 to 15 times the global eustatic rate (~3.4 mm/year). Coastal and riverine barangays—including Pugad, Tibaguin, San Pascual, and Mercado—now sit near or below the mean high-water spring (MHWS) tide level. Communities routinely experience 'baha kahit walang ulan' (sunny-day tidal flooding), where astronomical high tides force saltwater backwards through river mouths and drainage canals, paralyzing commerce, degrading freshwater aquifers through salinization, and cracking civil structures."
    )

    # ------------------ SECTION II: PROJECT OBJECTIVES ------------------
    add_h1("II. Project Objectives")
    doc.add_paragraph(
        "The primary goal of the Hagonoy GroundWatch project is to bridge the critical gap between academic hydrogeological research and public environmental literacy in Bulacan. Specific objectives include:"
    )
    doc.add_paragraph("1. Environmental Education & Misconception Demolition: Dispel the fatalistic narrative that flooding in Hagonoy is solely an act of nature, proving that groundwater overdrafting is the primary driver of subsidence.")
    doc.add_paragraph("2. Interactive Geospatial Visualization: Provide an open-access, browser-based GIS map that geolocates high-risk barangays, local subsidence velocities, and tidal inundation frequencies without technical paywalls.")
    doc.add_paragraph("3. Public Engagement via Interactive Simulation: Provide a parameter-driven 'Aquifer Stress Simulator' and a 'Literacy Quiz' allowing students and citizens to directly experience how water withdrawal rates dictate the lifespan of coastal land.")
    doc.add_paragraph("4. Citizen Science & Ground-Truth Telemetry: Establish a functional citizen incident reporting module enabling residents to log local high-tide depths, foundation fractures, and floor elevation projects to support local government hazard monitoring.")
    doc.add_paragraph("5. Advocacy for Root-Cause Policy Solutions: Shift the public discourse from reactive adaptation (such as perpetual road raising) toward permanent preventative interventions (such as municipal deep-well moratoria and integration with the Bulacan Bulk Water Supply Project).")

    # ------------------ SECTION III: DESCRIPTION OF THE WEBSITE ------------------
    add_h1("III. Description of the Website")
    add_h2("3.1 Pages and Features Included")
    doc.add_paragraph(
        "Hagonoy GroundWatch is built as a single-page civic telemetry application organized into eight dedicated components:"
    )
    doc.add_paragraph("• Telemetry Status Strip & Sticky Navigation: Fixed header with active coordinates (14.8344° N, 120.7329° E), real-time hazard status, and quick links to core sections.")
    doc.add_paragraph("• Civic Observatory Hero & KPI Matrix: Displays verified empirical benchmarks: Peak Subsidence Rate (2.5–5.2 cm/yr), Cumulative Drop (~1.14m since 2000), Tidal Flooding Frequency (180+ days/yr), and Exposed Population (135,000+ residents).")
    doc.add_paragraph("• Geological Mechanics Overview: Explains pore water pressure depletion, clay compaction, and the physics of sunny-day tidal flooding.")
    doc.add_paragraph("• Causes and Community Impact Matrix: Tabbed explorer contrasting anthropogenic deep-well extraction, Quaternary sediment compaction, and relative sea level rise against real-world impacts on infrastructure, aquifers, and fisheries.")
    doc.add_paragraph("• Interactive Leaflet Geospatial Hazard Map: GIS map featuring geolocated pins for key Hagonoy sectors (Pugad, Tibaguin, San Pascual, Mercado, Santa Elena, Santa Cruz, San Agustin, San Pedro) with risk filters, fly-to camera controls, and sector popups.")
    doc.add_paragraph("• Aquifer Stress Simulator & Literacy Quiz: An interactive mathematical sandbox calculating annual land drop from extraction parameters, paired with an automated knowledge-check quiz.")
    doc.add_paragraph("• Multi-Tier Mitigation Roadmap: Detailed action protocols categorized for Community (mangrove bioshields, rainwater harvesting), Local Government (well permits, CLUP zoning), and National agencies (Bulacan Bulk Water integration).")
    doc.add_paragraph("• Citizen Incident Reporting Portal: Interactive intake form with local persistence, confirmation dialog validation, receipt generation, and live feed synchronization.")
    doc.add_paragraph("• References Page: Full academic bibliography formatted in APA 7th Edition with direct DOIs.")

    add_h2("3.2 Technologies Used")
    doc.add_paragraph("• Frontend Framework: React 19 + Vite (modular component design, zero runtime overhead, optimized static production build).")
    doc.add_paragraph("• Styling: Tailwind CSS v4 configured with a high-contrast civic telemetry palette (Slate-50, Slate-900, Cyan-700, Amber-600, Red-600).")
    doc.add_paragraph("• Geospatial Mapping: Leaflet.js v1.9.4 and OpenStreetMap standard tiles.")
    doc.add_paragraph("• Vector Graphics & Icons: Lucide React SVG library.")
    doc.add_paragraph("• Quality Assurance: Automated Playwright E2E Test Suite (30/30 functional assertions passed, 7-viewport responsive validation).")
    doc.add_paragraph("• Deployment Pipeline: Continuous deployment on Render linked to GitHub main branch.")

    # ------------------ SECTION IV: ENVIRONMENTAL SIGNIFICANCE ------------------
    add_h1("IV. Environmental Significance")
    doc.add_paragraph(
        "In coastal Central Luzon, land subsidence is an invisible hazard. Unlike a typhoon or an earthquake, land sinks at centimeters per year—gradual enough that communities adapt incrementally by lifting furniture, constructing wooden catwalks, or raising roadbeds, without interrogating the underlying hydrogeological cause."
    )
    doc.add_paragraph(
        "Hagonoy GroundWatch makes the invisible visible. By placing empirical numbers alongside an interactive map, citizens can visualize the trajectory of their community over 5, 10, and 20-year horizons. This transforms fatalism into civic advocacy. For educators, the platform provides an interactive laboratory connecting the hydrologic cycle, groundwater mechanics, and compound climate hazards with real-world Philippine environmental policy."
    )

    # ------------------ SECTION V: CONCLUSION & RECOMMENDATIONS ------------------
    add_h1("V. Conclusion & Policy Recommendations")
    doc.add_paragraph(
        "Developing Hagonoy GroundWatch demonstrated that environmental science tools are most effective when paired with clear, non-exploitative civic communication. Sinking land in Hagonoy is not an unavoidable destiny; it is the direct consequence of unmetered subterranean water mining. Stopping subsidence requires concrete policy shifts:"
    )
    doc.add_paragraph("1. Accelerate Bulk Surface Water Conversion: Urgently connect all 26 barangays to the Bulacan Bulk Water Supply Project to eliminate groundwater extraction from coastal aquifers.")
    doc.add_paragraph("2. Implement an Immediate Moratorium on Aquaculture Deep Wells: Require brackish fishponds to recycle surface water or utilize regulated estuary intake rather than drawing from deep freshwater aquifers.")
    doc.add_paragraph("3. Mandate Nature-Based Bioshields: Replant resilient mangrove corridors along the Hagonoy River delta to trap marine sediments and build up natural substrate elevation.")
    doc.add_paragraph("4. Install Continuous GNSS Stations: Partner with UP-NIGS and DOST to establish permanent geodetic monitoring stations in Hagonoy to track ground deformation in real time.")

    # ------------------ SECTION VI: REFERENCES (APA 7th) ------------------
    add_h1("VI. References (APA 7th Edition)")
    refs = [
        "Eco, R. C., Rodolfo, K. S., & Siringan, F. P. (2020). Land subsidence in the coastal plains of Manila Bay, Philippines: Rates, causes, and impacts. Geological Society, London, Special Publications, 501(1), 145–164. https://doi.org/10.1144/SP501-2019-122",
        "Mines and Geosciences Bureau (MGB) Region III. (2023). Geological hazard assessment of coastal municipalities in Bulacan: Land subsidence, coastal erosion, and flood hazards. Department of Environment and Natural Resources (DENR). https://region3.mgb.gov.ph",
        "Partnerships in Environmental Management for the Seas of East Asia (PEMSEA). (2022). State of the coasts of Manila Bay: Integrated coastal management for climate resilience and disaster risk reduction (PEMSEA Technical Report Series No. 28). PEMSEA. https://www.pemsea.org",
        "Philippine Atmospheric, Geophysical and Astronomical Services Administration (DOST-PAGASA). (2024). Manila Bay sea level and astronomical tide tables: Observed relative sea-level trends in the Central Luzon littoral zone. DOST-PAGASA. https://bagong.pagasa.dost.gov.ph",
        "Siringan, F. P., & Rodolfo, K. S. (2003). Relative sea-level changes and worsening floods in the western Pampanga delta: Causes and some possible solutions. Science Diliman, 15(2), 1–12. https://sciencediliman.upd.edu.ph"
    ]
    for r in refs:
        p = doc.add_paragraph()
        p.paragraph_format.left_indent = Inches(0.5)
        p.paragraph_format.first_line_indent = Inches(-0.5)
        p.paragraph_format.space_after = Pt(6)
        p.add_run(r)

    # Save to project docs
    repo_docx_path = r"C:\Users\ADMIN\React_Projects\hagonoy-groundwatch\docs\Hagonoy-GroundWatch-Project-Documentation.docx"
    doc.save(repo_docx_path)
    print(f"[OK] DOCX successfully generated at: {repo_docx_path}")

    # Copy to user's Downloads folder
    download_docx_path = r"C:\Users\ADMIN\Downloads\Hagonoy-GroundWatch-Project-Documentation.docx"
    shutil.copyfile(repo_docx_path, download_docx_path)
    print(f"[OK] DOCX successfully copied to Downloads: {download_docx_path}")

if __name__ == "__main__":
    create_document()
