import {UrlStore} from "../stores/UrlStore";

const CATEGORY_PARAMS_QUERY = `query CATEGORY_PARAMS($id: ID!) {
  category(id:$id){
    name_ru
    products{
      properties{
        property_name
        property_val
        _id
      }
    }
    child{
      _id
      name_ru
      products{
        properties{
          property_name
          property_val
          _id
        }
      }
    }
  }
}`;

const PRODUCT_PARAMS_QUERY = `query CATEGORY_PARAMS($_q: String!) {
  products(where:{_q: $_q}){
    properties{
      property_name
      property_val
      _id
    }
  }
}`;

export async function getCategoryParams(id){
    let response = await fetch(UrlStore.MAIN_GRAPHQL_URI,{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: CATEGORY_PARAMS_QUERY,
            variables: {id: id}
        })
    });
    let data = await response.json();
    return data.data.category;
}

export async function getProductParams(expression){
    let response = await fetch(UrlStore.MAIN_GRAPHQL_URI,{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: PRODUCT_PARAMS_QUERY,
            variables: {_q: expression}
        })
    });
    let data = await response.json();
    return data.data.products;
}