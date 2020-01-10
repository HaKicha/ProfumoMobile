import {action, observable, computed, toJS} from "mobx";
import {ModifyCart} from "../api/Cart";
import {uniqBy} from 'lodash';

export default class CartStore {

    constructor(){
        this.has = this.has.bind(this);
        this.add = this.add.bind(this);
        this.clear = this.clear.bind(this);
        this.remove = this.remove.bind(this);
        this.getCount = this.getCount.bind(this);
        this.setCount = this.setCount.bind(this);
    }

    @observable
    cart = [];

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
        this.cart = uniqBy(toJS(this.cart), el => el._id);
        ModifyCart(toJS(this.cart))
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
        ModifyCart(toJS(this.cart))
    }

    @action
    remove(id){
        this.cart = this.cart.filter(elem => elem._id !== id)
        ModifyCart(toJS(this.cart))

    }

    @action
    clear(){
        this.cart = [];
    }

    @action
    addMany(data){
        this.cart.push(...data)
    }

    @computed
    get getAll(){
        return toJS(this.cart)
    }

}