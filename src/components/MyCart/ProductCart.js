import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {theme} from "../../stores/StyleStore";
import PerfumeOne from "../../resources/image/PerfumeOne.jpg";
import {faTimes ,faAngleRight, faHeart} from "@fortawesome/free-solid-svg-icons";
import Counter from "./Counter";

export default class ProductCart extends React.Component{
    render() {
        return (
            <div>
                <Products>
                    <Main>
                    <ProductImage>
                        <Img src={PerfumeOne}/>

                    </ProductImage>
                    <Other>
                        <Name>
                            <h5>Product Name</h5>
                            <DeleteIcon icon={faTimes} size={'lg'}/>
                        </Name>
                        <Price>
                            <p>Lorem</p>
                        </Price>
                        <AboutProd>
                            <p>Lorem</p>
                            <CounterBlock>
                                <Counter setVal={() => {}}/>
                            </CounterBlock>
                        </AboutProd>

                    </Other>
                    </Main>

                </Products>
                <Line/>
            </div>
        )
    }
}
const Main = styled.div`
  height: 104px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 90%;
  justify-self: center;
    p{
  margin: 0;
  padding: 0;
  }
 
`
const Products = styled.div`
  display: grid;
`
const ProductImage = styled.div`
  display: grid;
`
const Other = styled.div`
  display: grid;
  grid-template-rows: 22px 22px 30px ;
  align-self: center;
  p{
    font-size: 12px;
  }
 
`
const Img = styled.img`
  height: 100px;  
  align-self: center;
  justify-self: start;
`
const Name = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  h5{
    margin: 0;
    font-weight: bold;
  } 
`
const DeleteIcon = styled(FontAwesomeIcon)`
  justify-self: end;
  color: #767676;
  &:active{
    color:#333333;
  }
`;
const Price = styled.div`
  margin-top: 5px;
  display: grid;
  p{
  font-size: 12px;
  align-self: center;
  }
`
const AboutProd = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 3fr;
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
  margin: 0 5% 0 5%
  
  
`
const CounterBlock = styled.div`
  justify-self: end;
`