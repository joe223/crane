import Vue from 'vue'
import Hello from './hello'

new Vue({
    render () {
        return <div>
            <Hello></Hello>
            <span>{this.count}</span>
            <button onClick={this.add}>Add Count</button>
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
