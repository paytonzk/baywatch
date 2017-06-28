

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
    f.style.backgroundColor = 'yellow'
  },

  renderListItem(flick) {
    const item = document.createElement('li')
    item.textContent = flick.name
    const buttonForm = document.createElement('form')
    const favButt = document.createElement('button')
    favButt.type = 'submit'
    favButt.innerText= 'favorite'
    favButt.addEventListener('click', this.makeFav.bind(this))
    buttonForm.appendChild(favButt)
    item.appendChild(buttonForm)
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