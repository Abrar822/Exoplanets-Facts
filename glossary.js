// For glossary section
let glossaryLink = 'https://raw.githubusercontent.com/Abrar822/Exoplanets-Facts/refs/heads/main/glossary.json';
let glossaryContainer = document.querySelector('.glossary-container');
let glossaries = []
async function fetchGlossary() {
    let glossaryObject = await fetch(glossaryLink);
    let data = await glossaryObject.json();
    glossaries = data;
}
async function printGlossary() {
    let opened = []
    loader.style.display = 'flex';
    await fetchGlossary();
    loader.style.display = 'none';
    for(let glossary of glossaries) {
        let smallBox = document.createElement('div');
        smallBox.classList.add('small-box');
        glossaryContainer.appendChild(smallBox);
        // Create term div
        let myTerm = document.createElement('div');
        myTerm.classList.add('term');
        myTerm.innerHTML = `${glossary.term} <i class="fa-solid fa-chevron-down"></i>`;
        // Create definition div
        let myDefinition = document.createElement('div');
        myDefinition.classList.add('definition');
        myDefinition.innerText = glossary.definition;
        // Append both to smallBox
        smallBox.appendChild(myTerm);
        smallBox.appendChild(myDefinition);
        // On clicking the term or icon
        myTerm.addEventListener('click', () => {
            if(myDefinition.style.display === 'inline-block') {
                myDefinition.style.display = 'none';
                smallBox.style.border = '2px solid transparent';
                smallBox.style.backgroundColor = 'transparent';
            } else {
                myDefinition.style.display = 'inline-block';
                smallBox.style.border = '2px solid white';
                smallBox.style.backgroundColor = 'rgba(0, 204, 255, 0.1)';
            }
        });
    }
}
printGlossary();
// for glossaryBtn
let glossaryBtn = document.querySelectorAll('.glossaryBtn');
let sections = document.querySelectorAll('.section');
glossaryBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        // For hiding the rest sections
        for(let section of sections) {
            if(getComputedStyle(section).display === 'flex' && !section.classList.contains('glossary-container')) {
                section.style.top = '1000px';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 70);
                // specific to explore-exos
                if(section.classList.contains('explore-exos-container')) {
                    exoSearchBar.style.display = 'flex';
                    exoButtons.style.display = 'flex';
                }
            }
        }
        setTimeout(() => {
            glossaryContainer.style.display = 'flex';
        }, 100);
        setTimeout(() => {
            glossaryContainer.style.top = '80px';
        }, 300);
    })
})

// Search and Filter
let searchBar = document.querySelector('.searchBar');
let search = searchBar.querySelector('.search');
search.addEventListener('input', () => {
    let inputValue = search.value.toLowerCase();
    let allTerms = document.querySelectorAll('.term');
    let allSmallBox = document.querySelectorAll('.small-box');
    allSmallBox.forEach((smallBox) => {
        let term = smallBox.querySelector('.term').textContent.toLocaleLowerCase();
        if(term.startsWith(inputValue)) {
            smallBox.style.display = 'inline-block';
        } else {
            smallBox.style.display = 'none';
        }
    })
})