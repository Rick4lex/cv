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

let currentSlide = 3;
let slideWidth = 0;
let slidesToShow = 3; // Predeterminado
let totalSlides = slides.length;

// **Clonar elementos para crear ciclo infinito**
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

track.appendChild(firstClone); // Clona el primer slide al final
track.insertBefore(lastClone, slides[0]); // Clona el último slide al principio

const allSlides = Array.from(track.children); // Lista completa con clones


// **1. Ajusta el ancho del carrusel según la pantalla**
function setTrackWidth() {
    const containerWidth = document.querySelector('.carousel-container').offsetWidth;

    // Determina cuántos ítems mostrar dependiendo del ancho de la pantalla
    slidesToShow = containerWidth > 1024 ? 3 : containerWidth > 768 ? 2 : 1;

    // Ajusta el ancho de cada slide
    slideWidth = containerWidth / slidesToShow;
    track.style.width = `${totalSlides * slideWidth}px`;

    allSlides.forEach(slide => {
        slide.style.width = `${slideWidth}px`;
    });

    // Ajusta la posición del carrusel
    moveToSlide(currentSlide, false);
}

// **2. Mueve el carrusel a la posición deseada**
function moveToSlide(index, withTransition = true) {
    const distance = index * slideWidth;
    if (!withTransition) track.style.transition = 'none';
    else track.style.transition = 'transform 0.5s ease-in-out';

    track.style.transform = `translateX(-${distance}px)`;
}

function handleInfiniteLoop() {
    if (currentSlide >= allSlides.length - 1) {
        track.style.transition = 'none';
        currentSlide = 1; // Salta al primer slide real
        moveToSlide(currentSlide, false);
    }

    if (currentSlide <= 0) {
        track.style.transition = 'none';
        currentSlide = allSlides.length - 2; // Salta al último slide real
        moveToSlide(currentSlide, false);
    }
}


// **3. Cambia el slide con los botones de navegación**
nextButton.addEventListener('click', () => {
    currentSlide++;
    moveToSlide(currentSlide);
    setTimeout(handleInfiniteLoop, 500);
});

prevButton.addEventListener('click', () => {
    currentSlide--;
    moveToSlide(currentSlide);
    setTimeout(handleInfiniteLoop, 500);
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
    currentSlide++;
    moveToSlide(currentSlide);
    setTimeout(handleInfiniteLoop, 500);
}, 5000);

// **7. Reinicia el temporizador de auto-slide al interactuar manualmente**
[nextButton, prevButton].forEach(button => {
    button.addEventListener('click', () => {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => {
            currentSlide++;
            moveToSlide(currentSlide);
            setTimeout(handleInfiniteLoop, 500);
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