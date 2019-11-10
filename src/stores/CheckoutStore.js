import {action, observable, toJS} from "mobx";

export default class CheckoutStore {

    // constructor(){
    //     this.setOrder = this.setOrder.bind(this);
    //     this.changeCount = this.changeCount.bind(this);
    //     this.removeOrder = this.removeOrder.bind(this);
    //     this.setPayment = this.setPayment.bind(this);
    //     this.setAddress = this.setAddress.bind(this);
    //     this.getAddress = this.getAddress.bind(this);
    //     this.setComment = this.setComment.bind(this);
    // }

    @observable
    order = [];
    payment = 'nova_poshta'; //'liqpay'

    @observable
    address = {};
    comment = '';

    @action
    setOrder(data){this.order = data.filter(el => el.product.avaliable && el.product.amount > 0)}

    @action
    changeCount(id,count){
        this.order = toJS(this.order).map(elem => {
            if (elem.product._id === id) elem.count = count;
    })}

    @action
    removeOrder(id){this.order = toJS(this.order.filter(el => el.product._id === id))}

    getOrder(){
        let data = toJS(this.order).map(elem => {
            let a = elem;
            a.product.id = elem.product._id;
            return a;
        });
        return data;
    }

    setPayment(payment){this.payment = payment}

    @action
    setAddress(address){this.address = address}

    getAddress(){return toJS(this.address)}

    setComment(comment){
        this.comment = comment;
    }
}