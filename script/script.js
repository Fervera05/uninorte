

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const nombre = document.getElementById('nombre').value;
    const mensaje = document.getElementById('mensaje').value;

    if (nombre.trim() && mensaje.trim()) {
      alert(`¡Gracias por tu mensaje, ${nombre}! Pronto nos pondremos en contacto.`);
      form.reset();
    } else {
      alert('Por favor, completá todos los campos.');
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const nombre = document.getElementById('nombre').value;
    const mensaje = document.getElementById('mensaje').value;

    if (nombre.trim() && mensaje.trim()) {
      alert(`¡Gracias por tu mensaje, ${nombre}! Pronto nos pondremos en contacto.`);
      form.reset();
    } else {
      alert('Por favor, completá todos los campos.');
    }
  });
});

