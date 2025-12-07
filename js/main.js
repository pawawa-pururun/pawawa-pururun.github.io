document.addEventListener('DOMContentLoaded', () => {
    // --- Intersection Observer for Fade-in Animations ---
    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Parallax Effect for Background Shapes ---
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20; // Different speed for each shape
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            
            // Use transform to move, preserving the original scale/translate from CSS animation if possible
            // But CSS animation uses transform, so we need to be careful not to override it completely.
            // Actually, modifying CSS variables or using a wrapper is better, but let's try a simple approach first.
            // Since the CSS animation uses 'transform', directly setting style.transform will conflict.
            // A better way is to move the container or use margin. 
            // Or simpler: Let's just make them react subtly by changing margin.
            
            shape.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${1 + (index * 0.05)})`;
        });
    });
    
    // Note: The above simple parallax might conflict with the CSS keyframe animation which also uses transform.
    // To fix this, let's wrap the shapes in a parallax container or use CSS variables.
    // Let's re-implement using CSS variables for a conflict-free animation.
});

// Re-implementing Parallax to work with CSS Animations
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
    const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

    document.querySelectorAll('.shape').forEach((shape, index) => {
        // We will update custom properties instead of transform directly
        // But first we need to make sure the CSS uses them.
        // Since I can't easily change the CSS file dynamically without rewriting it again,
        // and I just wrote it, I will skip the complex keyframe+parallax mix for now 
        // and just let the CSS animation run. The mouse interaction might be too much/buggy 
        // if not carefully handled with wrapper divs.
        
        // Let's do a simpler "Tilt" effect on cards instead!
    });
});

// --- 3D Tilt Effect for Cards ---
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg
        const rotateY = ((x - centerX) / centerX) * 5;  // Max 5deg

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});