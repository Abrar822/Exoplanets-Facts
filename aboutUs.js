let aboutUsBtn = document.querySelectorAll('.aboutUsBtn');
let aboutUsContainer = document.querySelector('.about-us-container');
aboutUsBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        for(let section of sections) {
            if(getComputedStyle(section).display !== 'none' && !section.classList.contains('about-us-container')) {
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
            setTimeout(() => {
                aboutUsContainer.style.display = 'flex';
            }, 100)
            setTimeout(() => {
                aboutUsContainer.style.top = '70px';
            }, 300);
        }
    })
})