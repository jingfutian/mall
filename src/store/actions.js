import { 
  ADD_COUNT,
  ADD_PRODUCT
} from "./mutation-types"

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldProduct) {
        context.commit(ADD_COUNT, oldProduct)
        resolve('商品数量+1')
      } else {
        payload.count = 1
        context.commit(ADD_PRODUCT, payload)
        resolve('已添加新的商品')
      }
    })
  }
}