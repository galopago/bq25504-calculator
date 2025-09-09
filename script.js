// Función principal para calcular la suma
function calcularSuma() {
    // Obtener los valores de los inputs
    const numero1 = document.getElementById('numero1').value;
    const numero2 = document.getElementById('numero2').value;
    const resultado = document.getElementById('resultado');
    
    // Validar que ambos campos tengan valores
    if (numero1 === '' || numero2 === '') {
        mostrarError('Por favor, ingresa ambos números');
        return;
    }
    
    // Convertir a números y validar
    const num1 = parseFloat(numero1);
    const num2 = parseFloat(numero2);
    
    if (isNaN(num1) || isNaN(num2)) {
        mostrarError('Por favor, ingresa números válidos');
        return;
    }
    
    // Calcular la suma
    const suma = num1 + num2;
    
    // Mostrar el resultado
    mostrarResultado(num1, num2, suma);
}

// Función para mostrar el resultado
function mostrarResultado(num1, num2, suma) {
    const resultado = document.getElementById('resultado');
    
    // Formatear números para mostrar (máximo 2 decimales)
    const num1Formateado = num1 % 1 === 0 ? num1 : num1.toFixed(2);
    const num2Formateado = num2 % 1 === 0 ? num2 : num2.toFixed(2);
    const sumaFormateada = suma % 1 === 0 ? suma : suma.toFixed(2);
    
    resultado.innerHTML = `
        <div style="font-size: 1.1rem; margin-bottom: 10px;">
            <strong>${num1Formateado}</strong> + <strong>${num2Formateado}</strong>
        </div>
        <div style="font-size: 1.5rem; color: #2d3748;">
            = <strong>${sumaFormateada}</strong>
        </div>
    `;
    
    // Aplicar clase de animación
    resultado.classList.add('mostrar');
    
    // Remover la clase después de la animación
    setTimeout(() => {
        resultado.classList.remove('mostrar');
    }, 300);
}

// Función para mostrar errores
function mostrarError(mensaje) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `<span style="color: #e53e3e;">${mensaje}</span>`;
    resultado.classList.remove('mostrar');
}

// Función para limpiar los campos
function limpiarCampos() {
    document.getElementById('numero1').value = '';
    document.getElementById('numero2').value = '';
    document.getElementById('resultado').innerHTML = '<span>El resultado aparecerá aquí</span>';
    document.getElementById('resultado').classList.remove('mostrar');
}

// Event listeners para mejorar la experiencia del usuario
document.addEventListener('DOMContentLoaded', function() {
    const numero1 = document.getElementById('numero1');
    const numero2 = document.getElementById('numero2');
    const calcular = document.getElementById('calcular');
    
    // Permitir calcular con Enter
    numero1.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            numero2.focus();
        }
    });
    
    numero2.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calcularSuma();
        }
    });
    
    // Limpiar resultado cuando el usuario empiece a escribir
    numero1.addEventListener('input', function() {
        if (this.value !== '' || document.getElementById('numero2').value !== '') {
            document.getElementById('resultado').innerHTML = '<span>El resultado aparecerá aquí</span>';
        }
    });
    
    numero2.addEventListener('input', function() {
        if (this.value !== '' || document.getElementById('numero1').value !== '') {
            document.getElementById('resultado').innerHTML = '<span>El resultado aparecerá aquí</span>';
        }
    });
    
    // Efecto hover en el botón
    calcular.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    calcular.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});
