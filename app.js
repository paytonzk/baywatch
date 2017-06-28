

const app = {
  init(selectors) {
    this.flicks = []
    this.max = 1
    this.list = document.querySelector(selectors.listSelector)

    document
      .querySelector(selectors.formSelector)
      .addEventListener(
        'submit', 
        this.handleSubmit.bind(this)
      )
  },

  makeFav(ev){
    ev.preventDefault()
    const f = ev.target
    if(f.innerText === 'Favorite'){
        f.style.backgroundColor = 'white'
        f.innerText = 'Favorite?'
    }
    else{
        f.innerText = 'Favorite'
        f.style.backgroundColor = 'yellow'
    }

  },

  remove(ev){
    ev.preventDefault()
    const list = document.getElementById('flick-list')
    list.removeChild(this.flick)
    const pos = this.flicks.indexOf(this.flick)
    this.flicks.splice(pos, 1)
  },

  renderListItem(flick) {
    const item = document.createElement('li')
    item.textContent = flick.name

    const favForm = document.createElement('form')

    const favButt = document.createElement('button')
    favButt.type = 'submit'
    favButt.innerText= 'Favorite?'
    favButt.addEventListener('click', this.makeFav.bind(this))

    favForm.appendChild(favButt)

    const remButt = document.createElement('button')
    remButt.type = 'submit'
    remButt.innerText= 'Remove?'
    remButt.addEventListener('click', this.remove.bind(this))

    favForm.appendChild(remButt)

    item.appendChild(favForm)
    return item
  },

  

  handleSubmit(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max,
      name: f.flickName.value,
    }

    const listItem = this.renderListItem(flick)
    this.flicks.push(flick)
    this.list.appendChild(listItem)

    this.max ++
  },
}

app.init({
  formSelector: 'form#flick-form',
  listSelector: '#flick-list',
})