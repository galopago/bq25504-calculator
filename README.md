# 🔋 Calculadora BQ25504

Una calculadora web profesional para configurar resistencias del chip BQ25504, construida con HTML, CSS y JavaScript vanilla.

## ✨ Características

- ✅ **Interfaz moderna y responsiva** - Se adapta a móviles, tablets y desktop
- ✅ **Cálculos precisos** - Fórmulas exactas del datasheet BQ25504
- ✅ **Validación de rangos** - Previene valores fuera de especificación
- ✅ **Animaciones suaves** - Efectos visuales atractivos
- ✅ **Cálculo en tiempo real** - Resultados instantáneos al cambiar valores
- ✅ **Sin dependencias** - Solo HTML, CSS y JavaScript puro

## 🚀 Ver en Acción

### 🌐 Enlaces Directos (Haz clic para abrir)

[![Abrir con HTML Preview](https://img.shields.io/badge/HTML%20Preview-Abrir%20Calculadora-blue?style=for-the-badge&logo=html5)](https://htmlpreview.github.io/?https://raw.githubusercontent.com/galopago/bq25504-calculator/main/index.html)

[![Abrir con Raw.githack](https://img.shields.io/badge/Raw.githack-Abrir%20Calculadora-green?style=for-the-badge&logo=github)](https://raw.githack.com/galopago/bq25504-calculator/main/index.html)

[![Abrir con Statically](https://img.shields.io/badge/Statically-Abrir%20Calculadora-orange?style=for-the-badge&logo=cdn)](https://cdn.statically.io/gh/galopago/bq25504-calculator/main/index.html)

### 🔗 Enlaces Alternativos

- **HTML Preview**: https://htmlpreview.github.io/?https://raw.githubusercontent.com/galopago/bq25504-calculator/main/index.html
- **Raw.githack**: https://raw.githack.com/galopago/bq25504-calculator/main/index.html
- **Statically CDN**: https://cdn.statically.io/gh/galopago/bq25504-calculator/main/index.html

## 🛠️ Cómo Usar

1. **Abre cualquiera de los enlaces de arriba**
2. **Configura VBAT_OV** - Voltaje máximo de batería (2.2V - 5.2V)
3. **Configura VBAT_UV** - Voltaje mínimo de batería (2.2V - 5.2V)
4. **Configura Battery OK** - Umbrales de batería OK y histéresis
5. **Configura MPPT** - Porcentaje del punto de máxima potencia (50% - 100%)
6. **Ve los valores de resistencias** calculados automáticamente

## ⌨️ Atajos de Teclado

- **Tab**: Moverse entre campos
- **Escribir**: Calcula automáticamente las resistencias
- **Cambiar valores**: Actualización en tiempo real

## 📱 Responsive Design

La calculadora se adapta perfectamente a:
- 📱 **Móviles** (320px+) - Layout vertical optimizado
- 📱 **Tablets** (768px+) - Grid de 2 columnas
- 💻 **Desktop** (1024px+) - Grid de 4 columnas

## 🎨 Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con Flexbox y Grid
- **JavaScript ES6+** - Cálculos precisos del BQ25504
- **Fórmulas del Datasheet** - Implementación exacta de Texas Instruments
- **Validación en tiempo real** - Rangos y restricciones dinámicas

## 📁 Estructura del Proyecto

```
bq25504-calculator/
├── index.html          # Calculadora BQ25504
├── styles.css          # Estilos responsivos
├── script.js           # Fórmulas del BQ25504
└── README.md           # Documentación
```

## 🔧 Parámetros Calculados

- **VBAT_OV**: ROV1 + ROV2 = 10 MΩ (2.2V - 5.2V)
- **VBAT_UV**: RUV1 + RUV2 = 10 MΩ (2.2V - 5.2V)  
- **Battery OK**: ROK1 + ROK2 + ROK3 = 10 MΩ
- **MPPT**: ROC1 + ROC2 = 20 MΩ (50% - 100%)

## 🔧 Instalación Local (Opcional)

Si quieres ejecutar localmente:

```bash
# Clonar el repositorio
git clone https://github.com/galopago/bq25504-calculator.git

# Navegar al directorio
cd bq25504-calculator

# Abrir index.html en tu navegador
# O usar un servidor local:
python3 -m http.server 8000
# Luego ir a: http://localhost:8000
```

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar la calculadora:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Alberto Nunez** - [@galopago](https://github.com/galopago)

---

⭐ **¡Dale una estrella si te gusta este proyecto!** ⭐
