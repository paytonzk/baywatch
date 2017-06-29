

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
    //For the toggling
    if(f.innerText === 'Favorite'){
        f.style.backgroundColor = 'dimgray'
        f.innerText = 'Favorite?'
    }
    else{
        f.innerText = 'Favorite'
        f.style.backgroundColor = 'yellow'
    }

  },

  goUp(ev){
    ev.preventDefault()
  },

  goDown(ev){
    ev.preventDefault()
  },

  remove(ev){
    ev.preventDefault()
    const button = ev.target
    const listItem = button.parentNode.parentNode
    const list = document.getElementById('flick-list')
    try{
      list.removeChild(listItem)
    }
    catch(e){
      console.log(list)
    }
    const pos = this.flicks.indexOf(listItem)
    this.flicks.splice(pos, 1)
  },

  renderListItem(flick) {
    const item = document.createElement('li')
    item.textContent = flick.name

    const favForm = document.createElement('form')

    const favButt = document.createElement('button')
    favButt.type = 'submit'
    favButt.classList.add('fav-button')
    favButt.innerText= 'Favorite?'
    favButt.addEventListener('click', this.makeFav.bind(this))

    favForm.appendChild(favButt)

    const remButt = document.createElement('button')
    remButt.type = 'submit'
    remButt.classList.add('rem-button')
    remButt.innerText= 'Remove?'
    remButt.addEventListener('click', this.remove.bind(this))

    favForm.appendChild(remButt)

    const upButt = document.createElement('button')
    upButt.type = 'submit'
    upButt.classList.add('up-button')
    upButt.innerText= 'Up?'
    upButt.addEventListener('click', this.goUp.bind(this))

    favForm.appendChild(upButt)
    //breaks code currently
    // if(isTop(item)){
    //   upButt.backgroundColor = 'black'
    // }

    const downButt = document.createElement('button')
    downButt.type = 'submit'
    downButt.classList.add('down-button')
    downButt.innerText= 'Down?'
    downButt.addEventListener('click', this.goDown.bind(this))

    favForm.appendChild(downButt)
    //breaks code currently
    // if(isBottom(item)){
    //   downButt.backgroundColor = 'black'
    // }

    item.appendChild(favForm)
    return item
  },

  isTop(flick){
    if(this.flicks.indexOf(flick) == 0){
      return true;
    }
    return false;
  },

  isBottom(){
    if(this.flicks.indexOf(flick) == this.flicks.length - 1){
      return true;
    }
    return false;
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