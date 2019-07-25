import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {theme} from "../../stores/StyleStore";
import '@material/button/dist/mdc.button.min.css'
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

export default class Total extends React.Component{
    render() {
        return(
            <div>
                <ThemeProvider theme={theme}>
                 <GlobalMain>
                    <CenterMain>
                        <Main>
                            <TotalBlock>
                                <T><p>TOTAL</p></T>
                                <P><p>Price $$$$</p></P>

                            </TotalBlock>
                            <CheckOut>
                                <Button className={"mdc-button"}>
                                    <span className={"mdc-button__label"}>CHECKOUT</span>
                                    <FaIcon icon={faArrowRight}/>
                                </Button>
                            </CheckOut>
                        </Main>
                    </CenterMain>
                </GlobalMain>
                </ThemeProvider>
            </div>
        )
    }

}
const GlobalMain = styled.div`
  display: block;
  position: fixed;
  top: 50px;
  background: #ffffff;
  width: 100vw;
  z-index: 2;
`
const CenterMain = styled.div`
  display: grid;

`
const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 90%;
  justify-self: center;
  height: 60px;
`
const TotalBlock = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;

`
const CheckOut = styled.div`
  display: grid;
`
const T = styled.div`
  align-self: end;
  p{
    font-size: 20px;   
    margin: 0; 
  }    
`
const P = styled.div`
  p{
    font-size: 20px;
    color: ${props => props.theme.primary};
    margin: 0;      
  }
`
const Button = styled.button`
  justify-self: center;
  align-self: center;
  width: 100%;
  height: 40px !important;
  background-color: ${props => props.theme.primary} !important;
  text-transform: none !important;
  box-shadow: 0 0 4px rgba(0,0,0,0.5) !important;
  & :active{
      color:#cccccc !important;    
    }
      span{
    margin-right: 10px;
    color: #ffffff !important;

  }
  
`
const FaIcon = styled(FontAwesomeIcon)`
  color: #ffffff;
  padding-right: 4px;
  &:active{
    color:#767676;!important;
  }
`;
