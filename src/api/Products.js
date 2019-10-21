import {UrlStore} from "../stores/UrlStore";

const PRODUCTS_COUNT_QUERY = `query PRODUCTS_COUNT($filters: JSON!) {
  productsConnection(where: $filters) {
    aggregate{
        totalCount
    }
  }
}`;

export async function getProductsCount(filters){
    let response = await fetch(UrlStore.MAIN_GRAPHQL_URI,{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: PRODUCTS_COUNT_QUERY,
            variables: {filters: filters}
        })
    });
    let data = await response.json();
    return data.data.productsConnection.aggregate.totalCount;
}

const PRODUCTS_BY_ID_QUERY = `query ($filters: JSON!){
products(where: $filters){
    name_ru
    _id
    name_ru
    price
    amount
    avaliable
    vendor
    discount_price
  }
}`;

export async function getProductsById(ids) {
    let response = await fetch(UrlStore.MAIN_GRAPHQL_URI,{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: PRODUCTS_BY_ID_QUERY,
            variables: {filters: {_id: ids}}
        })
    });
    let data = await response.json();
    return data.data.products;
}