// BQ25504 Constants
const CONSTANTS = {
    VBAT_OV_MIN: 2.5,
    VBAT_OV_MAX: 5.25,
    VBAT_UV_MIN: 2.2,
    ROV_TOTAL: 10e6,  // 10 MΩ
    RUV_TOTAL: 10e6,  // 10 MΩ
    ROK_TOTAL: 10e6,  // 10 MΩ
    ROC_TOTAL: 20e6,  // 20 MΩ
    VREF: 1.25,       // Internal reference voltage
    MPP_MIN: 50,
    MPP_MAX: 100
};

// Battery presets
const BATTERY_PRESETS = {
    'custom': {
        name: 'Custom',
        description: 'Manual entry',
        voltages: {}
    },
    'liion-single': {
        name: 'Li-ion',
        description: 'Single cell',
        voltages: {
            vbat_ov: 4.2,
            vbat_uv: 3.0,
            vbat_ok_prog: 3.3,
            vbat_ok_hyst: 3.7
        }
    },
    'lifepo-single': {
        name: 'LiFePO',
        description: 'Single cell',
        voltages: {
            vbat_ov: 3.5,
            vbat_uv: 2.5,
            vbat_ok_prog: 3.0,
            vbat_ok_hyst: 3.2
        }
    },
    'nimh-2cell': {
        name: 'NiMH 2x',
        description: '2-cell pack',
        voltages: {
            vbat_ov: 2.8,
            vbat_uv: 2.2,
            vbat_ok_prog: 2.25,
            vbat_ok_hyst: 2.4
        }
    }
};

// Main function to calculate all resistances
function calculateAllResistances() {
    calculateVBAT_OV();
    calculateVBAT_UV();
    calculateBatteryOK();
    calculateMPPT();
}

// Function to handle battery type selection
function handleBatteryTypeChange() {
    const batteryType = document.getElementById('battery-type').value;
    const preset = BATTERY_PRESETS[batteryType];
    const batteryInfo = document.getElementById('battery-info');
    
    // Update battery info display
    if (batteryType === 'custom') {
        batteryInfo.innerHTML = '<p>Enter voltages manually below.</p>';
    } else {
        const voltageList = Object.entries(preset.voltages)
            .map(([key, value]) => {
                const label = getVoltageLabel(key);
                return `<div class="voltage-item">
                    <div class="voltage-label">${label}</div>
                    <div class="voltage-value">${value}V</div>
                </div>`;
            }).join('');
        
        batteryInfo.innerHTML = `
            <p><strong>${preset.name}</strong> - ${preset.description}</p>
            <div class="voltage-list">${voltageList}</div>
        `;
        
        // Populate voltage inputs
        populateVoltageInputs(preset.voltages);
    }
}

// Function to get display label for voltage keys
function getVoltageLabel(key) {
    const labels = {
        'vbat_ov': 'OV',
        'vbat_uv': 'UV',
        'vbat_ok_prog': 'VBAT_OK',
        'vbat_ok_hyst': 'VBAT_OK_HYST'
    };
    return labels[key] || key;
}

