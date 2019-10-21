import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {faHeart, faShareAlt} from "@fortawesome/free-solid-svg-icons/index";
import {theme} from "../../stores/StyleStore";
import '@material/button/dist/mdc.button.min.css'
import StarRatings from 'react-star-ratings'
import PhotoGallery from "./PhotoGallery";
import {AnimatedIcon, AnimatedButton} from "../../stores/AnimatedObjectStore";
import PageWrapper from "../public/PageWrapper";
import Query from "react-apollo/Query";
import {PRODUCT_QUERY} from "../../stores/queryStore";
import {UrlStore} from "../../stores/UrlStore";
import About from "./About";
import Characters from "./Characters";
import Comments from "./Comments";
import Preloader from "../public/Preloader";

export default class Product extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            currentView: 'about'
        }
    }



    render() {
        return(
            <PageWrapper>
                <ThemeProvider theme={theme}>
                    <Query
                        query={PRODUCT_QUERY}
                        variables={{"id": this.props.match.params.id}}
                        options={{fetchPolicy: "no-cache"}}
                    >
                        {({loading,error,data,refetch}) => {
                            if (loading) return <Preloader/>
                            if (error) {
                                console.log(error);
                                return <p>Error</p>
                            }
                            let images = data.product.photos.map(elem => ({original: UrlStore.MAIN_URL + elem.url}));
                            let comments = data.product.comments.length > 0?
                                <p>комментариев: {data.product.comments.length}</p>:<p>комментариев пока нет</p>
                            let rating = 0;
                            if (data.product.comments.length > 0)
                                rating = data.product.comments.reduce((acc,el) => acc + el.rate,0) / data.product.comments.length;
                            let price;
                            if (data.product.discount_price > 0)
                                price = <div>
                                    <OldPrice>{data.product.price} грн.</OldPrice>
                                    <Price>{Math.floor(data.product.discount_price * 100) / 100 } грн.</Price>
                                </div>
                            else price = <Price>{data.product.price} грн.</Price>
                            return(
                                <Container>
                                    <Title>{data.product.name_ru}</Title>
                                    <PhotoGallery images={images}/>
                                    <PriceBlock>
                                        {price}
                                        <Star>
                                            {rating > 0?<StarRatings
                                                rating={rating}
                                                starRatedColor={'black'}
                                                numberOfStars={5}
                                                name={'rating'}
                                                starDimension={'15px'}
                                                starSpacing={'2px'}
                                            />: <span/>}
                                            {comments}
                                        </Star>
                                    </PriceBlock>
                                    <ButtonsBlock>
                                        <AnimatedIcon
                                            icon={faHeart}
                                            color={'#b1b1b1'}
                                            bgcolor={theme.primary_light}
                                        />
                                        <AnimatedButton
                                            height={'50px'}
                                            width={'160px'}
                                            bgcolor={theme.primary_light}
                                            boxShadow={'0 0 4px rgba(0,0,0,0.5)'}
                                            fontSize={'10pt'}
                                        >
                                            Добавить в корзину
                                        </AnimatedButton>
                                        <AnimatedIcon
                                            icon={faShareAlt}
                                            color={'#b1b1b1'}
                                            bgcolor={theme.primary_light}
                                        />
                                    </ButtonsBlock>
                                    <Specifilications>
                                        <AnimatedButton {...ButtonSettings}
                                                        onClick={() => this.setState({currentView: 'about'})}
                                        >О товаре</AnimatedButton>
                                        <AnimatedButton {...ButtonSettings}
                                                        onClick={() => this.setState({currentView: 'characters'})}
                                        >Характеристики</AnimatedButton>
                                        <AnimatedButton {...ButtonSettings}
                                                        onClick={() => this.setState({currentView: 'comments'})}
                                        >Комментарии</AnimatedButton>
                                    </Specifilications>
                                    <Line/>
                                    {this.state.currentView === 'about' && <About product={data.product}/>}
                                    {this.state.currentView === 'characters' && <Characters product={data.product}/>}
                                    {this.state.currentView === 'comments' && <Comments product={data.product} refetch={refetch.bind(this)}/>}
                                </Container>
                            )
                        }}
                    </Query>
                </ThemeProvider>
            </PageWrapper>
        )
    }

}

const ButtonSettings = {
    height:'40px',
    width:'100%',
    background:'rgba(0,0,0,0)',
    fontSize:'3.5vw',
    color:'#222',
    borderRadius:'0',
    bgcolor:'rgba(10,10,10,0.2)',
}

const Container = styled.div`
  display: grid;
  overflow-x: hidden;
  z-index: 1;
  width: 100vw;
`

const PriceBlock = styled.div`
    display: grid;
    width: 90%;
    grid-template-columns: max-content max-content;
    justify-content: space-between;
    justify-self: center;
    align-items: center;
    margin-bottom: 10px;

`;

const ButtonsBlock = styled.div`
    display: grid;
    width: 90%;
    grid-template-columns: 45px 1fr 45px;
    align-items: center;
    justify-items: center;
    justify-self: center;
    margin-bottom: 10px;
`;

const Title = styled.h3`
  font-size: 20px;
  justify-self: center;
  align-self: center;
  padding: 0 20px;
`
const Star = styled.div`
  display: grid;
  * {float: right}
  p{
    font-size: 14px;
    font-weight: normal;
    margin: 0;
    justify-self: center;
    padding-right: 2px;
  }
`

const Specifilications = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  justify-self: center;
`

const Line = styled.hr`
  width: 90%;
  border-width: 0;
  height: 1px;
  background-color: #999999;
`

const OldPrice = styled.span`
    font-size: 12pt;
    font-weight: bold;
    color: #767676;
    text-decoration: line-through;
    display: block;
`;

const Price = styled.span`
    font-size: 18pt;
    font-weight: bold;
`;
