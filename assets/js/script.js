let carSvg = document.querySelector('[data-car-svg]')
let pathSvg = document.querySelectorAll('[data-path]')
let createDropdown = document.querySelector('[data-car-dropdown]')
let defects = document.querySelectorAll('[data-defect]')
let defectsInfo = document.querySelector('[data-defects-info]')
let cursorY = -1
let cursorX = -1
let pathSvgId = ''


pathSvg.forEach(item => {
    if (item.hasAttribute('id')) {
        item.style.cursor = 'pointer'
        item.addEventListener('mouseover', function () {
            item.classList.add('select')
        })
        item.addEventListener('mouseout', function () {
            item.classList.remove('select')
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
        let randomNumber = Math.floor(Math.random() * 10000)
        let itemDefectTaxt = item.textContent
        let itemDefectIcon = item.querySelector('[data-defect-icon]').cloneNode(true)
        itemDefectIcon.setAttribute('data-id', randomNumber)
        itemDefectIcon.setAttribute('x', cursorX - 10)
        itemDefectIcon.setAttribute('y', cursorY - 5)
        carSvg.appendChild(itemDefectIcon)
        pathSvg.forEach(pathItem => {
            if (pathItem.getAttribute('class', 'active')) {
                pathItem.classList.add('selected')
            }
        })
        defectsInfo.insertAdjacentHTML('beforeend',
            `
            <tr onmouseover="addActiveDefect(this)" onmouseout="removeActiveDefect()" data-id="${randomNumber}">
                <td class="counted"></td>
                <td>${pathSvgId}</td>
                <td>${itemDefectTaxt}</td>
                <td>${cursorX}</td>
                <td>${cursorY}</td>
                <td onclick="removeDefectTableRow(this)" data-id="${randomNumber}" data-path-id="${pathSvgId}">X</td>
            </tr>
        `)
    })
})


function removeDefectTableRow(currentId){
    let def = document.querySelectorAll('[data-id]')
    let pathId = currentId.getAttribute('data-path-id');
    def.forEach(item => {
        if (item.getAttribute('data-id') == currentId.getAttribute('data-id')) {
            item.remove()
        }
    })
    if(!document.querySelector('[data-path-id=' + pathId + ']')) {
        document.getElementById(pathId).classList.remove('selected')
    }
}


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