// Function to populate voltage inputs
function populateVoltageInputs(voltages) {
    Object.entries(voltages).forEach(([key, value]) => {
        const input = document.getElementById(key);
        if (input) {
            input.value = value;
            // Trigger input event to recalculate
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });
}

// VBAT_OV (Overvoltage) calculation
function calculateVBAT_OV() {
    const vbat_ov = parseFloat(document.getElementById('vbat_ov').value);
    
    if (!isValidVoltage(vbat_ov, CONSTANTS.VBAT_OV_MIN, CONSTANTS.VBAT_OV_MAX)) {
        clearResults(['rov1_result', 'rov2_result']);
        return;
    }
    
    // Correct BQ25504 formula according to Excel:
    // VBAT_OV = VREF * (1 + ROV2/ROV1) * 3/2
    // Where ROV1 + ROV2 = 10 MΩ
    // Solving: ROV1 = ROV_TOTAL * VREF / VBAT_OV * 3/2
    // ROV2 = ROV_TOTAL - ROV1
    const rov1 = CONSTANTS.ROV_TOTAL * (3/2) * CONSTANTS.VREF / vbat_ov;
    const rov2 = CONSTANTS.ROV_TOTAL - rov1;
    
    // Verify that values are positive
    if (rov1 < 0 || rov2 < 0) {
        clearResults(['rov1_result', 'rov2_result']);
        return;
    }
    
    displayResistance('rov1_result', rov1);
    displayResistance('rov2_result', rov2);
}

// VBAT_UV (Undervoltage) calculation
function calculateVBAT_UV() {
    const vbat_uv = parseFloat(document.getElementById('vbat_uv').value);
    
    if (!isValidVoltage(vbat_uv, CONSTANTS.VBAT_UV_MIN, CONSTANTS.VBAT_OV_MAX)) {
        clearResults(['ruv1_result', 'ruv2_result']);
        return;
    }
    
    // Correct BQ25504 formula according to Excel:
    // VBAT_UV = VREF * (1 + RUV2/RUV1)
    // Where RUV1 + RUV2 = 10 MΩ
    // Solving: RUV1 = RUV_TOTAL * VREF / VBAT_UV
    // RUV2 = RUV_TOTAL - RUV1
    const ruv1 = CONSTANTS.RUV_TOTAL * CONSTANTS.VREF / vbat_uv;
    const ruv2 = CONSTANTS.RUV_TOTAL - ruv1;
    
    // Verify that values are positive
    if (ruv1 < 0 || ruv2 < 0) {
        clearResults(['ruv1_result', 'ruv2_result']);
        return;
    }
    
    displayResistance('ruv1_result', ruv1);
    displayResistance('ruv2_result', ruv2);
}

// Battery OK Threshold calculation
function calculateBatteryOK() {
    const vbat_ok_prog = parseFloat(document.getElementById('vbat_ok_prog').value);
    const vbat_ok_hyst = parseFloat(document.getElementById('vbat_ok_hyst').value);
    
    if (!isValidVoltage(vbat_ok_prog, CONSTANTS.VBAT_OV_MIN, CONSTANTS.VBAT_OV_MAX) ||
        !isValidVoltage(vbat_ok_hyst, vbat_ok_prog + 0.1, CONSTANTS.VBAT_OV_MAX)) {
        clearResults(['rok1_result', 'rok2_result', 'rok3_result']);
        return;
    }
    
    // Correct BQ25504 formulas according to Excel:
    // ROK1 = RSUM * VREF / VBAT_OK_HYST
    // ROK2 = ROK1 * (VBAT_OK_PROG/VREF - 1)
    // ROK3 = RSUM - ROK1 - ROK2
    // VBAT_OK = VREF * (1 + ROK2/ROK1)
    // VBAT_OK_HYST = VREF * ((ROK1+ROK2+ROK3)/ROK1)
    
    const rok1 = CONSTANTS.ROK_TOTAL * CONSTANTS.VREF / vbat_ok_hyst;
    const rok2 = rok1 * (vbat_ok_prog / CONSTANTS.VREF - 1);
    const rok3 = CONSTANTS.ROK_TOTAL - rok1 - rok2;
    
    // Verify that all values are positive and reasonable
    if (rok1 < 0 || rok2 < 0 || rok3 < 0 || rok1 > CONSTANTS.ROK_TOTAL || rok2 > CONSTANTS.ROK_TOTAL || rok3 > CONSTANTS.ROK_TOTAL) {
        clearResults(['rok1_result', 'rok2_result', 'rok3_result']);
        return;
    }
    
    displayResistance('rok1_result', rok1);
    displayResistance('rok2_result', rok2);
    displayResistance('rok3_result', rok3);
}

// MPPT Sampling Network calculation
function calculateMPPT() {
    const mpp_threshold = parseFloat(document.getElementById('mpp_threshold').value);
    
    if (!isValidMPP(mpp_threshold)) {
        clearResults(['roc1_result', 'roc2_result']);
        return;
    }
    
    // Correct BQ25504 formula for MPPT:
    // MPP% = 100% * (ROC1 / (ROC1 + ROC2))
    // Where ROC1 + ROC2 = 20 MΩ
    // Solving: ROC1 = ROC_TOTAL * (MPP_THRESHOLD / 100)
    // ROC2 = ROC_TOTAL - ROC1
    const roc1 = CONSTANTS.ROC_TOTAL * (mpp_threshold / 100);
    const roc2 = CONSTANTS.ROC_TOTAL - roc1;
    
    // Verify that values are positive
    if (roc1 < 0 || roc2 < 0) {
        clearResults(['roc1_result', 'roc2_result']);
        return;
    }
    
    displayResistance('roc1_result', roc1);
    displayResistance('roc2_result', roc2);
}

// Function to validate voltages
function isValidVoltage(value, min, max) {
    return !isNaN(value) && value >= min && value <= max;
}

// Function to validate MPP threshold
function isValidMPP(value) {
    return !isNaN(value) && value >= CONSTANTS.MPP_MIN && value <= CONSTANTS.MPP_MAX;
}

// Function to display formatted resistances
function displayResistance(elementId, resistance) {
    const element = document.getElementById(elementId);
    
    if (resistance < 0) {
        element.textContent = 'Error';
        element.style.color = '#e53e3e';
        return;
    }
    
    // Format resistance according to its magnitude
    let formattedValue;
    if (resistance >= 1e6) {
        formattedValue = (resistance / 1e6).toFixed(2) + ' MΩ';
    } else if (resistance >= 1e3) {
        formattedValue = (resistance / 1e3).toFixed(1) + ' kΩ';
    } else {
        formattedValue = resistance.toFixed(0) + ' Ω';
    }
    
    element.textContent = formattedValue;
    element.style.color = '#38b2ac';
}

// Function to clear results
function clearResults(elementIds) {
    elementIds.forEach(id => {
        const element = document.getElementById(id);
        element.textContent = '-';
        element.style.color = '#a0aec0';
    });
}

// Function to find the nearest standard resistance value
function findNearestStandardResistance(resistance) {
    // Standard 1% resistance values (E96 series)
    const standardValues = [
        100, 102, 105, 107, 110, 113, 115, 118, 121, 124, 127, 130, 133, 137, 140, 143, 147, 150, 154, 158, 162, 165, 169, 174, 178, 182, 187, 191, 196, 200, 205, 210, 215, 221, 226, 232, 237, 243, 249, 255, 261, 267, 274, 280, 287, 294, 301, 309, 316, 324, 332, 340, 348, 357, 365, 374, 383, 392, 402, 412, 422, 432, 442, 453, 464, 475, 487, 499, 511, 523, 536, 549, 562, 576, 590, 604, 619, 634, 649, 665, 681, 698, 715, 732, 750, 768, 787, 806, 825, 845, 866, 887, 909, 931, 953, 976
    ];
    
    // Scale according to resistance magnitude
    let scale = 1;
    if (resistance >= 1e6) {
        scale = 1e6;
    } else if (resistance >= 1e3) {
        scale = 1e3;
    }
    
    const scaledResistance = resistance / scale;
    const nearest = standardValues.reduce((prev, curr) => 
        Math.abs(curr - scaledResistance) < Math.abs(prev - scaledResistance) ? curr : prev
    );
    
    return nearest * scale;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for battery type selection
    const batteryTypeSelect = document.getElementById('battery-type');
    batteryTypeSelect.addEventListener('change', handleBatteryTypeChange);
    
    // Add event listeners to all inputs
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', calculateAllResistances);
        input.addEventListener('change', calculateAllResistances);
    });
    
    // Calculate initially
    calculateAllResistances();
    
    // Initialize battery info display
    handleBatteryTypeChange();
    
    // Add real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const value = parseFloat(this.value);
            const min = parseFloat(this.min);
            const max = parseFloat(this.max);
            
            if (value < min || value > max) {
                this.style.borderColor = '#e53e3e';
                this.style.backgroundColor = '#fed7d7';
            } else {
                this.style.borderColor = '#e2e8f0';
                this.style.backgroundColor = 'white';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
            this.style.backgroundColor = 'white';
        });
    });
});

// Function to export results (optional)
function exportResults() {
    const results = {
        vbat_ov: {
            voltage: document.getElementById('vbat_ov').value,
            rov1: document.getElementById('rov1_result').textContent,
            rov2: document.getElementById('rov2_result').textContent
        },
        vbat_uv: {
            voltage: document.getElementById('vbat_uv').value,
            ruv1: document.getElementById('ruv1_result').textContent,
            ruv2: document.getElementById('ruv2_result').textContent
        },
        battery_ok: {
            vbat_ok_prog: document.getElementById('vbat_ok_prog').value,
            vbat_ok_hyst: document.getElementById('vbat_ok_hyst').value,
            rok1: document.getElementById('rok1_result').textContent,
            rok2: document.getElementById('rok2_result').textContent,
            rok3: document.getElementById('rok3_result').textContent
        },
        mppt: {
            threshold: document.getElementById('mpp_threshold').value,
            roc1: document.getElementById('roc1_result').textContent,
            roc2: document.getElementById('roc2_result').textContent
        }
    };
    
    console.log('BQ25504 Results:', results);
    return results;
}