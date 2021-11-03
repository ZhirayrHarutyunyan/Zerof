let carSvg = document.querySelector('[data-car-svg]')
let pathSvg = document.querySelectorAll('[data-path]')
let createDropdown = document.querySelector('[data-car-dropdown]')
let defects = document.querySelectorAll('[data-defect]')
let defectsInfo = document.querySelector('[data-defects-info]')
let defectsIcon = document.querySelectorAll('[data-defect-icon]')
let cursorY = -1
let cursorX = -1
let pathSvgId = ''


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
            pathSvgId = item.getAttribute('id')
        })
    }
    document.addEventListener('click', ({ target }) => {
        if (!target.closest('[data-path]')) {
            createDropdown.style.display = 'none'
            item.classList.remove('active')
        }
    })
})

defects.forEach(item => {
    item.addEventListener('click', () => {
        let defactsCount = defectsInfo.childElementCount + 1
        let itemDefectTaxt = item.textContent
        // let itemDefectIcon = item.lastElementChild
        // itemDefectIcon.setAttribute('data-id', defactsCount)
        // itemDefectIcon.setAttribute('x', cursorX - 10)
        // itemDefectIcon.setAttribute('y', cursorY - 5)
        // carSvg.appendChild(itemDefectIcon)

        carSvg.insertAdjacentHTML('beforeend', `<svg class="defect" onmouseover="addActiveDefect(this)" onmouseout="removeActiveDefect()" width="15" height="15" viewBox="0 0 15 15" data-id="${defactsCount}" x='${cursorX - 10}' y='${cursorY - 5}'>
        <circle  cx="7.5" cy="7.5" r="7.5"></circle>
        <text fill='white' transform="translate(3.75 11)">${itemDefectTaxt.charAt(0).toLocaleLowerCase()}</text>
        </svg>`)

        pathSvg.forEach(pathItem => {
            if (pathItem.getAttribute('class', 'active')) {
                pathItem.classList.add('selected')
            }
        })
        defectsInfo.insertAdjacentHTML('beforeend',
            `
            <tr onmouseover="addActiveDefect(this)" onmouseout="removeActiveDefect()" data-id="${defactsCount}">
                <td class="counted"></td>
                <td>${pathSvgId}</td>
                <td>${itemDefectTaxt}</td>
                <td>${cursorX}</td>
                <td>${cursorY}</td>
            </tr>
        `)
    })
})

function addActiveDefect(currentId) {
    let def = document.querySelectorAll('[data-id]')
    def.forEach(item => {
        if (item.getAttribute('data-id') == currentId.getAttribute('data-id')) {
            item.classList.add('activate')
        }
    })
}

function removeActiveDefect() {
    let def = document.querySelectorAll('[data-id]')
    def.forEach(item => {
        item.classList.remove('activate')
    })
}

