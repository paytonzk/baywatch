const app = {
  init(selectors) {
    this.myStorage = localStorage
    this.flicks = []
    this.max = 1
    this.list = document.querySelector(selectors.listSelector)
    this.template = document.querySelector(selectors.templateSelector)

    document
      .querySelector(selectors.formSelector)
      .addEventListener(
        'submit', 
        this.handleSubmit.bind(this)
      )
  },

  favFlick(flick, ev) {
    const listItem = ev.target.closest('.flick')
    flick.fav = !flick.fav

    if (flick.fav) {
      listItem.classList.add('fav')
    } else {
      listItem.classList.remove('fav')
    }
  },

  removeFlick(flick, ev) {
    const listItem = ev.target.closest('.flick')
    listItem.remove()

    const i = this.flicks.indexOf(flick)
    this.flicks.splice(i, 1)
  },

  upFlick(flick, ev){
    const li = ev.target.parentNode.parentNode
    if(li.previousElementSibling === null){
      return;
    }
    this.list.insertBefore(li, li.previousElementSibling)
    const pos = this.flicks.indexOf(flick)
    const temp = this.flicks[pos]
    this.flicks[pos] = this.flicks[pos - 1]
    this.flicks[pos - 1] = temp
  },

  downFlick(flick, ev){
    const li = ev.target.parentNode.parentNode
    if(li.nextElementSibling === null){
      return
    }
    const nextSibling = li.nextElementSibling
    this.list.insertBefore(nextSibling, li)
    const pos = this.flicks.indexOf(flick)
    const temp = this.flicks[pos]
    this.flicks[pos] = this.flicks[pos + 1]
    this.flicks[pos + 1] = temp
  },

  renderListItem(flick) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = flick.id
    item
      .querySelector('.flick-name')
      .textContent = flick.name

    item
      .querySelector('button.remove')
      .addEventListener(
        'click', 
        this.removeFlick.bind(this, flick)
      )

    item
      .querySelector('button.fav')
      .addEventListener(
        'click', 
        this.favFlick.bind(this, flick)
      )

      item
      .querySelector('button.up')
      .addEventListener(
        'click', 
        this.upFlick.bind(this, flick)
      )

      item
      .querySelector('button.down')
      .addEventListener(
        'click', 
        this.downFlick.bind(this, flick)
      )
    
    return item
  },

  handleSubmit(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max,
      name: f.flickName.value,
      fav: false,
    }

    this.flicks.unshift(flick)

    const listItem = this.renderListItem(flick)
    localStorage.setItem(this.max, listItem)
    this.list
      .insertBefore(listItem, this.list.firstElementChild)

    this.max ++
    f.reset()
  },

  search(){
    const input = document.getElementById('myInput')
    const filter = input.value.toUpperCase()
    const items = this.list.getElementsByTagName('li')
    for (i = 0; i < items.length; i++) {
        a = items[i];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = ""
        } else {
            items[i].style.display = "none"
        }
    }
  },
}

app.init({
  formSelector: 'form#flick-form',
  listSelector: '#flick-list',
  templateSelector: '.flick.template',
})