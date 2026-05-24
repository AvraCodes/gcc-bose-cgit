def main():
    html_path = "/Users/avra/gcc cgit x bose/Main.html"
    
    print("Reading Main.html...")
    with open(html_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Main Header brand balance (Swap order)
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
      }, /*#__PURE__*/React.createElement(Logo, {
        size: 48
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "rgba(26, 79, 150, 0.4)",
          fontWeight: "300",
          fontSize: "20px"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(BoseLogo, {
        size: 16
      })), /*#__PURE__*/React.createElement("nav", {"""

    if target_hdr in content:
        print("Swapping main header logos order...")
        content = content.replace(target_hdr, replacement_hdr, 1)
    else:
        print("WARNING: Main header pattern not found!")

    # 2. AI Multiplier badge balance (Swap order)
    target_aimult = """      }, /*#__PURE__*/React.createElement(BoseLogo, {
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
      
    replacement_aimult = """      }, /*#__PURE__*/React.createElement(Logo, {
        size: 24,
        style: {
          display: "block"
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--ink4)",
          fontWeight: "normal"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(BoseLogo, {
        size: 10,
        style: {
          display: "block"
        }
      }), /*#__PURE__*/React.createElement("span", null, "Joint Recommended Option")),"""

    if target_aimult in content:
        print("Swapping AI Multiplier recommended badge order...")
        content = content.replace(target_aimult, replacement_aimult, 1)
    else:
        print("WARNING: AI Multiplier badge pattern not found!")

    # 3. Journey card recommended badge balance (Swap order)
    target_journey = """      }, /*#__PURE__*/React.createElement(BoseLogo, {
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

    replacement_journey = """      }, /*#__PURE__*/React.createElement(Logo, {
        size: 20
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--ink4)",
          fontWeight: "normal",
          fontSize: "8.5px"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(BoseLogo, {
        size: 8
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
        print("Swapping journey card recommended badge order...")
        content = content.replace(target_journey, replacement_journey, 1)
    else:
        print("WARNING: Journey card badge pattern not found!")

    # 4. Footer logo block co-branding balance (Swap order)
    target_footer = """      }, /*#__PURE__*/React.createElement(BoseLogo, {
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
      
    replacement_footer = """      }, /*#__PURE__*/React.createElement(Logo, {
        size: 40
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "rgba(26, 79, 150, 0.4)",
          fontWeight: "300",
          fontSize: "18px"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(BoseLogo, {
        size: 16
      })), /*#__PURE__*/React.createElement("p", {"""

    if target_footer in content:
        print("Swapping footer logos order...")
        content = content.replace(target_footer, replacement_footer, 1)
    else:
        print("WARNING: Footer logo pattern not found!")

    # 5. Commercial cards rendering balance (Swap order)
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
      }, /*#__PURE__*/React.createElement(Logo, {
        size: 18
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--ink4)",
          fontWeight: "normal"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(BoseLogo, {
        size: 8
      }), /*#__PURE__*/React.createElement("span", null, "Recommended Partner Option")), /*#__PURE__*/React.createElement("div", {
        className: "ctrl"
      }, o.lbl),"""

    if target_comm in content:
        print("Swapping commercial cards recommended logos order...")
        content = content.replace(target_comm, replacement_comm, 1)
    else:
        print("WARNING: Commercial cards rendering pattern not found!")

    # 6. Versus Section Comparison Tab balance (Swap order)
    target_vs = """      }, o.us && /*#__PURE__*/React.createElement("div", {
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

    replacement_vs = """      }, o.us && /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "4px",
          marginBottom: "8px"
        }
      }, /*#__PURE__*/React.createElement(Logo, {
        size: 16
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--ink4)",
          fontSize: "8px"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(BoseLogo, {
        size: 7
      })), /*#__PURE__*/React.createElement("div", {
        className: "vstn"
      }, o.n),"""

    if target_vs in content:
        print("Swapping versus comparison tab logos order...")
        content = content.replace(target_vs, replacement_vs, 1)
    else:
        print("WARNING: Versus tab rendering pattern not found!")

    # 7. Co-brand the CTA Section (Build for transfer. Not dependency.)
    # We will locate the giant img block with base64 and replace it with a clean co-branded flex row
    # The start of the CTA img is right after className: "wrap", style: { position: "relative", zIndex: 2 } }
    
    target_cta_block = """      }, /*#__PURE__*/React.createElement("div", {
        className: "wrap",
        style: {
          position: "relative",
          zIndex: 2
        }
      }, /*#__PURE__*/React.createElement("img", {
        src: "data:image/png;base64,"""

    # Let's locate this start point and the ending closing brace of img tag
    cta_start = content.find(target_cta_block)
    if cta_start != -1:
        # Find the next , /*#__PURE__*/React.createElement("h2", null, "Build for "
        h2_search = ', /*#__PURE__*/React.createElement("h2", null, "Build for "'
        h2_idx = content.find(h2_search, cta_start)
        if h2_idx != -1:
            print("Found CTA image block, co-branding CTA block...")
            
            new_cta_wrapper = """      }, /*#__PURE__*/React.createElement("div", {
        className: "wrap",
        style: {
          position: "relative",
          zIndex: 2
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          marginBottom: "24px"
        }
      }, /*#__PURE__*/React.createElement(Logo, {
        size: 54
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "rgba(26, 79, 150, 0.4)",
          fontWeight: "300",
          fontSize: "24px"
        }
      }, "\\xD7"), /*#__PURE__*/React.createElement(BoseLogo, {
        size: 18
      }))"""
            
            # Substring replacement
            content = content[:cta_start] + new_cta_wrapper + content[h2_idx:]
        else:
            print("WARNING: Could not find end of CTA image tag!")
    else:
        print("WARNING: Could not find CTA image block!")

    print("Saving modified Main.html...")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print("Main.html successfully co-branded and perfectly styled!")

if __name__ == "__main__":
    main()
