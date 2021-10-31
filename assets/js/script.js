let carSvg = document.querySelector('[data-car-svg]')
let pathSvg = document.querySelectorAll('[data-path]')
let createDropdown = document.querySelector('[data-car-dropdown]')
let defects = document.querySelectorAll('[data-defect]')
let cursorY = -1;
let cursorX = -1;

pathSvg.forEach(item => {
    if (item.hasAttribute('id')) {
        item.style.cursor = 'pointer'
        item.addEventListener('mouseover', function () {
            item.style.fill = 'rgba(0, 0, 0, .5)'
        })
        item.addEventListener('mouseout', function () {
            item.style.fill = ''
        })
        item.addEventListener('click', (event) => {
            cursorX = event.pageX
            cursorY = event.pageY
            createDropdown.style.left = cursorX + 'px'
            createDropdown.style.top = cursorY + 'px'
            pathSvg.forEach(childItem => {
                childItem.classList.remove('active')
            })
            item.classList.add('active')
            if (item.getAttribute('class', 'active')) {
                createDropdown.style.display = 'block'
            }
        })
    }
    document.addEventListener('click', ({ target }) => {
        if (!target.closest('[data-path]')) {
            createDropdown.style.display = 'none'
            item.classList.remove('active')
        }
    })
});


defects.forEach(item => {
    item.addEventListener('click', (event) => {
        cursorX = event.pageX
        cursorY = event.pageY
        let itemText = item.textContent
        carSvg.insertAdjacentHTML('beforeend', `<svg width="17" height="17" viewBox="0 0 14.25 14.25" x='${cursorX}' y='${cursorY}'>
        <circle class="cls-3" cx="7.13" cy="7.13" r="6.5" style="fill: red;"></circle>
        <text class="cls-4" transform="translate(3.1 10.5)">${itemText}</text>
        </svg>`)
        pathSvg.forEach(pathItem => {
            if (pathItem.getAttribute('class', 'active')) {
                pathItem.classList.add('selected')
            }
        })

    })
})