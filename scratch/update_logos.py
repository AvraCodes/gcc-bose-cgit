import base64
import re

def main():
    html_path = "/Users/avra/gcc cgit x bose/Main.html"
    bose_path = "/Users/avra/gcc cgit x bose/Bose Logo.png"
    banner_path = "/Users/avra/gcc cgit x bose/ConglomerateIT Banner Logo.png"
    
    print("Reading Bose Logo...")
    with open(bose_path, "rb") as f:
        bose_bytes = f.read()
    bose_b64 = base64.b64encode(bose_bytes).decode("utf-8")
    
    print("Reading ConglomerateIT Banner Logo...")
    with open(banner_path, "rb") as f:
        banner_bytes = f.read()
    banner_b64 = base64.b64encode(banner_bytes).decode("utf-8")
    
    print("Reading Main.html...")
    with open(html_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. We will find and replace the entire BoseLogo and Logo components
    # Let's locate '/* ═══ BOSE LOGO ═══════════════════════════════════════════════════ */' to the end of Logo component definition.
    # Let's see if we can find them.
    
    # We will declare the brand new definitions
    new_logo_block = f"""    /* ═══ BOSE LOGO ═══════════════════════════════════════════════════ */
    const BoseLogo = ({{
      size = 44,
      style = {{}}
    }}) => /*#__PURE__*/React.createElement("img", {{
      src: "data:image/png;base64,{bose_b64}",
      height: size,
      style: Object.assign({{
        width: "auto",
        objectFit: "contain",
        display: "inline-block"
      }}, style),
      alt: "Bose Logo"
    }});

    /* ═══ LOGO ═══════════════════════════════════════════════════════ */
    const Logo = ({{
      size = 44,
      style = {{}}
    }}) => /*#__PURE__*/React.createElement("img", {{
      src: "data:image/png;base64,{banner_b64}",
      height: size,
      style: Object.assign({{
        width: "auto",
        objectFit: "contain",
        display: "inline-block"
      }}, style),
      alt: "ConglomerateIT Logo"
    }});"""

    # Let's search for the start of BoseLogo definition and end of Logo definition to replace it exactly.
    # The end of Logo definition is:
    #     });
    # which is at the end ofconst Logo = ({ ... }) => /*#__PURE__*/React.createElement("img", { ... });
    
    bose_start_tag = "    /* ═══ BOSE LOGO ═══════════════════════════════════════════════════ */"
    logo_end_tag = "});"
    
    start_idx = content.find(bose_start_tag)
    if start_idx == -1:
        print("ERROR: BoseLogo start tag not found!")
        return
        
    # Find the next Logo definition end after start_idx
    logo_idx = content.find("const Logo =", start_idx)
    if logo_idx == -1:
        print("ERROR: const Logo definition not found!")
        return
        
    end_idx = content.find(logo_end_tag, logo_idx)
    if end_idx == -1:
        print("ERROR: Logo definition closing tag not found!")
        return
    
    full_logo_end_idx = end_idx + len(logo_end_tag)
    
    print("Replacing Logo definitions...")
    content = content[:start_idx] + new_logo_block + content[full_logo_end_idx:]
    
    # 2. Let's make sure the aspect ratio is beautiful and check if any sizes are specified with hardcoded width on img tags in Main.html.
    # Since our replacement for BoseLogo and Logo defines width: "auto" in style, React.createElement("img", { height: size, style: ... })
    # will naturally auto-scale width! This is extremely robust.
    
    print("Saving Main.html...")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print("Main.html successfully updated with new co-branding and dynamic aspect ratios!")

if __name__ == "__main__":
    main()
