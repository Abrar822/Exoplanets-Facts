// for count, in terms of scale of 20
let displayCount = -1; 

// For generating the alert for the range
let numBtns = document.querySelectorAll('.numBtn');
numBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        let msg = document.createElement('div');
        msg.classList.add('beingOnline');
        msg.innerText = 'Range more than 400 may lead to lagging!';
        body.appendChild(msg);
        msg.style.display = 'inline-block';
        setTimeout(() => {
            msg.style.display = 'none';
            msg.remove();
        }, 1000);
    })
})

// Fetching the exos data
let data = [];
let filteredData = [];
let activeData = [];
let exosDataLink = 'https://raw.githubusercontent.com/Abrar822/Exoplanets-Facts/refs/heads/main/exo.json';
async function fetchExosData() {
    loader.style.display = 'flex';
    let response = await fetch(exosDataLink);
    let exoData = await response.json();
    loader.style.display = 'none';
    data = exoData;
}
fetchExosData();

// For exploreExosBtn
let exploreExosContainer = document.querySelector('.explore-exos-container');
let exploreExosBtn = document.querySelectorAll('.exploreExosBtn');
exploreExosBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        // showing the few elements
        exoSearchBar.style.display = 'flex';
        exoButtons.style.display = 'flex';
        // hiding the other visible sections
        for(let section of sections) {
            if(getComputedStyle(section).display !== 'none' && !section.classList.contains('explore-exos-container')) {
                section.style.top = '1000px';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 70);
            }
        }
        setTimeout(() => {
            exploreExosContainer.style.display = 'flex';
        }, 100);
        setTimeout(() => {
            exploreExosContainer.style.top = '70px';
        }, 300);

        // showing the first 20 exos data
        displayCount = 0
        showExosData();
    })
})

// Printing the exos data
let exosContent = document.querySelector('.exos-content')
let exoButtons = document.querySelector('.exoButtons');
let displayPrev = exoButtons.querySelector('.prev');
let range = exoButtons.querySelector('.range');
let displayNext = exoButtons.querySelector('.next');

// For displaying the exos data
function showExosData() {
    activeData = (filteredData.length > 0) ? filteredData : data;
    let startRange = range.querySelector('.startRange').value;
    let endRange = range.querySelector('.endRange').value;
    let start, end;
    if(!endRange && !startRange) {
        start = displayCount * 20;
        end = (displayCount + 1) * 20;
    } else {
        start = startRange;
        end = endRange;
    }
    exosContent.innerHTML = ``;
    // The desired number of cards are generated and then the event listeners respective to them are generated and on click perform the action specified
    for(let i = start; i < end; i++) {
        if(i >= activeData.length) break;
        let exosCard = document.createElement('div');
        generateCards(activeData[i], exosCard);
        // Adding event listener
        exosCard.addEventListener('click', () => {
            exoSearchBar.style.display = 'none';
            exoButtons.style.display = 'none';
            showDetails(activeData[i]);
        })
    }
}

// funtction to generate cards
function generateCards(planet, exosCard) {
    exosCard.classList.add('exos-card');
    exosContent.appendChild(exosCard);
    exosCard.innerHTML = `
        <img src="${planet['image']}">
        <h3>${planet['Planet Name']}</h3>
        <div class="exo-div">
            <p>Planet Host: ${planet['Planet Host']}</p>
            <p>Mass: ${planet['Mass']}</p>
            <p>Discovery Year: ${planet['Discovery Year']}</p>
        </div>
    `;
}

// function to show details for each planet
function showDetails(item) {
    exosContent.innerHTML = `
        <div class="main-container">
            <div class="image-container">
                <button class="back">Back</button>
                <img src="${item['image']}">
            </div>
            <div class="data-container">
                <h3>${item['Planet Name']}</h3>
                <p>Planet Host: ${item['Planet Host']}</p>
                <p>Orbital Period: ${item['Orbital Period Days']} days</p>
                <p>Mass: ${item['Mass']} Earth Masses</p>
                <p>Number of planets in the system: ${item['Num Planets']}</p>
                <p>Number of Stars in the system: ${item['Num Stars']}</p>
                <p>Gaia Magnitude: ${item['Gaia Magnitude']}</p>
                <p>Distance from Earth: ${item['Distance']} light yrs.</p>
                <p>Equilibrium Temperature: ${item['Equilibrium Temperature']} kelvin</p>
                <p>Discovery Year: ${item['Discovery Year']}</p>
                <p>Discovery Method: ${item['Discovery Method']}</p>
                <p>Eccentricity: ${item['Eccentricity']}</p>
                <p>Discovery Facility: ${item['Discovery Facility']}</p>
                <p>Orbit Semi-Major Axis: ${item['Orbit Semi-Major Axis']} AU</p>
                <p>Spectral Type: ${item['Spectral Type']}</p>
                <p>Stellar Effective Temperature: ${item['Stellar Effective Temperature']} kelvin</p>
                <p>Stellar Mass: ${item['Stellar Mass']} Solar Masses</p>
                <p>Stellar Metallicity (Metal content relative to Sun): ${item['Stellar Metallicity']}</p>
                <p>Stellar Metallicity Ratio: ${item['Stellar Metallicity Ratio']}</p>
                <p>Stellar Radius: ${item['Stellar Radius']} Solar Radii</p>
                <p>Stelar Surface Gravity: ${item['Stellar Metallicity Ratio']}</p>
            </div>
        </div>
    `;
    exploreExosContainer.querySelector('.back').addEventListener('click', () => {
        exosContent.innerHTML = ``;
        exoSearchBar.style.display = 'flex';
        exoButtons.style.display = 'flex';
        showExosData();
    })
}

// enter button
let enter = document.querySelector('.enter');
enter.addEventListener('click', () => {
    if(range.querySelector('.startRange').value && range.querySelector('.endRange').value && range.querySelector('.startRange').value < range.querySelector('.endRange').value) {
        showExosData();
    }
})

// for clearing the range input fields
let clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
    range.querySelector('.startRange').value = '';
    range.querySelector('.endRange').value = '';
    showExosData();
})

// For the displayNext
displayNext.addEventListener('click', () => {
    if(displayCount < Math.ceil((activeData.length / 20))) {
        ++displayCount;
        showExosData();
    }
})

// For the displayPrev
displayPrev.addEventListener('click', () => {
    if(displayCount > 0) {
        --displayCount;
        showExosData();
    }
})

// For search and filter
let exoSearchBar = exploreExosContainer.querySelector('.searchBar');
let exoSearch = exploreExosContainer.querySelector('.search');
exoSearch.addEventListener('input', () => {
    let inputValue = exoSearch.value.toLowerCase();
    if(inputValue === "") {
        // making empty
        filteredData = [];
        range.querySelector('.startRange').value = '';
        range.querySelector('.endRange').value = '';
        // calling
        displayCount = 0;
        showExosData();
        return;
    }
    filteredData = data.filter((d) => {
        return d['Planet Name'].toLowerCase().includes(inputValue);
    })
    exosContent.innerHTML = ``;
    displayCount = 0;
    showExosData();
})
