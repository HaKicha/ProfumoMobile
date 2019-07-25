import React from 'react';
import Search from "../Search/Search";
import styled, {ThemeProvider} from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PerfumeOne from '../../resources/image/PerfumeOne.jpg';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {theme} from "../../stores/StyleStore";


export default class Product extends React.Component {
    render(){
        return(
            <div>
                
                <Products>
                    <ProductImage>
                        <Img src={PerfumeOne}/>
                    </ProductImage>
                    <Other>
                        <Name>
                            <h5>Product Name</h5>
                            <p>Price</p>
                        </Name>
                        <Price>
                            <p>Lorem</p>
                            <RightIcon icon={faAngleRight} size={'lg'}/>
                        </Price>
                        <AboutProd>
                            <p>Lorem</p>
                            <FaIcon icon={faHeart} size={'lg'}/>
                        </AboutProd>

                    </Other>

                </Products>
                <Line/>
            </div>
        )
    }
}

const Products = styled.div`
  height: 120px;
  display: grid;
  grid-template-columns: 1fr 2fr;
    p{
  margin: 0;
  padding: 0;
  }
 
`
const ProductImage = styled.div`
  display: grid;
`
const Other = styled.div`
  display: grid;
  grid-template-rows: 22px 22px 22px 22px;
  align-self: center;
  p{
    font-size: 12px;
  }
 
`
const Img = styled.img`
   height: 100px;  
  align-self: center;
  justify-self: center;
`
const Name = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  h5{
    margin: 0;
  } 
  p{
   font-size: 12px;
   font-weight: bold;
  }
`
const Price = styled.div`
  margin-top: 5px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  p{
  font-weight: bold;
  font-size: 12px;
  align-self: center;
  }
`
const RightIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
  color: #767676;
  &:active{
    color:#333333;
  }
`;
const FaIcon = styled(FontAwesomeIcon)`
  color: #767676;
  &:active{
    color:#333333;
  }
`;
const AboutProd = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  p{
  font-weight: bold;
  font-size: 12px;
  align-self: center;    
  }
`
const Line = styled.hr`
  width: 90%;
  border-width: 0;
  height: 2px;
  background-color: #999999;
  margin-top:0;
  
`
