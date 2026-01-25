/**
 * JAPA UNIVERSE - INÍCIO ULTRA-FAST
 */
(function() {
    const loader = document.querySelector(".loading-overlay");
    
    // 1. REMOÇÃO IMEDIATA DO LOADER
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 100);
    }

    const startApp = () => {
        // Inicializa animações GSAP com prioridade de GPU
        if (typeof gsap !== "undefined") {
            gsap.to(".gsap-fade-up", {
                duration: 0.5,
                y: 0,
                opacity: 1,
                stagger: 0.05,
                ease: "power1.out",
                force3D: true
            });
        }

        // Carregamento de imagens críticas (Tigre) em background
        const priorityImg = new Image();
        priorityImg.src = '../IMG/tiger.webp';
    };

    if (document.readyState === "complete") {
        startApp();
    } else {
        window.addEventListener("load", startApp);
    }
})();