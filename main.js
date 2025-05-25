class ShoppingCart {
    constructor(){
        this.items = {}
        this.total = 0
        
    }
    addItem(item){
        if (this.items[item.title]){
            this.items[item.title].quantity += 1
        } else{
            this.items[item.title] = item
            this.items[item.title].quantity = 1
        }
        this.saveCartToCookies()
    }
    saveCartToCookies(){
        let cartJSON = JSON.stringify(this.items)
        document.cookie = 'cart=${cartJSON}; max-age=${60 * 60 * 24 *7}; path=/'
    }
    loadCartFromCookies(){
        let cartCookie = getCookieValue('cart')
        if (cartCookie && cartCookie !== ''){
            this.items = JSON.parse(cartCookie)
        }
    }
}
let cart = new ShoppingCart()