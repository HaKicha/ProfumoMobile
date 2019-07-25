import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faHeart,faChevronLeft, faShareAlt, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Header from "../public/Header";
import Footer from "../public/Footer";
import {theme} from "../../stores/StyleStore";
import PerfumeOne from '../../resources/image/PerfumeOne.jpg'
import '@material/button/dist/mdc.button.min.css'
import StarRatings from 'react-star-ratings'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import DiorImg from "../../resources/image/dior.png";
import LorealImg from "../../resources/image/loreal.png";
import ShanelImg from "../../resources/image/shanel.png";



export default class ProductDetails extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            rating: 3
        }
    }
    images = [
        {
            original: DiorImg
        },
        {
            original: LorealImg
        },
        {
            original: ShanelImg
        }
    ];
    render() {
        return(
            <div>
                <Header/>
                <ThemeProvider theme={theme}>
                <GlobalMain>
                    <Main>
                        <Title>Product Name</Title>
                        <Slider>
                            <RightSlideIcons>
                                <FaIcon icon={faHeart} size={'lg'}/>
                            </RightSlideIcons>
                        <SlideMain>
                            <ImageGallery
                                items={this.images}
                                showThumbnails={false}
                                showPlayButton={false}
                                showFullscreenButton={false}
                                showNav={false}
                                showBullets={true}

                            />
                        </SlideMain>
                        <LeftSlideIcons>
                            <RightIcon icon={faShareAlt} size={'lg'}/>
                        </LeftSlideIcons>
                        </Slider>
                        <Price>
                            <p>125$</p>
                            <Star>
                                <StarRatings
                                    rating={this.state.rating}
                                    starRatedColor={'black'}
                                    numberOfStars={5}
                                    name={'rating'}
                                    starDimension={'15px'}
                                    starSpacing={'2px'}
                                />
                                <p>23 comments</p>
                            </Star>
                        </Price>
                        <Button className={"mdc-button"}>
                            <span className={"mdc-button__label"}>Add to Cart</span>
                        </Button>
                        <Specifilications>
                            <Spec>
                                <p>Specifilications</p>
                            </Spec>
                            <About>
                                <p>About Product</p>
                            </About>
                        </Specifilications>
                        <Line/>
                        <Information>
                            <ColumOne>
                                <p>Category:</p>
                                <p>Brand:</p>
                                <p>Series:</p>
                                <p>Fragrance groups:</p>
                                <p>Release form:</p>
                                <p>Classification:</p>
                                <p>Country:</p>
                                <p>Lorem:</p>
                                <p>Lorem:</p>
                            </ColumOne>
                            <ColumTwo>
                                <p>Men`s Perfume</p>
                                <p>Cristian Dior</p>
                                <p>Sauvage</p>
                                <p>Oriental</p>
                                <p>Sampler</p>
                                <p>Elite</p>
                                <p>Lorem</p>
                                <p>Lorem</p>
                                <p>Lorem</p>
                            </ColumTwo>


                        </Information>
                    </Main>
                </GlobalMain>
                </ThemeProvider>
                <Footer />
            </div>
        )
    }

}
const GlobalMain = styled.div`
  display: block;
  position: absolute;
  top: 50px;
  margin-bottom: 100px;
  z-index: 1;
  width: 100vw;
`
const Main = styled.div`
  display: grid;
  grid-template-rows: 40px 300px 80px 40px 30px 2px 1fr;

`
const Title = styled.h3`
  font-size: 20px;
  justify-self: center;
  align-self: center;
`
const Slider = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  justify-self: center;
  width: 90%;
  margin-top: 15px;
`
const RightSlideIcons = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`
const LeftSlideIcons = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`
const SlideMain = styled.div`
  align-self: center;
  justify-self: center;
  img {
  object-fit: contain;
  height: 20vh;
  
  }
  
  .image-gallery-bullets .image-gallery-bullet{
    background-color: #e36f64;
  } 
  .image-gallery-bullets .image-gallery-bullet.active {
    background: #000000;
    }
  .image-gallery-bullets .image-gallery-bullets-container{
    margin-bottom: -10% ;
    } 
  
`
const FaIcon = styled(FontAwesomeIcon)`
  color: #767676;
  &:active{
    color: ${props => props.theme.primary};
  }
`
const RightIcon = styled(FontAwesomeIcon)`
  justify-self: end;
  color: #767676;
  &:active{
    color: ${props => props.theme.primary};
  }
`
const Price = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 90%;
  justify-self: center;
  margin-top: 10px;
  p{
    font-size: 30px;
    font-weight: bold;
    margin: 0;
    align-self: center;
  }
`
const Star = styled.div`
  display: grid;
  grid-template-rows: 20px 20px;
  justify-self: end;
  align-self: center;
  
  p{
    font-size: 14px;
    font-weight: normal;
    margin: 0;
    justify-self: center;
  }
`
const Foto = styled.img`
  justify-self: center;
  max-width: 100%;
  object-fit: cover;

`
const Button = styled.button`
  justify-self: center;
  align-self: center;
  width: 30%;
  height: 45px !important;
  background-color: ${props => props.theme.primary} !important;
  text-transform: none !important;
  box-shadow: 0 0 4px rgba(0,0,0,0.5) !important;
  & :active{
      color:#cccccc !important;    
    }
  span{
    color: #ffffff;    
  }
`
const Specifilications = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 90%;
  justify-self: center;
`
const Spec = styled.div`
  p{
    font-size: 18px;
    font-weight: bold;
  }
`
const About = styled.div`
  justify-self: end;
  p{
    font-size: 18px;
    font-weight: bold;
    color: #767676;
  }
`
const Line = styled.hr`
  width: 90%;
  border-width: 0;
  height: 1px;
  background-color: #999999;
  margin-top:15px;
`
const Information = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 40px;
  width: 90%;
  justify-self: center;
  margin-top: 10px;
`
const ColumOne = styled.div`
  display: grid;
  grid-template-rows: 25px 25px 25px 25px 25px 25px 25px 25px 25px;
  p{
    font-size:14px;
    font-weight: bold;
  }
`
const ColumTwo = styled.div`
  display: grid;
  grid-template-rows: 25px 25px 25px 25px 25px 25px 25px 25px 25px;
  p{
    font-size:14px;
  }
`
const IconDown = styled(FontAwesomeIcon)`
  justify-self: center;
  align-self: end;
  margin-bottom: 25px;
  color: #767676;
  z-index:3;
  &:active{
    color: ${props => props.theme.primary};
  }
`

