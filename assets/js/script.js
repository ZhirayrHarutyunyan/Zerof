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
            if (item.getAttribute('class', 'selected')) {
                item.style.fill = 'rgba(169, 15, 15, .6)'
            } else {
                item.style.fill = 'rgba(0, 0, 0, .5)'
            }
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
    item.addEventListener('click', () => {
        let itemText = item.textContent.charAt(0).toLocaleLowerCase()
        carSvg.insertAdjacentHTML('beforeend', `<svg width="15" height="15" viewBox="0 0 15 15" x='${cursorX - 10}' y='${cursorY - 5}'>
        <circle  cx="7.5" cy="7.5" r="7.5" style="fill: red;"></circle>
        <text fill='white' transform="translate(3.75 11)">${itemText}</text>
        </svg>`)
        pathSvg.forEach(pathItem => {
            if (pathItem.getAttribute('class', 'active')) {
                pathItem.classList.add('selected')
            }
        })

    })
})

