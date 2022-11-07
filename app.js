
let antiMatter = 0
let cupsCoffee = 0
let clickAmount = 1
let automaticAmount = 0
let sound = new Audio('1x06-voy-04.mp3')


const clickUpgrades = [
  {
    name: 'deflector',
    price: 100,
    quantity: 0,
    multiplier: 2
  }, {
    name: 'sensors',
    price: 50,
    quantity: 0,
    multiplier: 1
  }
]

const automaticUpgrades = [
  {
    name: 'shuttle',
    price: 600,
    quantity: 0,
    multiplier: 20,
    active: false
  }, {
    name: 'torres',
    price: 300,
    quantity: 0,
    multiplier: 10,
    active: false
  }
]


function update() {
  // @ts-ignore
  document.getElementById('totalAntiMatter').innerText = antiMatter
  // @ts-ignore
  document.getElementById('totalCoffee').innerText = cupsCoffee
  // @ts-ignore
  clickUpgrades.forEach(upgrade => document.getElementById(upgrade.name + 'Quantity').innerText = upgrade.quantity)
  // @ts-ignore
  clickUpgrades.forEach(upgrade => document.getElementById(upgrade.name + 'cost').innerText = upgrade.price)
  // @ts-ignore
  automaticUpgrades.forEach(upgrade => document.getElementById(upgrade.name + 'Quantity').innerText = upgrade.quantity)
  // @ts-ignore
  automaticUpgrades.forEach(upgrade => document.getElementById(upgrade.name + 'cost').innerText = upgrade.price)
  // @ts-ignore
  document.getElementById('totalClick').innerText = clickAmount
  // @ts-ignore
  document.getElementById('autoUpgrade').innerText = automaticAmount


  cupsCoffee = Math.floor(antiMatter / 100000)
}

function getAntimatter() {
  antiMatter += clickAmount
  update()
}

function upgradeClick(clickUpgrade) {

  let selected = clickUpgrades.find(upgrade => upgrade.name == clickUpgrade)
  if (antiMatter >= selected.price) {
    clickAmount += selected.multiplier
    antiMatter -= selected.price
    selected.quantity++
    selected.price += 25
  }
  update()
}

function upgradeAutomatic(clickUpgrade) {

  let selected = automaticUpgrades.find(upgrade => upgrade.name == clickUpgrade)
  if (antiMatter >= selected.price) {
    selected.active = true
    automaticAmount += selected.multiplier
    antiMatter -= selected.price
    selected.quantity++
    selected.price += (Math.floor(selected.price * .2))
    let autoWork = setInterval(() => {
      antiMatter += automaticAmount
      update()
    }, 3000)
    setTimeout(() => {
      automaticAmount -= selected.multiplier
      clearInterval(autoWork)
      update()
    }, 30000)
  }
  update()
}

sound.play()
update()