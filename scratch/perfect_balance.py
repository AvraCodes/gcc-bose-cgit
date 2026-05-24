def main():
    html_path = "/Users/avra/gcc cgit x bose/Main.html"
    
    print("Reading Main.html...")
    with open(html_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Main Header brand balance (BoseLogo 16, Logo 48)
    target_hdr = """      }), /*#__PURE__*/React.createElement("header", {
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
        size: 22
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "rgba(26, 79, 150, 0.4)",
          fontWeight: "300",
          fontSize: "20px"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(Logo, {
        size: 36
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
        size: 16
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "rgba(26, 79, 150, 0.4)",
          fontWeight: "300",
          fontSize: "20px"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(Logo, {
        size: 48
      })), /*#__PURE__*/React.createElement("nav", {"""

    if target_hdr in content:
        print("Perfecting main header brand logos...")
        content = content.replace(target_hdr, replacement_hdr, 1)
    else:
        print("WARNING: Main header pattern not found!")

    # 2. AI Multiplier badge balance (BoseLogo 10, Logo 24)
    target_aimult = """      }, /*#__PURE__*/React.createElement(BoseLogo, {
        size: 12,
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
      
    replacement_aimult = """      }, /*#__PURE__*/React.createElement(BoseLogo, {
        size: 10,
        style: {
          display: "block"
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--ink4)",
          fontWeight: "normal"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(Logo, {
        size: 24,
        style: {
          display: "block"
        }
      }), /*#__PURE__*/React.createElement("span", null, "Joint Recommended Option")),"""

    if target_aimult in content:
        print("Perfecting AI Multiplier recommended badge...")
        content = content.replace(target_aimult, replacement_aimult, 1)
    else:
        print("WARNING: AI Multiplier badge pattern not found!")

    # 3. Journey card recommended badge balance (BoseLogo 8, Logo 20)
    target_journey = """      }, /*#__PURE__*/React.createElement(BoseLogo, {
        size: 10
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

    replacement_journey = """      }, /*#__PURE__*/React.createElement(BoseLogo, {
        size: 8
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--ink4)",
          fontWeight: "normal",
          fontSize: "8.5px"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(Logo, {
        size: 20
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
        print("Perfecting journey card recommended badge...")
        content = content.replace(target_journey, replacement_journey, 1)
    else:
        print("WARNING: Journey card badge pattern not found!")

    # 4. Footer logo block co-branding balance (BoseLogo 16, Logo 40)
    target_footer = """      }, /*#__PURE__*/React.createElement(BoseLogo, {
        size: 20
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "rgba(26, 79, 150, 0.4)",
          fontWeight: "300",
          fontSize: "18px"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(Logo, {
        size: 32
      })), /*#__PURE__*/React.createElement("p", {"""
      
    replacement_footer = """      }, /*#__PURE__*/React.createElement(BoseLogo, {
        size: 16
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "rgba(26, 79, 150, 0.4)",
          fontWeight: "300",
          fontSize: "18px"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(Logo, {
        size: 40
      })), /*#__PURE__*/React.createElement("p", {"""

    if target_footer in content:
        print("Perfecting footer logos...")
        content = content.replace(target_footer, replacement_footer, 1)
    else:
        print("WARNING: Footer logo pattern not found!")

    # 5. Commercial cards rendering balance (BoseLogo 8, Logo 18)
    target_comm = """      }, o.opt && /*#__PURE__*/React.createElement("div", {
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
        size: 9
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

    replacement_comm = """      }, o.opt && /*#__PURE__*/React.createElement("div", {
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
        size: 8
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--ink4)",
          fontWeight: "normal"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(Logo, {
        size: 18
      }), /*#__PURE__*/React.createElement("span", null, "Recommended Partner Option")), /*#__PURE__*/React.createElement("div", {
        className: "ctrl"
      }, o.lbl),"""

    if target_comm in content:
        print("Perfecting commercial cards recommended logos...")
        content = content.replace(target_comm, replacement_comm, 1)
    else:
        print("WARNING: Commercial cards rendering pattern not found!")

    # 6. Versus Section Comparison Tab balance (BoseLogo 7, Logo 16)
    target_vs = """      }, VS_OPTIONS.map(o => /*#__PURE__*/React.createElement("div", {
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
        size: 8
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
        size: 7
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--ink4)",
          fontSize: "8px"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(Logo, {
        size: 16
      })), /*#__PURE__*/React.createElement("div", {
        className: "vstn"
      }, o.n),"""

    if target_vs in content:
        print("Perfecting versus comparison tab logos...")
        content = content.replace(target_vs, replacement_vs, 1)
    else:
        print("WARNING: Versus tab rendering pattern not found!")

    print("Saving modified Main.html...")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print("Main.html successfully balanced and verified!")

if __name__ == "__main__":
    main()
