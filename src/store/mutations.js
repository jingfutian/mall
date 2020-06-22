import { 
  ADD_COUNT,
  ADD_PRODUCT
} from "./mutation-types"

export default {
  // mutations的唯一目的就是修改state
  // 每一个mutation只修改一种情况
  [ADD_COUNT](state, payload) {
    payload.count++
  },
  [ADD_PRODUCT](state, payload) {
    payload.checked = false
    state.cartList.push(payload)
  }
}