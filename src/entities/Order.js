export default class Order {
    constructor(additionalInfo, orders, deliveryInfo, type){
        this.additionalInfo = additionalInfo;
        this.orders = orders;
        this.deliveryInfo = deliveryInfo;
        this.type = type;
    }
}