import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {"position":"top-right"})

const globals = [{"name":"my-error","message":"Oops...Something went wrong","options":{"type":"error"}},{"name":"success","message":"Job Added","options":{"type":"success"}}]
if(globals) {
  globals.forEach(global => {
    Vue.toasted.register(global.name, global.message, global.options)
  })
}

export default function (ctx, inject) {
  inject('toast', Vue.toasted)
}
