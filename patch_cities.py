import re

with open("Main.html", "r") as f:
    text = f.read()

c_obj_old = """    const CITIES = {
      hyderabad: {
        name: "Hyderabad",
        role: "The Operational Anchor",
        desc: "The balanced-scale winner. Massive BFSI and tech depth, planned infrastructure, lower attrition than Bengaluru, and the highest overall suitability score in our 40-factor model. Anchors IT operations and Global Business Services.",
        alloc: [{
          l: "IT Operations",
          v: "320",
          s: "Salesforce \\u00B7 SAP \\u00B7 DevOps \\u00B7 Cybersecurity \\u00B7 QA"
        }, {
          l: "Global Business Services",
          v: "160",
          s: "Order mgmt \\u00B7 MDM \\u00B7 Finance ops"
        }],
        eco: "Microsoft, Amazon, Google, BFSI majors all anchored in HITEC City. Lower poaching volatility. Cost-competitive real estate across Gachibowli and the Financial District. TSIC / T-Hub institutional ecosystem.",
        score: 90
      },
      bengaluru: {
        name: "Bengaluru",
        role: "The Innovation Anchor",
        desc: "The deepest tech ecosystem in India. Hosts ~39% of the country's GCCs. For audio DSP, wearable engineering, and AI/ML talent \u2014 structurally unmatched. Anchors R&D Engineering exclusively to manage cost-per-hire and attrition.",
        alloc: [{
          l: "R&D Engineering",
          v: "320",
          s: "Audio DSP \u00B7 TinyML \u00B7 RTOS \u00B7 BT/WiFi stack"
        }, {
          l: "DR / BCP Site",
          v: "\u2014",
          s: "Operational backup for Hyderabad"
        }],
        eco: "Harman International, Dolby India, Qualcomm QCC, TI audio, IISc signal processing alumni in one city. Intel AI Labs, Google AI Research, Bosch GCC R&D. The audio DSP and wearable depth the Bose mandate requires.",
        score: 71
      }
    };"""

c_obj_new = """    const CITIES = {
      hyderabad: {
        name: "Hyderabad",
        state: "Telangana",
        role: "The Operational Anchor \u2014 India's scale engine",
        desc: "The balanced-scale winner. Massive BFSI and tech depth, planned infrastructure, lower attrition than Bengaluru, and the highest overall suitability score in our 40-factor model. Anchors IT operations and Global Business Services.",
        stats: [
          { v: "250+", l: "Operational GCCs" },
          { v: "1M+", l: "Tech professionals in Hyderabad" },
          { v: "135M sq ft", l: "Office stock \u00B7 HITEC City / Gachibowli" },
          { v: "6.5%", l: "Office rent growth YoY \u00B7 Q3 2025" }
        ],
        policy: "Telangana continues to offer robust single-window IT policies, fast-track approvals, and specialized incentives for mega-GCC setups in emerging hubs around Hyderabad.",
        alloc: [{
          l: "IT Operations",
          v: "320",
          s: "Salesforce \u00B7 SAP \u00B7 DevOps \u00B7 Cybersecurity \u00B7 QA"
        }, {
          l: "Global Business Services",
          v: "160",
          s: "Order mgmt \u00B7 MDM \u00B7 Finance ops"
        }],
        eco: "Microsoft, Amazon, Google, BFSI majors all anchored in HITEC City. Lower poaching volatility. Cost-competitive real estate across Gachibowli and the Financial District. TSIC / T-Hub institutional ecosystem.",
        score: 90
      },
      bengaluru: {
        name: "Karnataka \u00B7 Bengaluru",
        state: "Karnataka",
        role: "R&D innovation anchor \u2014 India's chip-design capital",
        desc: "The deepest tech ecosystem in India. Hosts ~39% of the country's GCCs. For audio DSP, wearable engineering, and AI/ML talent \u2014 structurally unmatched. Anchors R&D Engineering exclusively to manage cost-per-hire and attrition.",
        stats: [
          { v: "875+", l: "Operational GCCs (~30% of India)" },
          { v: "2M+", l: "Tech professionals \u2014 largest pool in India" },
          { v: "229M sq ft", l: "Office stock (23% of India, #1)" },
          { v: "8.0%", l: "Office rent growth YoY \u00B7 Q3 2025" }
        ],
        policy: "Karnataka GCC Policy 2024-29 \u2014 India's first dedicated GCC policy (19 Nov 2024). Targets +500 GCCs \u2192 1,000 by 2029, 350k jobs, $50B output. R&D grants up to ₹500M, rental reimbursement up to 50%, EPF support, 5-yr electricity-duty exemption, 45-day approvals, three innovation districts (Bengaluru, Mysuru, Belagavi).",
        alloc: [{
          l: "R&D Engineering",
          v: "320",
          s: "Audio DSP \u00B7 TinyML \u00B7 RTOS \u00B7 BT/WiFi stack"
        }, {
          l: "DR / BCP Site",
          v: "—",
          s: "Operational backup for Hyderabad"
        }],
        eco: "Harman International, Dolby India, Qualcomm QCC, TI audio, IISc signal processing alumni in one city. Intel AI Labs, Google AI Research, Bosch GCC R&D. The audio DSP and wearable depth the Bose mandate requires.",
        score: 71
      }
    };"""
import sys

def remove_spaces(s):
    return re.sub(r'\s+', '', s)

idx = remove_spaces(text).find(remove_spaces('score: 71\n      }\n    };'))
if idx == -1:
    print("Not found")
    sys.exit(1)

# just manual replace
match = re.search(r'const CITIES = \{.*score: 71\s+\}\s+\};', text, flags=re.DOTALL)
if match:
    text = text[:match.start()] + c_obj_new + text[match.end():]
    with open("Main.html", "w") as f:
        f.write(text)
    print("Replaced successfully")
else:
    print("Regex failed")
