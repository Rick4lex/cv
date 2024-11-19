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

// Variables para el carrusel
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
let currentSlide = 0;
let slideWidth;
let slidesToShow = 3; // Número predeterminado de ítems a mostrar
let totalSlides = slides.length;

// Función para ajustar el carrusel según el tamaño de la ventana
function setTrackWidth() {
    const containerWidth = document.querySelector('.carousel-container').offsetWidth;

    // Ajusta cuántos ítems mostrar dependiendo del tamaño de la pantalla
    if (containerWidth > 1024) {
        slidesToShow = 3; // En pantallas grandes, mostramos 3 ítems
    } else if (containerWidth > 768) {
        slidesToShow = 2; // En pantallas medianas, mostramos 2 ítems
    } else {
        slidesToShow = 1; // En pantallas pequeñas, mostramos 1 ítem
    }

    // Calcula el ancho de cada ítem y ajusta el ancho total de la pista
    slideWidth = containerWidth / slidesToShow;
    track.style.width = `${totalSlides * slideWidth}px`;

    // Establece el ancho de cada ítem en el carrusel
    slides.forEach(slide => {
        slide.style.width = `${slideWidth}px`;
    });

    // Reinicia el carrusel al primer ítem
    moveToSlide(track, currentSlide);
}

// Función para mover el carrusel
function moveToSlide(track, currentSlide) {
    const amountToMove = currentSlide * slideWidth;
    track.style.transform = `translateX(-${amountToMove}px)`;
}


// Evento para el botón "Siguiente"
nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides; // Carrusel infinito
    moveToSlide(currentSlide);
});

// Evento para el botón "Anterior"
prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Carrusel infinito
    moveToSlide(currentSlide);
});

// Ajustar el carrusel cuando la ventana cambie de tamaño
window.addEventListener('resize', setTrackWidth);

// Llamada inicial para ajustar el carrusel al cargar
setTrackWidth();

// Filtro de portafolio
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        let visibleItems = 0; // Contador para verificar cuántos ítems están visibles

        slides.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                visibleItems++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Filtrar diapositivas visibles y ajustar el carrusel
        const filteredSlides = slides.filter(slide => slide.style.display !== 'none');
        totalSlides = filteredSlides.length;  // Recalcula el número total de ítems visibles
        setTrackWidth(); // Ajusta el ancho de la pista del carrusel después del filtro

        // Reinicia el carrusel al primer ítem
        currentSlide = 0;
        moveToSlide(track, currentSlide);

    });
});

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