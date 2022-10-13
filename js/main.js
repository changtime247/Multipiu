$(function () {
  $('#selectable').selectable({})

  var btn = document.querySelector('.btn')

  let ansObj = { ans: 0 }

  function showMessage(event) {
    event.preventDefault()
    var result = confirm('Good to go?')
    btn.disabled = result
  }

  btn.addEventListener('click', showMessage)

  document.querySelector('#freshIt').addEventListener('click', () => {
    document.location.reload()
  })

  document.querySelector('.btn').addEventListener('click', () => {
    document.querySelectorAll('.box').forEach((e) => {
      e.addEventListener('mousedown', () => {
        document.location.reload()
      })
    })

    const allItems = $('#selectable').find('div.box')
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].innerHTML = ''
    }
    const items = $('#selectable').find('div.ui-selected')

    htmlSelecteds = []

    for (let i = 0; i < items.length; i++) {
      htmlSelecteds.push(items[i])
    }

    console.log(htmlSelecteds)

    let obj = {}

    for (let i = 1; i < 11; i++) {
      for (let j = 1; j < 11; j++) {
        if ($(`.ui-selected.row${i}.column${j}`).length > 0) {
          obj['row' + i] = $(`.ui-selected.row${i}.column${j}`).length
        }
        if ($(`.ui-selected.row${i}.column${j}`).length > 0) {
          obj['column' + j] = $(`.ui-selected.row${i}.column${j}`).length
        }
      }
    }
    let rows = Object.keys(obj).filter((e) => e.includes('row'))
    let columns = Object.keys(obj).filter((e) => e.includes('column'))
    let arrRows = []
    let arrColumns = []
    rows.forEach((r) => {
      arrRows.push('.ui-selected.' + r)
    })
    columns.forEach((c) => {
      arrColumns.push('.ui-selected.' + c)
    })
    const selecteds = $('div.ui-selected')
    flipColumns(arrColumns)
      .then(() => {
        document.querySelector('h4').innerHTML += `<—> There ${
          rows.length > 1 ? `are` : `is`
        } ${rows.length} row${rows.length > 1 ? `s (in red)` : ` (in red)`}.`
      })
      .then(sleeper(1888))
      .then(() => {
        flipRows(arrRows)
      })
      .then(sleeper(1888))
      .then(() => {
        document.querySelector('h4').innerHTML += `\<br> <|> There ${
          columns.length > 1 ? `are` : `is`
        } ${columns.length} column${
          columns.length > 1 ? `s (the circles ◯)` : ` (the circle ◯)`
        }.`
      })
      .then(sleeper(1888))
      .then(() => {
        document.querySelector(
          'h4'
        ).innerHTML += `\<br> × So what is... ${rows.length} times ${columns.length}?`
        $('#answer').addClass('readyToAnswer')
      })
      .then(() => {
        let container = document.querySelector('section')
        console.log(rows.length, columns.length)
        ansObj.ans = rows.length * columns.length
        console.log(ansObj)
      })
      .then(() => {
        document.querySelector('#answer').addEventListener('click', () => {
          let attempt = document.querySelector('input').value
          if (Number(attempt) == ansObj.ans) {
            setNums(items).then(() => {
              $('.btn').removeClass('.readyToAnswer')
              console.log('yaaaayyy')
              document.querySelector(
                'h4'
              ).innerHTML += `\<br> YES!! \<br> ${rows.length} × ${columns.length} = ${ansObj.ans}`
            })
            $(".box:not('.ui-selected')").addClass('hidden')
          } else {
            alert('Try again.')
          }
        })
      })
  })
})

async function setNums(list) {
  let allHighlighted = []
  for (let i = 0; i < list.length; i++) {
    allHighlighted.push(list[i])
    await getInside(
      list[i],
      i,
      +`${
        list.length === 100
          ? 50
          : list.length > 89
          ? 150
          : list.length > 79
          ? 250
          : list.length > 69
          ? 300
          : list.length > 59
          ? 350
          : list.length > 49
          ? 400
          : list.length > 39
          ? 450
          : list.length > 29
          ? 500
          : list.length > 19
          ? 600
          : list.length > 9
          ? 700
          : 888
      }`
    )
  }
  await be()
}

async function flipRows(list) {
  let allHighlighted = []
  allHighlighted.push(list[0])
  await flipIt(list[0], 0)
}
async function flipColumns(list) {
  let allHighlighted = []
  allHighlighted.push(list[0])
  await flipItY(list[0], 0)
}

function getInside(a, i, milli) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve((a.innerHTML = i + 1))
    }, 1 || milli || 888)
  })
}

function flipIt(a, i) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve($(a).addClass('rotate'))
    }, 1000)
  })
}

function flipItY(a, i) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve($(a).addClass('rotateY'))
    }, 1000)
  })
}

async function be(classToAdd) {
  setTimeout(() => {
    $(`.ui-selected.${classToAdd}`).addClass('rotate')
  }, 1000)
}

function sleeper(ms) {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms))
  }
}
