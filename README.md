# BQ25504 Calculator

A web calculator for configuring BQ25504 chip resistors, built with HTML, CSS and vanilla JavaScript.

## Features

- **Battery presets** - Quick setup for Li-ion, LiFePO, and NiMH batteries
- **Dynamic SVG schematic** - Interactive BQ25504 diagram with real-time resistor values
- **Modern and responsive interface** - Adapts to mobile, tablets and desktop
- **Precise calculations** - Exact formulas from BQ25504 datasheet
- **Range validation** - Prevents out-of-specification values
- **Smooth animations** - Attractive visual effects
- **Real-time calculation** - Instant results when changing values
- **No dependencies** - Pure HTML, CSS and JavaScript only

## Try it Online

### Live Demo Links

**HTML Preview**  
https://htmlpreview.github.io/?https://raw.githubusercontent.com/galopago/bq25504-calculator/main/index.html

**Raw.githack**  
https://raw.githack.com/galopago/bq25504-calculator/main/index.html

### Quick Access
Click any link above to open the calculator directly in your browser. No installation required!

## How to Use

1. **Open any of the links above**
2. **Select battery type** - Choose from presets (Li-ion, LiFePO, NiMH 2x) or Custom
3. **Configure VBAT_OV** - Maximum battery voltage (2.5V - 5.25V)
4. **Configure VBAT_UV** - Minimum battery voltage (2.2V - 5.25V)
5. **Configure Battery OK** - Battery OK thresholds and hysteresis (2.2V - 5.25V)
6. **Configure MPPT** - Maximum power point percentage (50% - 100%)
7. **See the resistor values** calculated automatically in both the results table and the interactive SVG schematic

### Battery Presets

The calculator includes preset configurations for common battery types:

- **Li-ion Single Cell**: OV=4.2V, VBAT_OK_HYST=3.7V, VBAT_OK=3.3V, UV=3.0V
- **LiFePO Single Cell**: OV=3.5V, VBAT_OK_HYST=3.2V, VBAT_OK=3.0V, UV=2.5V
- **NiMH 2x Cells**: OV=2.8V, VBAT_OK_HYST=2.4V, VBAT_OK=2.25V, UV=2.2V
- **Custom**: Enter your own voltage values manually

## Dynamic SVG Schematic

The calculator features an interactive BQ25504 schematic diagram that updates in real-time:

- **Live resistor values** - All calculated resistances appear directly on the schematic
- **Scientific notation** - Values displayed with 2 decimal places and appropriate units (MΩ, kΩ, Ω)
- **Real-time updates** - Values change instantly as you modify inputs or select battery presets
- **Visual feedback** - Invalid or empty values show as "-" on the diagram
- **Responsive design** - SVG scales perfectly on all screen sizes

The schematic shows all 9 calculated resistances:
- **ROV1/ROV2** - Battery overvoltage protection
- **RUV1/RUV2** - Battery undervoltage protection  
- **ROK1/ROK2/ROK3** - Battery OK threshold detection
- **ROC1/ROC2** - MPPT sampling network

## Keyboard Shortcuts

- **Tab**: Move between fields
- **Type**: Automatically calculates resistors
- **Change values**: Real-time updates

## Responsive Design

The calculator adapts perfectly to:
- **Mobile** (320px+) - Optimized vertical layout with compact battery presets
- **Tablets** (768px+) - 2-column grid with responsive battery info
- **Desktop** (1024px+) - 4-column grid with full battery preset display

## Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styles with Flexbox and Grid
- **JavaScript ES6+** - Precise BQ25504 calculations
- **SVG** - Interactive schematic diagram with dynamic value injection
- **Datasheet Formulas** - Exact Texas Instruments implementation
- **Real-time validation** - Dynamic ranges and constraints

## Project Structure

```
bq25504-calculator/
├── index.html                              # BQ25504 Calculator
├── styles.css                              # Responsive styles
├── script.js                               # BQ25504 formulas + SVG injection
├── bq25504.svg                             # Interactive schematic diagram
├── equations.txt                           # Source of truth equations
├── bq25504-calculator-specification.json   # AI specification file
└── README.md                               # Documentation
```

## AI Specification File

The project includes `bq25504-calculator-specification.json` - a comprehensive specification file designed for AI agents to recreate similar calculators without requiring access to source files.

**Purpose:**
- Complete technical blueprint for AI-driven development
- Contains all formulas, UI specifications, and implementation guidelines
- Enables other AI agents to build functionally equivalent calculators
- Includes battery presets, responsive design requirements, and validation rules

**Contents:**
- BQ25504 chip parameters and resistor calculation formulas
- Battery preset configurations (Li-ion, LiFePO, NiMH)
- Complete UI structure and styling requirements
- JavaScript functionality specifications
- Responsive design breakpoints and mobile optimization
- Testing requirements and deployment considerations

This specification file serves as a complete reference for AI-assisted development of BQ25504 calculator applications.

## Calculated Parameters

- **VBAT_OV**: ROV1 + ROV2 = 10 MΩ (2.5V - 5.25V)
- **VBAT_UV**: RUV1 + RUV2 = 10 MΩ (2.2V - 5.25V)  
- **Battery OK**: ROK1 + ROK2 + ROK3 = 10 MΩ
- **MPPT**: ROC1 + ROC2 = 20 MΩ (50% - 100%)

## Local Installation (Optional)

If you want to run locally:

```bash
# Clone the repository
git clone https://github.com/galopago/bq25504-calculator.git

# Navigate to directory
cd bq25504-calculator

# Open index.html in your browser
# Or use a local server:
python3 -m http.server 8000
# Then go to: http://localhost:8000
```

## Contributing

Contributions are welcome! If you have ideas to improve the calculator:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Alberto Nunez** - [@galopago](https://github.com/galopago)

---

**Give it a star if you like this project!**