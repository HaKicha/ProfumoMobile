import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import Header from "../public/Header";
import CauseOne from '../../resources/image/cause.jpg'
import Shanel from '../../resources/image/shanel.png'
import Dior from '../../resources/image/dior.png'
import Lacoste from '../../resources/image/lacoste.png'
import Loreal from '../../resources/image/loreal.png'
import Pupa from '../../resources/image/pupa.png'
import Borj from '../../resources/image/borj.png'

export default class AboutUs extends React.Component{
    render() {
        return(
            <div>
                <Header />
                <GlobalMain>
                <Main>
                    <About>
                        <h1>About Us</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, suscipit.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi error incidunt maxime numquam sint vel.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </About>
                    <WhyChoose>
                        <h1>Why choose us</h1>
                        <h3>Cause#1</h3>
                        <Img src={CauseOne}/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam aliquid beatae corporis eius eligendi exercitationem explicabo hic impedit ipsa labore maxime minima, nobis officia placeat quidem, quo sint vero voluptatibus voluptatum. Dolor mollitia suscipit velit? Asperiores deserunt est harum laborum minus neque perferendis placeat quis sapiente, sit tenetur voluptate.</p>
                        <h3>Cause#2</h3>
                        <Img src={CauseOne}/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam aliquid beatae corporis eius eligendi exercitationem explicabo hic impedit ipsa labore maxime minima, nobis officia placeat quidem, quo sint vero voluptatibus voluptatum. Dolor mollitia suscipit velit? Asperiores deserunt est harum laborum minus neque perferendis placeat quis sapiente, sit tenetur voluptate.</p>
                        <h3>Cause#3</h3>
                        <Img src={CauseOne}/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam aliquid beatae corporis eius eligendi exercitationem explicabo hic impedit ipsa labore maxime minima, nobis officia placeat quidem, quo sint vero voluptatibus voluptatum. Dolor mollitia suscipit velit? Asperiores deserunt est harum laborum minus neque perferendis placeat quis sapiente, sit tenetur voluptate.</p>
                    </WhyChoose>
                    <OurBrands>
                        <h1>Our Brands</h1>
                        <LogoBrands>
                            <ImgLogo src={Shanel}/>
                            <ImgLogo src={Dior}/>
                            <ImgLogo src={Lacoste}/>
                            <ImgLogoLor src={Loreal}/>
                            <ImgLogoPupaBoj src={Pupa}/>
                            <ImgLogoPupaBoj src={Borj}/>
                        </LogoBrands>
                    </OurBrands>

                </Main>
                </GlobalMain>
            </div>
        )
    }

}
const GlobalMain = styled.div`
  display: block;
  position: absolute;
  top: 50px;
  z-index: 1;
  width: 100vw;
`
const Main = styled.div`
  display: grid;
  grid-template-rows: 200px 1fr 250px;

`
const About = styled.div`
  h1{
    font-weight: bold;
    font-size: 24px;
    text-align: center;
  }
  p{
    font-size: 12px;
    text-align: center;
    padding: 0 5px;
  };
`
const WhyChoose = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 3fr 3fr 1fr 3fr 3fr 1fr 3fr 3fr;
  justify-self: center;
  h1{
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    margin: 10px 0 0 0;
  }
  h3{
    font-weight: bold;
    text-align: center;
    margin: 10px 0 0 0;
  }
  p{
    font-size: 12px;
    text-align: center;
    padding: 0 5px;
    
  }
`
const Img = styled.img`
  height: 100px;  
  width: 100px ;
  align-self: center;
  justify-self: center;
  border-radius: 50%;
`
const OurBrands = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr;
  h1{
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    margin: 10px 0 0 0;
  }
  
`
const LogoBrands = styled.div`
  display: grid;
  grid-template-rows: 100px 100px;
  grid-template-columns: 1fr 1fr 1fr;
`
const ImgLogo = styled.img`
  height: 60px;  
  width: 90% ;
  align-self: center;
  justify-self: center;

`
const ImgLogoLor = styled.img`
  height: 40px;  
  width: 90% ;
  align-self: center;
  justify-self: center;

`
const ImgLogoPupaBoj = styled.img`
  height: 100px;  
  width: 90% ;
  align-self: center;
  justify-self: center;

`