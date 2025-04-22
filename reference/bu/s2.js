// Initialize LocomotiveScroll for smooth scrolling
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// Function to update the position and scale of the dot based on mouse movement
function circleMousefollow(xscale, yscale) {
    window.addEventListener('mousemove', function (details) {
        document.querySelector('#dot').style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

// Animation function for the hero section
function HeroAnim() {
    var tl = gsap.timeline();

    // Animation for the navigation bar
    tl.from('#nav', {
        y: -10,
        opacity: 0,
        ease: Expo.easeInOut,
        duration: 0.6
    });

    // Animation for elements with class 'boxelem'
    tl.to('.boxelem', {
        y: 0,
        opacity: 1,
        ease: Expo.EaseInOut,
        duration: 1,
        stagger: 0.1,
        delay: 0.5
    });

    // Animation for the hero footer
    tl.from('#herofooter', {
        y: 10,
        opacity: 0,
        ease: Expo.EaseInOut,
        duration: 0.4,
        delay: 0.1
    });
}

// Variable for setTimeout to manage circleMousefollow updates
var timeout;

// Function to create a skew effect based on mouse movement
function circleskew() {
    var xscale = 1;
    var yscale = 1;
    var xprev = 0;
    var yprev = 0;

    window.addEventListener('mousemove', function (details) {
        clearTimeout(timeout);

        // Calculate and limit the scale values
        xscale = gsap.utils.clamp(0.8, 1.2, details.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, details.clientY - yprev);

        xprev = details.clientX;
        yprev = details.clientY;

        // Update the dot position and scale
        circleMousefollow(xscale, yscale);

        // Reset the dot position and scale after a delay
        timeout = setTimeout(function () {
            document.querySelector('#dot').style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`;
        }, 100);
    });
}

// Function to update and display real-time with AM/PM and time zone
function updateRealTime() {
    const date = new Date();
    const hours = date.getHours() % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const meridiem = date.getHours() >= 12 ? 'PM' : 'AM';
    const timeZone = new Date().toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2];
    const timeString = `${hours}:${minutes} ${meridiem} ${timeZone}`;
    const timeElement = document.getElementById('realtime');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Call the functions to initialize the effects
circleMousefollow();
HeroAnim();
circleskew();
updateRealTime();

setInterval(updateRealTime, 60000);

// Add event listeners to elements with class 'elem'
document.querySelectorAll('.elem').forEach(function (elem) {
    var rotate = 0;
    var rotatediff = 0;

    // Mouseleave event handler to hide image
    elem.addEventListener("mouseleave", function (details) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    // Mousemove event handler to create hover effect with image
    elem.addEventListener("mousemove", function (details) {
        var diff = details.clientY - elem.getBoundingClientRect().top;

        rotatediff = details.clientX - rotate;
        rotate = details.clientX;

        // Animate the image's position and rotation
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, rotatediff * 0.5)
        });
    });
});

// Get the dot element
const dot = document.querySelector('#dot');

// Add event listeners to img elements inside divs with class 'elem'
document.querySelectorAll('.elem img').forEach(function (img) {
    // Mouseenter event handler to increase the size of the dot
    img.addEventListener('mouseenter', function () {
        console.log('mouseenter')
        gsap.to(dot, {
            scale: 2, // Increase the scale as needed
            duration: 0.3, // Duration of the scale animation
            ease: 'power1.out', // Easing function for the animation
        });
    });

    // Mouseleave event handler to reset the size of the dot
    img.addEventListener('mouseleave', function () {
        gsap.to(dot, {
            scale: 1, // Reset the scale
            duration: 0.3, // Duration of the scale animation
            ease: 'power1.out', // Easing function for the animation
        });
    });
});
