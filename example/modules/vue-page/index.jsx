import Vue from 'vue'

new Vue({
    render () {
        return <div>
            <span>{this.count}</span>
            <button onClick={this.add}>Add</button>
        </div>
    },

    data () {
        return {
            count: 1
        }
    },

    methods: {
        add () {
            this.count++
        }
    }
}).$mount('#app')
