const app = {
    init: function(){
        this.max = 1
        document.querySelector('formSelector').addEventListener('submit', this.handleSubmit.bind(this))
    },
    handleSubmit: function(ev){
        ev.preventDefault()
        const f = ev.target
        const flick ={
            name: f.flickName.value,
            id: this.max,
        }
        this.max++
    },
}

app.init('#flick-form')