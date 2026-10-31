import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import qn, nsdecls
import shutil
import os

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._element.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_cell_background(cell, hex_color):
    tcPr = cell._element.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    tcPr.append(shd)

def set_academic_table_borders(table):
    """
    Standard APA/Academic booktabs border styling (matching DelAyre case study):
    - Solid black top border (1.5pt)
    - Solid black bottom border (1.5pt)
    - Thin black horizontal interior dividers (0.5pt)
    - No vertical borders
    """
    tblPr = table._element.xpath('w:tblPr')
    if tblPr:
        borders = parse_xml(
            f'<w:tblBorders {nsdecls("w")}>'
            f'  <w:top w:val="single" w:sz="12" w:space="0" w:color="000000"/>'
            f'  <w:bottom w:val="single" w:sz="12" w:space="0" w:color="000000"/>'
            f'  <w:insideH w:val="single" w:sz="4" w:space="0" w:color="000000"/>'
            f'  <w:insideV w:val="none"/>'
            f'  <w:left w:val="none"/>'
            f'  <w:right w:val="none"/>'
            f'</w:tblBorders>'
        )
        tblPr[0].append(borders)

def build_student_documentation():
    doc = docx.Document()

    # 1-inch margins on all sides (standard academic layout)
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)

    # Base Normal Style: Calibri, 11pt, 1.15 line spacing, 6pt after, pure black text
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Calibri'
    font.size = Pt(11)
    font.color.rgb = RGBColor(0x00, 0x00, 0x00)
    style.paragraph_format.line_spacing = 1.15
    style.paragraph_format.space_after = Pt(6)

    # ==========================================
    # PAGE 1: DEDICATED TITLE PAGE (DEL AYRE FORMAT)
    # ==========================================
    title_p = doc.add_paragraph()
    title_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    title_p.paragraph_format.space_before = Pt(80)
    title_p.paragraph_format.space_after = Pt(12)

    r_top = title_p.add_run("PROJECT DOCUMENTATION\n")
    r_top.font.name = 'Calibri'
    r_top.font.size = Pt(13)
    r_top.font.bold = True
    r_top.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    r_main_title = title_p.add_run("Hagonoy GroundWatch:\nA Web-Based Environmental Awareness Platform on Land Subsidence")
    r_main_title.font.name = 'Calibri'
    r_main_title.font.size = Pt(17)
    r_main_title.font.bold = True
    r_main_title.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    sub_p = doc.add_paragraph()
    sub_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    sub_p.paragraph_format.space_before = Pt(8)
    sub_p.paragraph_format.space_after = Pt(160)

    r_sub = sub_p.add_run("Final Course Output in Environmental Science\nAcademic Year 2026–2027 | First Semester")
    r_sub.font.name = 'Calibri'
    r_sub.font.size = Pt(11.5)
    r_sub.font.italic = True
    r_sub.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    # Bottom Metadata Block
    meta_p = doc.add_paragraph()
    meta_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    meta_p.paragraph_format.space_after = Pt(4)

    r_by_label = meta_p.add_run("Submitted by:\n")
    r_by_label.font.bold = True
    r_by_label.font.size = Pt(11)
    r_by_label.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    r_members = meta_p.add_run("Del Ayre, Patrick Froilan S.\nManinang, Mark Joseph C.\nDavid, Angelo P.\n")
    r_members.font.size = Pt(11)
    r_members.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    sec_p = doc.add_paragraph()
    sec_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    sec_p.paragraph_format.space_after = Pt(4)

    r_sec_label = sec_p.add_run("Course & Section:\n")
    r_sec_label.font.bold = True
    r_sec_label.font.size = Pt(11)
    r_sec_label.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    r_sec = sec_p.add_run("Environmental Science / BSIT 4A-G1\n")
    r_sec.font.size = Pt(11)
    r_sec.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    date_p = doc.add_paragraph()
    date_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    date_p.paragraph_format.space_after = Pt(16)

    r_date_label = date_p.add_run("Date of Submission:\n")
    r_date_label.font.bold = True
    r_date_label.font.size = Pt(11)
    r_date_label.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    r_date = date_p.add_run("October 31, 2026\n")
    r_date.font.size = Pt(11)
    r_date.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    links_p = doc.add_paragraph()
    links_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    links_p.paragraph_format.space_before = Pt(8)
    
    r_links = links_p.add_run(
        "Live Deployment: https://hagonoy-groundwatch-tik7.onrender.com\n"
        "GitHub Repository: https://github.com/Natoy0123/hagonoy-groundwatch"
    )
    r_links.font.name = 'Calibri'
    r_links.font.size = Pt(10)
    r_links.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    doc.add_page_break()

    # ==========================================
    # HEADINGS HELPERS (ALL PURE BLACK TEXT)
    # ==========================================
    def add_h1(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(16)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.font.name = 'Calibri'
        run.font.size = Pt(13)
        run.font.bold = True
        run.font.color.rgb = RGBColor(0x00, 0x00, 0x00)
        return p

    def add_h2(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(12)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.font.name = 'Calibri'
        run.font.size = Pt(11.5)
        run.font.bold = True
        run.font.color.rgb = RGBColor(0x00, 0x00, 0x00)
        return p

    def add_callout(text, bold_prefix="Key Takeaway: "):
        p = doc.add_paragraph()
        p.paragraph_format.left_indent = Inches(0.25)
        p.paragraph_format.right_indent = Inches(0.25)
        p.paragraph_format.space_before = Pt(6)
        p.paragraph_format.space_after = Pt(8)
        run_p = p.add_run(bold_prefix)
        run_p.font.bold = True
        run_p.font.color.rgb = RGBColor(0x00, 0x00, 0x00)
        run_t = p.add_run(text)
        run_t.font.italic = True
        run_t.font.color.rgb = RGBColor(0x00, 0x00, 0x00)
        return p

    # ==========================================
    # EXECUTIVE SUMMARY
    # ==========================================
    add_h1("Executive Summary")
    doc.add_paragraph(
        "For generations, residents along the coastal plains of Hagonoy, Bulacan have lived with rising waters. "
        "High tides regularly submerge national roads, school grounds, and residential doorways even under clear skies—a condition locals call 'baha kahit walang ulan'. "
        "While public opinion often attributes this perpetual flooding purely to climate change and sea level rise, peer-reviewed geological data reveals a far more immediate and aggressive culprit: the ground beneath Hagonoy is physically sinking at rates between 2.5 and 5.2 centimeters per year."
    )
    doc.add_paragraph(
        "This dramatic subsidence is driven primarily by excessive groundwater extraction. Unregulated deep wells feeding commercial fishponds, ice plants, and municipal demands have systematically drained the subsurface aquifers, causing unconsolidated deltaic clay layers to collapse under their own overburden weight. "
        "Because global sea level rises at roughly 3.4 millimeters annually while Hagonoy sinks up to 50 millimeters annually, land subsidence accounts for over 90% of the relative sea-level rise experienced along this coast."
    )
    doc.add_paragraph(
        "As fourth-year Information Technology students, our team developed Hagonoy GroundWatch (https://hagonoy-groundwatch-tik7.onrender.com) as our Environmental Science course project. "
        "GroundWatch is an interactive web platform designed to bridge the gap between technical geological research and everyday community awareness. "
        "By integrating satellite InSAR velocity records, an interactive GIS map, a slider-based aquifer stress simulator, and a crowdsourced citizen observation log, the platform translates dense scientific findings into clear, practical telemetry. "
        "Our goal is to shift public perception from passive fatalism toward informed community action, demonstrating why permanent solutions like treated surface water networks and strict deep-well moratoria are urgently needed."
    )

    # ==========================================
    # SECTION I: INTRODUCTION
    # ==========================================
    add_h1("I. Introduction")
    add_h2("1.1 Overview of Land Subsidence")
    doc.add_paragraph(
        "Land subsidence is the gradual or sudden downward settling of the ground surface relative to surrounding sea level or geodetic baselines. "
        "In river deltas and coastal lowlands, subsidence occurs when the subterranean pore-water pressure that normally supports unconsolidated silt and clay sediments is depleted. "
        "Under natural conditions, underground water fills the microscopic spaces between clay platelets, exerting hydrostatic pressure that counteracts the heavy weight of the soil above."
    )
    doc.add_paragraph(
        "When humans extract groundwater through motorized deep wells faster than natural rainfall can recharge the aquifer, pore-water pressure drops sharply. "
        "Deprived of fluid support, the compressible clay and silt particles are forced into tighter, denser arrangements. "
        "This compaction is geomechanically irreversible: once the pore network collapses, the ground surface sinks permanently. "
        "Even when heavy monsoon rains bring seasonal flooding, the compacted clay strata cannot re-expand, permanently robbing the coastal aquifer of its storage capacity."
    )

    add_h2("1.2 Environmental & Geographic Relevance to Hagonoy, Bulacan")
    doc.add_paragraph(
        "Hagonoy is situated on the low-lying delta of the Pampanga River system where it empties into northern Manila Bay. "
        "The municipal terrain consists of soft, water-rich Quaternary alluvial silt, fine sand, and organic mud deposited over thousands of years. "
        "These soft deltaic soils are extraordinarily sensitive to changes in fluid pressure."
    )
    doc.add_paragraph(
        "Over the past thirty years, Hagonoy's economy shifted heavily toward intensive aquaculture, specifically milkfish (bangus) and prawn farming. "
        "Commercial fishpond operators rely heavily on deep freshwater wells to blend with saline bay water, maintaining ideal salinity gradients for fish growth. "
        "Together with ice plants and unmetered residential pumping, thousands of deep wells continually withdraw water from confined aquifers between 100 and 300 meters below ground. "
        "Studies conducted by geologists from the University of the Philippines National Institute of Geological Sciences (UP-NIGS) confirm that coastal Bulacan and Pampanga represent the most rapid subsidence hotspot in the Philippines, descending at 2.5 to over 5.0 cm each year (Eco et al., 2020; Siringan & Rodolfo, 2003)."
    )

    # Table 1: Subsidence Hazard Matrix by Barangay
    doc.add_paragraph().paragraph_format.space_after = Pt(2)
    p_t1_title = doc.add_paragraph()
    p_t1_title.paragraph_format.space_before = Pt(8)
    p_t1_title.paragraph_format.space_after = Pt(4)
    p_t1_title.paragraph_format.keep_with_next = True
    r_t1 = p_t1_title.add_run("Table 1. Localized Subsidence Rates and Vulnerability Profile Across Hagonoy Sectors")
    r_t1.font.bold = True
    r_t1.font.size = Pt(10.5)
    r_t1.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    table1 = doc.add_table(rows=6, cols=5)
    set_academic_table_borders(table1)
    table1.alignment = WD_TABLE_ALIGNMENT.CENTER

    headers1 = [
        "Barangay / Sector",
        "Geological Matrix",
        "Subsidence Velocity",
        "Tidal Flooding Days",
        "Observed Field Reality"
    ]
    col_widths1 = [Inches(1.3), Inches(1.5), Inches(1.1), Inches(1.1), Inches(1.8)]

    for c_idx, h_text in enumerate(headers1):
        cell = table1.cell(0, c_idx)
        cell.width = col_widths1[c_idx]
        set_cell_background(cell, "F8F9FA")
        set_cell_margins(cell, top=120, bottom=120, left=140, right=140)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        run = p.add_run(h_text)
        run.font.bold = True
        run.font.size = Pt(9.5)
        run.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    data1 = [
        ("Pugad (Island Sector)", "Delta-mouth silt & soft clay", "4.8 – 5.2 cm/yr", "210+ days/yr", "Completely isolated during spring tides; residences raised on wooden stilts."),
        ("Tibaguin", "Unconsolidated fluvial alluvium", "4.2 – 4.9 cm/yr", "185 days/yr", "Road centerlines submerged twice daily; schools operate on elevated catwalks."),
        ("San Pascual", "Soft compressible clay & sand", "3.5 – 4.3 cm/yr", "160 days/yr", "Severe structural cracking in concrete fences; high concentration of aquaculture wells."),
        ("Mercado (Town Center)", "Interbedded estuarine alluvium", "3.1 – 3.8 cm/yr", "140 days/yr", "Drainage culvert backflow floods market stalls during full moon high tides."),
        ("San Agustin / San Pedro", "Inland deltaic sandy clay", "2.5 – 3.2 cm/yr", "110 days/yr", "Shallow drinking wells contaminated by saltwater intrusion (>1,200 mg/L chlorides).")
    ]

    for r_idx, row_data in enumerate(data1, start=1):
        for c_idx, val in enumerate(row_data):
            cell = table1.cell(r_idx, c_idx)
            cell.width = col_widths1[c_idx]
            set_cell_margins(cell, top=90, bottom=90, left=130, right=130)
            p = cell.paragraphs[0]
            run = p.add_run(val)
            run.font.size = Pt(9)
            run.font.color.rgb = RGBColor(0x00, 0x00, 0x00)
            if c_idx in (2, 3):
                run.font.name = 'Calibri'
                if "5.2" in val or "4.9" in val or "210" in val:
                    run.font.bold = True

    add_callout(
        "Because the land in Hagonoy is sinking at up to 50 mm/yr while ocean levels rise at ~3.4 mm/yr, "
        "land subsidence is causing local water levels to rise 15 times faster than climate-driven sea level rise alone.",
        bold_prefix="Scientific Assessment: "
    )

    # ==========================================
    # SECTION II: PROJECT OBJECTIVES
    # ==========================================
    add_h1("II. Project Objectives")
    doc.add_paragraph(
        "As BSIT students studying Environmental Science, we wanted our final output to be more than just an academic report filed away on a shelf. "
        "We observed firsthand that community members and even local leaders often feel powerless, viewing daily high tides as an inevitable consequence of bad weather or global warming. "
        "Our team set out to build an accessible, responsive digital platform called Hagonoy GroundWatch that translates scientific data into practical civic awareness."
    )
    doc.add_paragraph("Our project pursued five concrete objectives:")
    
    objectives = [
        ("1. Dispel the Climate Fatalism Myth: ", "Clearly communicate the scientific evidence that groundwater overdrafting—not global sea level rise alone—is the primary driver of chronic flooding in Hagonoy, showing that human decisions can influence the outcome."),
        ("2. Democratize Geospatial Hazard Telemetry: ", "Provide a free, browser-based GIS map that allows any citizen, student, or local official to examine subsidence rates and flood risks barangay by barangay without technical paywalls or complex software."),
        ("3. Enable Hands-On Environmental Modeling: ", "Build an intuitive Aquifer Stress Simulator that lets users test 'what-if' scenarios, showing how reducing groundwater pumping directly slows ground subsidence and preserves land elevation."),
        ("4. Facilitate Citizen Science Ground-Truthing: ", "Create a functional community reporting channel where residents can document localized flood heights and structural cracks, providing empirical field data to validate geodetic models."),
        ("5. Advocate for Root-Cause Policy Interventions: ", "Highlight actionable mitigation solutions—such as transitioning to the Bulacan Bulk Water Supply Project and enacting strict well moratoria—moving beyond reactive band-aids like perpetual road raising.")
    ]
    for pref, body in objectives:
        p = doc.add_paragraph()
        p.paragraph_format.left_indent = Inches(0.2)
        p.paragraph_format.space_after = Pt(4)
        r_p = p.add_run(pref)
        r_p.font.bold = True
        r_p.font.color.rgb = RGBColor(0x00, 0x00, 0x00)
        r_b = p.add_run(body)
        r_b.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    doc.add_paragraph(
        "Target Beneficiaries: The platform is designed for Hagonoy residents coping with daily tidal disruptions, "
        "high school and college students seeking local environmental case studies, Barangay Disaster Risk Reduction and Management Councils (BDRRMC) planning flood evacuation routes, "
        "and municipal policy-makers evaluating water utility infrastructure."
    )

    # ==========================================
    # SECTION III: DESCRIPTION OF THE PLATFORM
    # ==========================================
    add_h1("III. Description of the Website")
    add_h2("3.1 Platform Design & Functional Modules")
    doc.add_paragraph(
        "Rather than building a standard static informational website, our team architected Hagonoy GroundWatch as a responsive, single-page civic telemetry dashboard. "
        "We prioritized clarity, data density, and fast loading speeds so the site remains fully accessible on budget smartphones and mobile data connections. "
        "The application integrates five primary modules:"
    )

    # Table 2: Core Platform Modules
    doc.add_paragraph().paragraph_format.space_after = Pt(2)
    p_t2_title = doc.add_paragraph()
    p_t2_title.paragraph_format.space_before = Pt(8)
    p_t2_title.paragraph_format.space_after = Pt(4)
    p_t2_title.paragraph_format.keep_with_next = True
    r_t2 = p_t2_title.add_run("Table 2. Functional Architecture and Educational Capabilities of GroundWatch")
    r_t2.font.bold = True
    r_t2.font.size = Pt(10.5)
    r_t2.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    table2 = doc.add_table(rows=6, cols=3)
    set_academic_table_borders(table2)
    table2.alignment = WD_TABLE_ALIGNMENT.CENTER

    headers2 = ["Module Name", "Technical & Data Implementation", "Educational & Civic Function"]
    col_widths2 = [Inches(1.8), Inches(2.2), Inches(2.8)]

    for c_idx, h_text in enumerate(headers2):
        cell = table2.cell(0, c_idx)
        cell.width = col_widths2[c_idx]
        set_cell_background(cell, "F8F9FA")
        set_cell_margins(cell, top=120, bottom=120, left=140, right=140)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        run = p.add_run(h_text)
        run.font.bold = True
        run.font.size = Pt(9.5)
        run.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    data2 = [
        ("Interactive GIS Hazard Map", "Leaflet.js engine with custom GeoJSON polygons, sector search filters, risk-coded markers, and detailed geoscientific popups.", "Visualizes localized ground sinking rates across 8 key sectors; allows users to fly to their own barangay and view geological hazards."),
        ("Compaction Cycle Explorer", "Interactive 3-stage visual diagram depicting pore pressure decline, clay dewatering, and permanent sediment collapse.", "Breaks down complex soil mechanics into an intuitive visual story showing why groundwater mining causes permanent, irreversible land loss."),
        ("Aquifer Stress Simulator", "Dynamic mathematical model calculating annual subsidence (cm/yr) and 1-meter sink timelines from pumping volume and soil compressibility.", "Lets students manipulate extraction sliders and run real-world presets (e.g., Fishpond Cluster vs. Bulk Surface Water Transition) to see immediate impacts."),
        ("Citizen Science Incident Portal", "Validated report form with localStorage persistence, confirmation modals, tracking ID receipts (HGW-XXXX), and a searchable live register.", "Empowers residents to report flood depths and foundation damage, providing grassroots verification that complements remote satellite data."),
        ("Multi-Tier Mitigation Guide", "Structured policy matrix and interactive citizen pledge checklist categorizing actions across Community, LGU, and National tiers.", "Moves beyond complaints by outlining concrete responsibilities, such as mangrove planting for citizens and bulk water piped lines for government.")
    ]

    for r_idx, row_data in enumerate(data2, start=1):
        for c_idx, val in enumerate(row_data):
            cell = table2.cell(r_idx, c_idx)
            cell.width = col_widths2[c_idx]
            set_cell_margins(cell, top=90, bottom=90, left=130, right=130)
            p = cell.paragraphs[0]
            run = p.add_run(val)
            run.font.size = Pt(9)
            run.font.color.rgb = RGBColor(0x00, 0x00, 0x00)
            if c_idx == 0:
                run.font.bold = True

    add_h2("3.2 Technologies & Engineering Stack")
    doc.add_paragraph(
        "As IT majors, selecting the right software stack was critical to ensure the platform remains fast, reliable, and completely free to host and maintain. "
        "We avoided heavy commercial APIs that require paid subscriptions or credit card billing."
    )

    # Table 3: Technologies Used
    doc.add_paragraph().paragraph_format.space_after = Pt(2)
    p_t3_title = doc.add_paragraph()
    p_t3_title.paragraph_format.space_before = Pt(8)
    p_t3_title.paragraph_format.space_after = Pt(4)
    p_t3_title.paragraph_format.keep_with_next = True
    r_t3 = p_t3_title.add_run("Table 3. Technology Stack and Implementation Rationale")
    r_t3.font.bold = True
    r_t3.font.size = Pt(10.5)
    r_t3.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    table3 = doc.add_table(rows=7, cols=3)
    set_academic_table_borders(table3)
    table3.alignment = WD_TABLE_ALIGNMENT.CENTER

    headers3 = ["Technology Component", "Tool / Library Selected", "Student Engineering Rationale"]
    col_widths3 = [Inches(1.8), Inches(2.0), Inches(3.0)]

    for c_idx, h_text in enumerate(headers3):
        cell = table3.cell(0, c_idx)
        cell.width = col_widths3[c_idx]
        set_cell_background(cell, "F8F9FA")
        set_cell_margins(cell, top=120, bottom=120, left=140, right=140)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        run = p.add_run(h_text)
        run.font.bold = True
        run.font.size = Pt(9.5)
        run.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    data3 = [
        ("Frontend Framework", "React 19 + Vite 8", "Provides lightning-fast build times, modular component reusability, and tiny bundle sizes (<150 kB gzip)."),
        ("Responsive Layout & Styling", "Tailwind CSS v4", "Enables clean, utility-first responsive styling; customized with an instrument-grade palette (Slate-900, Slate-700)."),
        ("Geospatial Mapping", "Leaflet.js 1.9.4 + OpenStreetMap", "100% open-source mapping engine without API key limits or billing overhead; lightweight on mobile hardware."),
        ("Vector Graphics", "Lucide React", "Clean SVG iconography that scales crisply on retina displays without bloating page weight."),
        ("Data Persistence", "HTML5 LocalStorage API", "Allows field reports to persist on the user's device without requiring backend database servers or account registration."),
        ("Automated Quality Assurance", "Playwright E2E Test Suite", "Automated headless browser testing ensuring 29 verified assertions pass with zero layout overflow across 7 device viewports.")
    ]

    for r_idx, row_data in enumerate(data3, start=1):
        for c_idx, val in enumerate(row_data):
            cell = table3.cell(r_idx, c_idx)
            cell.width = col_widths3[c_idx]
            set_cell_margins(cell, top=90, bottom=90, left=130, right=130)
            p = cell.paragraphs[0]
            run = p.add_run(val)
            run.font.size = Pt(9)
            run.font.color.rgb = RGBColor(0x00, 0x00, 0x00)
            if c_idx == 0:
                run.font.bold = True

    # ==========================================
    # SECTION IV: ENVIRONMENTAL SIGNIFICANCE
    # ==========================================
    add_h1("IV. Environmental Significance")
    add_h2("4.1 Raising Public Awareness in Vulnerable Sectors")
    doc.add_paragraph(
        "One of the biggest challenges in addressing land subsidence in coastal Bulacan is that it is an invisible hazard. "
        "Unlike an earthquake or a typhoon that strikes with sudden destructive force, land subsidence operates silently, millimeter by millimeter. "
        "Communities adapt incrementally: homeowners elevate their furniture, add concrete steps to their doorways, and build wooden catwalks across flooded streets. "
        "Because this adaptation happens gradually over decades, the public begins to treat chronic flooding as a normal, unchangeable fact of life."
    )
    doc.add_paragraph(
        "Hagonoy GroundWatch makes this hidden hazard visible. "
        "By presenting actual geodetic measurements (such as 'Brgy. Pugad has sunk over 1.2 meters since 2000'), citizens can finally understand the true magnitude of what is happening under their feet. "
        "Visualizing these subsidence numbers shifts the community conversation from passive acceptance of 'bad luck' toward demanding meaningful municipal oversight of deep-well water extraction."
    )

    add_h2("4.2 Contribution to Environmental Science Education")
    doc.add_paragraph(
        "For students and educators, GroundWatch serves as an interactive digital laboratory that connects textbook environmental science concepts with an urgent local crisis: "
    )
    edu_points = [
        ("Groundwater Hydrology & Overdraft: ", "Students see directly how extracting water faster than natural recharge depletes confined aquifers and permanently destroys underground water storage."),
        ("Compound Climate Threats: ", "The platform demonstrates how human-induced land subsidence multiplies the impacts of global sea level rise, turning normal high tides into destructive floods."),
        ("Role of Citizen Science: ", "GroundWatch models how crowdsourced community observations can corroborate high-tech satellite radar data, proving that civic engagement is essential for disaster risk reduction.")
    ]
    for pref, body in edu_points:
        p = doc.add_paragraph()
        p.paragraph_format.left_indent = Inches(0.2)
        p.paragraph_format.space_after = Pt(4)
        r_p = p.add_run(pref)
        r_p.font.bold = True
        r_p.font.color.rgb = RGBColor(0x00, 0x00, 0x00)
        r_b = p.add_run(body)
        r_b.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    # ==========================================
    # SECTION V: CONCLUSION & RECOMMENDATIONS
    # ==========================================
    add_h1("V. Conclusion & Policy Recommendations")
    add_h2("5.1 Summary of Learning & Student Reflection")
    doc.add_paragraph(
        "Working on Hagonoy GroundWatch has been an eye-opening journey for our team. "
        "When we started this project, we assumed that flooding in Hagonoy was purely an unavoidable consequence of climate change and proximity to Manila Bay. "
        "Through our research and data synthesis, we learned that the root problem is primarily subterranean water mining. "
        "As IT students, this project showed us that technology has a vital role to play in environmental stewardship. "
        "Software can take dense scientific studies—which are usually locked behind paywalls or buried in academic journals—and transform them into public civic tools that inform and protect vulnerable communities."
    )

    add_h2("5.2 Strategic Policy Recommendations for Hagonoy LGU")
    doc.add_paragraph(
        "Stopping land subsidence in Hagonoy will not happen overnight, but scientific evidence shows that when groundwater overdraft stops, subsidence velocities decelerate dramatically (as observed in Tokyo and Bangkok). "
        "Based on our findings, we propose four concrete interventions:"
    )

    # Table 4: Policy Interventions
    doc.add_paragraph().paragraph_format.space_after = Pt(2)
    p_t4_title = doc.add_paragraph()
    p_t4_title.paragraph_format.space_before = Pt(8)
    p_t4_title.paragraph_format.space_after = Pt(4)
    p_t4_title.paragraph_format.keep_with_next = True
    r_t4 = p_t4_title.add_run("Table 4. Recommended Policy and Engineering Interventions for Hagonoy")
    r_t4.font.bold = True
    r_t4.font.size = Pt(10.5)
    r_t4.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    table4 = doc.add_table(rows=5, cols=4)
    set_academic_table_borders(table4)
    table4.alignment = WD_TABLE_ALIGNMENT.CENTER

    headers4 = ["Intervention Level", "Proposed Action Plan", "Lead Agency", "Projected Environmental Impact"]
    col_widths4 = [Inches(1.5), Inches(2.5), Inches(1.5), Inches(1.5)]

    for c_idx, h_text in enumerate(headers4):
        cell = table4.cell(0, c_idx)
        cell.width = col_widths4[c_idx]
        set_cell_background(cell, "F8F9FA")
        set_cell_margins(cell, top=120, bottom=120, left=140, right=140)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        run = p.add_run(h_text)
        run.font.bold = True
        run.font.size = Pt(9.5)
        run.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    data4 = [
        ("Municipal (Immediate)", "Enact an immediate moratorium on drilling new commercial deep wells, especially for fishponds and ice plants. Install flow meters on existing high-capacity pumps.", "Hagonoy LGU & NWRB", "Stops rapid depressurization of deep aquifers within 6 to 12 months."),
        ("Provincial (Strategic)", "Accelerate pipeline connections to the Bulacan Bulk Water Supply Project to deliver treated surface water from Angat Reservoir to all 26 barangays.", "MWSS & Local Water District", "Eliminates municipal reliance on groundwater, allowing pore-water pressures to stabilize."),
        ("Ecological (Long-Term)", "Replant and protect mangrove greenbelts (Rhizophora and Avicennia) along the river delta and coastal perimeter.", "DENR Region III & BDRRMC", "Traps tidal sediments, dampens wave energy, and naturally accretes ground elevation over time."),
        ("Scientific (Monitoring)", "Establish permanent continuous GNSS stations and corner-reflector radar targets in Hagonoy to track ground motion continuously.", "UP-NIGS, DOST & PAGASA", "Provides empirical ground-truth telemetry to guide future municipal zoning and infrastructure investments.")
    ]

    for r_idx, row_data in enumerate(data4, start=1):
        for c_idx, val in enumerate(row_data):
            cell = table4.cell(r_idx, c_idx)
            cell.width = col_widths4[c_idx]
            set_cell_margins(cell, top=90, bottom=90, left=130, right=130)
            p = cell.paragraphs[0]
            run = p.add_run(val)
            run.font.size = Pt(9)
            run.font.color.rgb = RGBColor(0x00, 0x00, 0x00)
            if c_idx == 0:
                run.font.bold = True

    # ==========================================
    # SECTION VI: REFERENCES (APA 7th)
    # ==========================================
    add_h1("VI. References (APA 7th Edition)")
    
    references = [
        "Eco, R. C., Rodolfo, K. S., & Siringan, F. P. (2020). Land subsidence in the coastal plains of Manila Bay, Philippines: Rates, causes, and impacts. Geological Society, London, Special Publications, 501(1), 145–164. https://doi.org/10.1144/SP501-2019-122",
        "Mines and Geosciences Bureau (MGB) Region III. (2023). Geological hazard assessment of coastal municipalities in Bulacan: Land subsidence, coastal erosion, and flood hazards. Department of Environment and Natural Resources (DENR). https://region3.mgb.gov.ph",
        "Partnerships in Environmental Management for the Seas of East Asia (PEMSEA). (2022). State of the coasts of Manila Bay: Integrated coastal management for climate resilience and disaster risk reduction (PEMSEA Technical Report Series No. 28). PEMSEA. https://www.pemsea.org",
        "Philippine Atmospheric, Geophysical and Astronomical Services Administration (DOST-PAGASA). (2024). Manila Bay sea level and astronomical tide tables: Observed relative sea-level trends in the Central Luzon littoral zone. DOST-PAGASA. https://bagong.pagasa.dost.gov.ph",
        "Siringan, F. P., & Rodolfo, K. S. (2003). Relative sea-level changes and worsening floods in the western Pampanga delta: Causes and some possible solutions. Science Diliman, 15(2), 1–12. https://sciencediliman.upd.edu.ph"
    ]

    for ref in references:
        p = doc.add_paragraph()
        p.paragraph_format.left_indent = Inches(0.5)
        p.paragraph_format.first_line_indent = Inches(-0.5)
        p.paragraph_format.space_after = Pt(6)
        r = p.add_run(ref)
        r.font.size = Pt(10)
        r.font.color.rgb = RGBColor(0x00, 0x00, 0x00)

    # Save to project docs
    repo_docx_path = r"C:\Users\ADMIN\React_Projects\hagonoy-groundwatch\docs\Hagonoy-GroundWatch-Project-Documentation.docx"
    doc.save(repo_docx_path)
    print(f"[OK] Generated: {repo_docx_path}")

    # Copy to user's Downloads folder
    download_docx_path = r"C:\Users\ADMIN\Downloads\Hagonoy-GroundWatch-Project-Documentation.docx"
    shutil.copyfile(repo_docx_path, download_docx_path)
    print(f"[OK] Copied to Downloads: {download_docx_path}")

if __name__ == "__main__":
    build_student_documentation()
