export function getUserCartFromLocalStorage () {
  const item = window.localStorage.getItem('shoppingCart')
  const parsed = JSON.parse(item)
  return parsed
}

export function getUserCartProductsFromLocalStorage () {
  const item = window.localStorage.getItem('shoppingCartProducts')
  const parsed = JSON.parse(item)
  return parsed
}

export function setUserCartToLocalStorage (shoppingCart) {
  const current = window.localStorage.getItem('shoppingCart')
  if (current !== shoppingCart) {
    window.localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
  }
}

export function setUserCartProductsToLocalStorage (shoppingCartProducts) {
  const current = window.localStorage.getItem('shoppingCartProducts')
  if (current !== shoppingCartProducts) {
    window.localStorage.setItem('shoppingCartProducts', JSON.stringify(shoppingCartProducts))
  }
}
