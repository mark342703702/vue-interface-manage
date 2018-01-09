import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    //当前店铺
    current_shop : ''
}

const mutations = {
    setCurrentShop(state, shop){
        state.current_shop = shop
    } 
}

const actions = {

}

export default new Vuex.Store({
    state,
    mutations,
    actions
})