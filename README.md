# BQ25504 Calculator

A professional web calculator for configuring BQ25504 chip resistors, built with HTML, CSS and vanilla JavaScript.

## Features

- **Modern and responsive interface** - Adapts to mobile, tablets and desktop
- **Precise calculations** - Exact formulas from BQ25504 datasheet
- **Range validation** - Prevents out-of-specification values
- **Smooth animations** - Attractive visual effects
- **Real-time calculation** - Instant results when changing values
- **No dependencies** - Pure HTML, CSS and JavaScript only

## See it in Action

### Direct Links (Click to open)

[![Open with HTML Preview](https://img.shields.io/badge/HTML%20Preview-Open%20Calculator-blue?style=for-the-badge&logo=html5)](https://htmlpreview.github.io/?https://raw.githubusercontent.com/galopago/bq25504-calculator/main/index.html)

[![Open with Raw.githack](https://img.shields.io/badge/Raw.githack-Open%20Calculator-green?style=for-the-badge&logo=github)](https://raw.githack.com/galopago/bq25504-calculator/main/index.html)

[![Open with Statically](https://img.shields.io/badge/Statically-Open%20Calculator-orange?style=for-the-badge&logo=cdn)](https://cdn.statically.io/gh/galopago/bq25504-calculator/main/index.html)

### Alternative Links

- **HTML Preview**: https://htmlpreview.github.io/?https://raw.githubusercontent.com/galopago/bq25504-calculator/main/index.html
- **Raw.githack**: https://raw.githack.com/galopago/bq25504-calculator/main/index.html
- **Statically CDN**: https://cdn.statically.io/gh/galopago/bq25504-calculator/main/index.html

## How to Use

1. **Open any of the links above**
2. **Configure VBAT_OV** - Maximum battery voltage (2.5V - 5.25V)
3. **Configure VBAT_UV** - Minimum battery voltage (2.5V - 5.25V)
4. **Configure Battery OK** - Battery OK thresholds and hysteresis
5. **Configure MPPT** - Maximum power point percentage (50% - 100%)
6. **See the resistor values** calculated automatically

## Keyboard Shortcuts

- **Tab**: Move between fields
- **Type**: Automatically calculates resistors
- **Change values**: Real-time updates

## Responsive Design

The calculator adapts perfectly to:
- **Mobile** (320px+) - Optimized vertical layout
- **Tablets** (768px+) - 2-column grid
- **Desktop** (1024px+) - 4-column grid

## Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styles with Flexbox and Grid
- **JavaScript ES6+** - Precise BQ25504 calculations
- **Datasheet Formulas** - Exact Texas Instruments implementation
- **Real-time validation** - Dynamic ranges and constraints

## Project Structure

```
bq25504-calculator/
├── index.html          # BQ25504 Calculator
├── styles.css          # Responsive styles
├── script.js           # BQ25504 formulas
├── equations.txt       # Source of truth equations
└── README.md           # Documentation
```

## Calculated Parameters

- **VBAT_OV**: ROV1 + ROV2 = 10 MΩ (2.5V - 5.25V)
- **VBAT_UV**: RUV1 + RUV2 = 10 MΩ (2.5V - 5.25V)  
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