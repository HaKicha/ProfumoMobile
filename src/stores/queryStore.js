import gql from 'graphql-tag'

const PRODUCT_QUERY = gql`query ($id: ID!){
  product(id: $id){
    _id
    name_ru
    price
    comments {
        rate
        _id
        text
        verified
        gender
        response
        owner {
          name
          surname
        }
      }
    desc
    category{
      name_ru
      parent{
        name_ru
      }
    }
    amount
    avaliable
    vendor
    gift_status
    gift_text
    meta_title
    meta_keywords
    meta_decription
    discount_price
    photos{
      url
    }
    properties{
      property_name
      property_val
    }
  }
}`;

export {
    PRODUCT_QUERY
}