import {action, observable, computed, toJS} from "mobx";

export default class SessionCartStore {

    constructor(){
        this.update = this.update.bind(this);
        this.setCount = this.setCount.bind(this);
    }

    @observable
    cart = [];

// {
//     product: Object
//     count: 1
// }


    @action
    update(arr){
        this.cart = arr;
    }

    @action
    setCount(id, count){
        this.cart = this.cart.map(elem => {
            if (elem.product._id !== id) return elem;
            let a = elem;
            a.count = count;
            return a;
        })
    }

    @computed
    get getAll(){
        return toJS(this.cart);
    }

    @computed
    get summary(){
        return this.cart.reduce((acc,el) => {
            if (el.product.amount <= 0 && !el.product.avaliable) return acc;
            if (el.product.discount_price > 0) return acc + el.product.discount_price * el.count;
            return acc + el.product.price * el.count;
        },0)
    }

}