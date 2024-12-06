// Función para activar una o varias secciones
function activateSection(sectionId) {
    document.querySelectorAll('.tab-content').forEach(section => section.classList.remove('active'));  // Oculta todas las secciones

    if (sectionId === '#all') {  // Si se selecciona "Todo"
        // Muestra las secciones que queremos combinar
        document.querySelector('#about').classList.add('active');
        document.querySelector('#contact').classList.add('active');
        document.querySelector('#portfolio').classList.add('active');
        document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });  // Desplazar hacia la primera sección visible
    } else {
        // Muestra solo la sección seleccionada
        const targetSection = document.querySelector(sectionId);
        if (targetSection) {  // Verifica que la sección exista
            targetSection.classList.add('active');
            targetSection.scrollIntoView({ behavior: 'smooth' });  // Desplazamiento suave
        }
    }
}

// Variables globales
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentSlide = 1;
let slideWidth = 0;
let slidesToShow = 3; // Predeterminado
let totalSlides = slides.length;

// **1. Ajusta el ancho del carrusel según la pantalla**
function setTrackWidth() {
    const containerWidth = document.querySelector('.carousel-container').offsetWidth;

    // Determina cuántos ítems mostrar dependiendo del ancho de la pantalla
    slidesToShow = containerWidth > 1024 ? 3 : containerWidth > 768 ? 2 : 1;

    // Ajusta el ancho de cada slide
    slideWidth = containerWidth / slidesToShow;
    track.style.width = `${totalSlides * slideWidth}px`;

    slides.forEach(slide => {
        slide.style.width = `${slideWidth}px`;
    });

    // Ajusta la posición del carrusel
    moveToSlide(currentSlide);
}

// **2. Mueve el carrusel a la posición deseada**
function moveToSlide(index) {
    const distance = index * slideWidth;
    track.style.transform = `translateX(-${distance}px)`;
}

// **3. Cambia el slide con los botones de navegación**
nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    moveToSlide(currentSlide);
});

prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    moveToSlide(currentSlide);
});

// **4. Ajusta el carrusel al redimensionar la ventana**
window.addEventListener('resize', setTrackWidth);

// **5. Filtrado de portafolio**
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        slides.forEach(slide => {
            const category = slide.dataset.category;

            // Muestra u oculta los ítems según el filtro
            if (filter === 'all' || category === filter) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });

        // Recalcula las diapositivas visibles
        const visibleSlides = slides.filter(slide => slide.style.display !== 'none');
        totalSlides = visibleSlides.length;

        // Reajusta el carrusel después del filtrado
        setTrackWidth();
        currentSlide = 0; // Reinicia el índice
        moveToSlide(currentSlide);
    });
});

// **6. Automatización del carrusel**
let autoSlide = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    moveToSlide(currentSlide);
}, 5000);

// **7. Reinicia el temporizador de auto-slide al interactuar manualmente**
[nextButton, prevButton].forEach(button => {
    button.addEventListener('click', () => {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            moveToSlide(currentSlide);
        }, 5000);
    });
});

// **8. Llama la función inicial**
setTrackWidth();

// Navegación de la sidebar
document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        activateSection(link.getAttribute('href'));
    });
});

// Navegación del footer
document.querySelectorAll('.footer-nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        activateSection(anchor.getAttribute('href'));  // Activa la sección y realiza el desplazamiento
    });
});