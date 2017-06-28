const app = {
    init(selectors){
        this.max = 1
        this.list = document.querySelector(selectors.listSelector)
        document.querySelector(selectors.formSelector).addEventListener('submit', this.handleSubmit.bind(this))
    },

    renderListItem(flick){
        const item = document.createElement('li')
        item.tectContent = flick.name
        return item
    },

    handleSubmit(ev){
        ev.preventDefault()
        const f = ev.target
        const flick ={
            name: f.flickName.value,
            id: this.max,
        }
        this.list.appendChild(this.renderListItem(flick))
        this.max++
    },
}

app.init({
    formSelector: 'flick-form',
    listSelector: '#flick-list',
})