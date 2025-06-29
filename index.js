let loader = document.querySelector('.loader');
// // For stars
let body = document.querySelector('body');
function getStars() {
    for(i = 0; i < 200; i++) {
        let star = document.createElement('div');
        star.className = 'stars';  
        star.style.borderRadius = '50%';
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        setTimeout(() => {
            body.appendChild(star);
        }, 1000);
    }
}
// getStars();

// For window load animations
let phrase1 = 'Search over 4,000 exoplanets and Uncover the secrets of the universe\n&\nwith Amazing Quiz and many more!';
let container = document.querySelector('.container');
let containerLogo = container.querySelector('.logo');
let pageName = document.querySelector('.pageName');
let centeredContent = document.querySelector('.centered-content');
let phrase = centeredContent.querySelector('.phrase');
window.addEventListener('load', (event) => {
    // For logos and website name
    containerLogo.style.transform = 'translateX(0%)';
    pageName.style.transform = 'translateY(0%)';
    // For the phrase
    for(let i = 0; i < phrase1.length; i++) {
        setTimeout(() => {
            if(phrase1.charAt(i) === '\n') {
                phrase.innerHTML += '<br>';
            }
            phrase.innerHTML += phrase1.charAt(i);
        }, i * 30);
    }
    // For button visibility
    setTimeout(() => {
        exploreButton.style.opacity = '1';
    }, 500);
    // For the message of being online
    window.addEventListener('online', () => {
        let msg = document.createElement('div');
        msg.classList.add('beingOnline');
        body.appendChild(msg);
        msg.innerText = "You're online again, please refresh if content is not loaded!";
        // hiding the loader
        loader.style.display = 'none';
        msg.style.display = 'inline-block';
        setTimeout(() => {
            msg.style.display = 'none';
            msg.remove();
        }, 3000);
    })
    // For the message of being offline
    window.addEventListener('offline', () => {
        let msg = document.createElement('div');
        msg.classList.add('beingOnline');
        body.appendChild(msg);
        msg.innerText = "You're offline, please check your internet connection!";
        msg.style.display = 'inline-block';
        setTimeout(() => {
            msg.style.display = 'none';
            msg.remove();
        }, 3000);
    })
});

// For close button
let closeBtn = document.querySelector('.hiddenContainer .closeBtn');
let hiddenContainer = document.querySelector('.hiddenContainer');
closeBtn.addEventListener('click', function (event) {
    hiddenContainer.style.top = '1000px';
    exploreButton.style.visibility = 'visible';
    // Closing the sidebar in mobile view
    sidebar.style.top = '1500px';
    // Transition takes place here 
    setTimeout(() => {
        // closing the sidebar in mobile view
        sidebar.style.display = 'none'; 
        hiddenContainer.style.display = 'none';
    }, 400);
})

// For explore button
let exploreButton = document.querySelector('.explore');
exploreButton.addEventListener('click', function (event) {
    hiddenContainer.style.display = 'flex';
    // Transition takes place as soon as it is visible by flex
    // explore button color change
    if(getComputedStyle(hiddenContainer).display === 'flex') {
        exploreButton.style.visibility = 'hidden';
    }
    hiddenContainer.style.top = '10px';
})

// For generating random facts
let factsGeneratingLink = "https://raw.githubusercontent.com/Abrar822/Exoplanets-Facts/refs/heads/main/exoplanet_facts.json";
let leftP = document.querySelector('.leftP');
async function fetcher() {
    let response = await fetch(factsGeneratingLink);
    let data = await response.json();
    let myFact = data[Math.floor(Math.random() * data.length)].fact;
    leftP.innerText = myFact;
}
async function generatingFacts() {
    loader.style.display = 'flex';
    await fetcher();
    loader.style.display = 'none';
}
generatingFacts();

// For generating random images
let images = ['sun.png', 'mercury.png', 'venus.png', 'earth.png', 'mars.png', 'jupiter.png', 'saturn.png', 'uranus.png', 'neptune.png', 'pluto.png', 'moon.png', 'exo1.png'];
let right = document.querySelector('.right');
let imgElement = right.querySelector('img');
imgElement.src = images[Math.floor(Math.random() * images.length)];

// Generating the circles per click
function generateCircles() {
    let circle = document.createElement('div');
    circle.style.top = event.pageY + 'px';
    circle.style.left = event.pageX + 'px';
    circle.classList.add('circles');
    body.appendChild(circle);
    setTimeout(() => {
        circle.remove();
    }, 400);
}
body.addEventListener('click', (event) => {
    if(!event.target.matches('.navbar') && !event.target.matches('.right img') && !event.target.matches('.explore')) {
        generateCircles(); 
    } 
});

// disbaling the background while showing the sidebar
function disableBackground(disable) {
    if(disable) {
        for(let section of sections) {
            section.style.pointerEvents = 'none';
            section.style.opacity = '.1';
        }
    } else {
        for(let section of sections) {
            section.style.pointerEvents = 'auto';
            section.style.opacity = '1';
        }
    }
}

// For sidebar
let sidebar = document.querySelector('.sidebar');
let menuBtn = document.querySelector('.menuBtn');
let sideCloseBtn = sidebar.querySelector('.closeBtn');
function sidebarMovement() {
    menuBtn.addEventListener('click', (event) => {
        sidebar.style.display = 'flex';
        disableBackground(true);
        setTimeout(() => {
            sidebar.style.top = '75px';
        }, 100);
    })
    sideCloseBtn.addEventListener('click', (event) => {
        sidebar.style.top = '1500px';
        disableBackground(false);
        setTimeout(() => {
            sidebar.style.display = 'none';
        }, 400);
    })
    body.addEventListener('click', (event) => {
        if(!event.target.closest('.navbar') && !event.target.closest('.menuBtn') && !event.target.closest('.sidebar')) {
            disableBackground(false);
            sidebar.style.top = '1500px';
            setTimeout(() => {
                sidebar.style.display = 'none';
            }, 400);
        }
    })
}
sidebarMovement();

getStars();
