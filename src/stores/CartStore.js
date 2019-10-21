import {action, observable, computed, toJS} from "mobx";

export default class CartStore {

    constructor(){
        this.has = this.has.bind(this);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.getCount = this.getCount.bind(this);
        this.setCount = this.setCount.bind(this);
    }

    @observable
    cart = [
        {_id: "5da73cc31917cf2906fbaf95", count: 1},
        {_id: "5da375c61917cf2906fbaf14", count: 2}
        ];

// {
//     _id: string
//     count: 1
// }

    has(id){
       return this.cart.reduce((acc, elem) => acc && elem._id === id, false);
    }

    @action
    add(id, count){
        if (!this.has(id)) this.cart.push({
            _id: id,
            count: count
        })
    }

    getCount(id){
        return this.cart.reduce((acc,el) => {
            if (el._id === id) acc = el.count;
            return acc;
        }, 0)
    }

    @action
    setCount(id,count){
        this.cart = this.cart.map(elem => {
            if (elem._id === id)  elem.count = count;
            return elem;
        })
    }

    @action
    remove(id){
        this.cart = this.cart.filter(elem => elem._id !== id)
    }

    @computed
    get getAll(){
        return toJS(this.cart)
    }

}