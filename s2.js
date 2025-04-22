// Initialize LocomotiveScroll for smooth scrolling
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// Create a function to handle the text revealing animation
function initTextReveal() {
    // Make sure the elements are initially hidden and positioned correctly
    gsap.set(".box .boxelem", {
        y: "100%",
        opacity: 0
    });
    
    // Animate the elements into view
    gsap.to(".box .boxelem", {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        delay: 0.5,
        stagger: 0.25,
        ease: "power3.out"
    });
}

// Create a smooth moving dot cursor
function initFollowCursor() {
    const dot = document.querySelector("#dot");
    
    window.addEventListener("mousemove", function(dets) {
        // Add Tailwind classes programmatically if needed
        gsap.to(dot, {
            left: dets.clientX,
            top: dets.clientY,
            duration: 0.3
        });
    });
}

// Create hover animations for project elements
function initHoverEffect() {
    document.querySelectorAll(".elem").forEach(function(elem) {
        const image = elem.querySelector("img");
        const h1 = elem.querySelector("h1");
        
        elem.addEventListener("mouseenter", function() {
            gsap.to(image, {
                opacity: 1,
                duration: 0.5
            });
            gsap.to(h1, {
                opacity: 1,
                duration: 0.5
            });
        });
        
        elem.addEventListener("mouseleave", function() {
            gsap.to(image, {
                opacity: 0,
                duration: 0.5
            });
            gsap.to(h1, {
                opacity: 0.6,
                duration: 0.5
            });
        });
        
        elem.addEventListener("mousemove", function(dets) {
            gsap.to(image, {
                left: dets.clientX,
                top: dets.clientY,
                duration: 0.3
            });
        });
    });
}

// Display real-time in the footer
function updateRealTime() {
    const realTimeElement = document.getElementById("realtime");
    
    function updateTime() {
        const now = new Date();
        const options = { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
        };
        
        // Add Tailwind classes to the time element if needed
        realTimeElement.textContent = now.toLocaleTimeString('en-US', options) + " IST";
    }
    
    // Update the time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);
}

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    initTextReveal(); // Add this line to initialize the text reveal animation
    initFollowCursor();
    initHoverEffect();
    updateRealTime();
});
