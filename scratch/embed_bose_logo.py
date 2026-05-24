import base64
import os

def main():
    html_path = "/Users/avra/gcc cgit x bose/Main.html"
    logo_path = "/Users/avra/gcc cgit x bose/Bose Logo.png"
    
    print("Reading Bose Logo...")
    with open(logo_path, "rb") as f:
        img_bytes = f.read()
    bose_b64 = base64.b64encode(img_bytes).decode("utf-8")
    print(f"Base64 length: {len(bose_b64)}")
    
    print("Reading Main.html...")
    with open(html_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # 1. Add BoseLogo component definition before Logo definition
    target_logo = "    /* ═══ LOGO ═══════════════════════════════════════════════════════ */"
    replacement_logo = f"""    /* ═══ BOSE LOGO ═══════════════════════════════════════════════════ */
    const BoseLogo = ({{
      size = 44,
      style = {{}}
    }}) => /*#__PURE__*/React.createElement("img", {{
      src: "data:image/png;base64,{bose_b64}",
      width: size,
      height: size,
      style: Object.assign({{
        objectFit: "contain",
        display: "inline-block"
      }}, style),
      alt: "Bose Logo"
    }});

    /* ═══ LOGO ═══════════════════════════════════════════════════════ */"""
    
    if target_logo in content:
        print("Injecting BoseLogo component...")
        content = content.replace(target_logo, replacement_logo, 1)
    else:
        print("ERROR: Target LOGO header not found in Main.html!")
        return

    # 2. Main Header brand co-branding
    target_hdr = """      }), /*#__PURE__*/React.createElement("header", {
        className: `hdr${sy > 40 ? " sc" : ""}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "brand",
        onClick: () => scrollTo("mandate")
      }, /*#__PURE__*/React.createElement(Logo, {
        size: 40
      })), /*#__PURE__*/React.createElement("nav", {"""
      
    replacement_hdr = """      }), /*#__PURE__*/React.createElement("header", {
        className: `hdr${sy > 40 ? " sc" : ""}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "brand",
        onClick: () => scrollTo("mandate"),
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }
      }, /*#__PURE__*/React.createElement(BoseLogo, {
        size: 40
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "rgba(26, 79, 150, 0.4)",
          fontWeight: "300",
          fontSize: "20px"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(Logo, {
        size: 40
      })), /*#__PURE__*/React.createElement("nav", {"""

    if target_hdr in content:
        print("Co-branding main header...")
        content = content.replace(target_hdr, replacement_hdr, 1)
    else:
        print("WARNING: Main header pattern not matched exactly.")

    # 3. AI Multiplier Recommended Badge
    target_aimult = """      }, /*#__PURE__*/React.createElement(Logo, {
        size: 20,
        style: {
          display: "block"
        }
      }), /*#__PURE__*/React.createElement("span", null, "Recommended Option \\xB7 Provided by ConglomerateIT")),"""
      
    replacement_aimult = """      }, /*#__PURE__*/React.createElement(BoseLogo, {
        size: 20,
        style: {
          display: "block"
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--ink4)",
          fontWeight: "normal"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(Logo, {
        size: 20,
        style: {
          display: "block"
        }
      }), /*#__PURE__*/React.createElement("span", null, "Joint Recommended Option")),"""

    if target_aimult in content:
        print("Co-branding AI Multiplier recommended badge...")
        content = content.replace(target_aimult, replacement_aimult, 1)
    else:
        print("WARNING: AI Multiplier badge pattern not matched exactly.")

    # 4. Journey card recommended badge
    target_journey = """      }, /*#__PURE__*/React.createElement(Logo, {
        size: 16
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: "var(--M)",
          fontSize: "8.5px",
          fontWeight: "650",
          letterSpacing: ".06em",
          textTransform: "uppercase",
          color: "var(--blue)"
        }
      }, "Recommended \\xB7 Provided by ConglomerateIT")),"""

    replacement_journey = """      }, /*#__PURE__*/React.createElement(BoseLogo, {
        size: 16
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--ink4)",
          fontWeight: "normal",
          fontSize: "8.5px"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(Logo, {
        size: 16
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: "var(--M)",
          fontSize: "8.5px",
          fontWeight: "650",
          letterSpacing: ".06em",
          textTransform: "uppercase",
          color: "var(--blue)"
        }
      }, "Recommended Partner Model")),"""

    if target_journey in content:
        print("Co-branding journey card recommended badge...")
        content = content.replace(target_journey, replacement_journey, 1)
    else:
        print("WARNING: Journey card badge pattern not matched exactly.")

    # 5. Footer logo block co-branding
    target_footer = """      }, /*#__PURE__*/React.createElement(Logo, {
        size: 36
      })), /*#__PURE__*/React.createElement("p", {"""
      
    replacement_footer = """      }, /*#__PURE__*/React.createElement(BoseLogo, {
        size: 36
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "rgba(26, 79, 150, 0.4)",
          fontWeight: "300",
          fontSize: "18px"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(Logo, {
        size: 36
      })), /*#__PURE__*/React.createElement("p", {"""

    if target_footer in content:
        print("Co-branding footer logo...")
        content = content.replace(target_footer, replacement_footer, 1)
    else:
        print("WARNING: Footer logo pattern not matched exactly.")

    # 6. Commercial cards rendering co-branding
    target_comm = """      }, CTR_OPTS.map(o => /*#__PURE__*/React.createElement("div", {
        key: o.id,
        className: `ctrcard${o.opt ? " opt" : ""}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "ctrl"
      }, o.lbl),"""

    replacement_comm = """      }, CTR_OPTS.map(o => /*#__PURE__*/React.createElement("div", {
        key: o.id,
        className: `ctrcard${o.opt ? " opt" : ""}`
      }, o.opt && /*#__PURE__*/React.createElement("div", {
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(26, 79, 150, 0.06)",
          border: "1px solid rgba(26, 79, 150, 0.16)",
          borderRadius: 99,
          padding: "4px 8px",
          marginBottom: 12,
          fontFamily: "var(--M)",
          fontSize: 8.5,
          fontWeight: 650,
          color: "var(--blue)",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          alignSelf: "flex-start",
          width: "fit-content"
        }
      }, /*#__PURE__*/React.createElement(BoseLogo, {
        size: 14
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--ink4)",
          fontWeight: "normal"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(Logo, {
        size: 14
      }), /*#__PURE__*/React.createElement("span", null, "Recommended Partner Option")), /*#__PURE__*/React.createElement("div", {
        className: "ctrl"
      }, o.lbl),"""

    if target_comm in content:
        print("Co-branding commercial cards rendering...")
        content = content.replace(target_comm, replacement_comm, 1)
    else:
        print("WARNING: Commercial cards rendering pattern not matched exactly.")

    # 7. Versus Section Comparison Tab co-branding
    target_vs = """      }, VS_OPTIONS.map(o => /*#__PURE__*/React.createElement("div", {
        key: o.id,
        className: `vstab${vsActive === o.id ? " act" : ""}${o.us ? " us" : ""}`,
        onMouseEnter: () => setVsActive(o.id)
      }, /*#__PURE__*/React.createElement("div", {
        className: "vstn"
      }, o.n),"""

    replacement_vs = """      }, VS_OPTIONS.map(o => /*#__PURE__*/React.createElement("div", {
        key: o.id,
        className: `vstab${vsActive === o.id ? " act" : ""}${o.us ? " us" : ""}`,
        onMouseEnter: () => setVsActive(o.id)
      }, o.us && /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "4px",
          marginBottom: "8px"
        }
      }, /*#__PURE__*/React.createElement(BoseLogo, {
        size: 13
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--ink4)",
          fontSize: "8px"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(Logo, {
        size: 13
      })), /*#__PURE__*/React.createElement("div", {
        className: "vstn"
      }, o.n),"""

    if target_vs in content:
        print("Co-branding versus comparison tabs...")
        content = content.replace(target_vs, replacement_vs, 1)
    else:
        print("WARNING: Versus tab rendering pattern not matched exactly.")

    # 8. CSS Adjustments for Premium highlighting
    target_css_comm_opt = ".ctrcard.opt{border-color:var(--blue);background:linear-gradient(135deg,#fff,var(--bs));}"
    replacement_css_comm_opt = ".ctrcard.opt{border-color:var(--blue);background:linear-gradient(135deg,#fff,var(--bs));box-shadow:0 12px 36px rgba(26,79,150,0.08);transition:all 350ms;}\n.ctrcard.opt:hover{transform:translateY(-5px);box-shadow:0 20px 48px rgba(26,79,150,0.12);border-color:var(--blue);}"
    
    if target_css_comm_opt in content:
        print("Enhancing commercial recommended card CSS styling...")
        content = content.replace(target_css_comm_opt, replacement_css_comm_opt, 1)
    else:
        print("WARNING: Commercial card opt CSS pattern not matched exactly.")

    target_css_comm_before = ".ctrcard.opt::before{content:'★ Recommended';position:absolute;top:14px;right:14px;font-family:var(--M);font-size:8.5px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#fff;background:var(--blue);padding:5px 11px;border-radius:100px;}"
    replacement_css_comm_before = ".ctrcard.opt::before{content:none;display:none;}"
    
    if target_css_comm_before in content:
        print("Hiding default commercial CSS badge...")
        content = content.replace(target_css_comm_before, replacement_css_comm_before, 1)
    else:
        print("WARNING: Commercial card opt::before CSS pattern not matched exactly.")

    target_css_tcb_ours = ".tcb.ours{border-color:var(--blue);background:var(--bs);}"
    replacement_css_tcb_ours = ".tcb.ours{border-color:var(--blue);background:linear-gradient(135deg,var(--bs),rgba(26,79,150,0.06));box-shadow:0 12px 36px rgba(26,79,150,0.08);transition:all 350ms;}\n.tcb.ours:hover{transform:translateY(-3px);box-shadow:0 18px 40px rgba(26,79,150,0.12);border-color:var(--blue);}"
    
    if target_css_tcb_ours in content:
        print("Enhancing journey ours card CSS styling...")
        content = content.replace(target_css_tcb_ours, replacement_css_tcb_ours, 1)
    else:
        print("WARNING: Journey ours CSS pattern not matched exactly.")

    print("Saving modified Main.html...")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print("Main.html successfully co-branded and styled as premium!")

if __name__ == "__main__":
    main()
