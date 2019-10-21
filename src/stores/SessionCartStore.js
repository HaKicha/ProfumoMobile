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
            if (elem._id !== id) return elem;
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
            if (el.amount <= 0 && !el.avaliable) return acc;
            if (el.discount_price > 0) return acc + el.discount_price * el.count;
            return acc + el.price * el.count;
        },0)
    }

}