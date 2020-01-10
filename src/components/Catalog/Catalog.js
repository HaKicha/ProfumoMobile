import React from 'react';
import styled, {keyframes, ThemeProvider} from 'styled-components';
import ProductPane from "./ProductPane";
import SearchInput from "../public/SearchInput";
import PageWrapper from "../public/PageWrapper";
import Query from "react-apollo/Query";
import gql from 'graphql-tag';
import {inject, observer} from "mobx-react";
import {getCategoryParams, getProductParams} from "../../api/CategoryParams";
import Preloader from "../public/Preloader";
import {AnimatedButton} from "../../stores/AnimatedObjectStore";
import {LeftPane} from "../public/LeftPane";
import DynamicFiltersBar from "./DynamicFiltersBar";
import {Sorters} from "./Sorters";
import ReactPaginate from 'react-paginate';
import {getProductsCount} from "../../api/Products";
import {theme} from "../../stores/StyleStore";
import {parseCategory} from "../../modules/CategoryPreprocessor";
import {clone} from 'lodash'
import Recomendations from "../public/Recomendations";
import ReactGA from 'react-ga';
import MetaTags from "react-meta-tags";
import InfoFooter from "../public/InfoFooter";

@inject('store')
@observer
export default class Catalog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            identifiers: [props.match.params.id],
            isLoading: true,
            filtersOpen: false,
            sortingOpen: false,
            sortingOrder: 'rating:asc',
            page: 0,
            pageCount: 1,
            stringSearch: false,
            idSearch: false
        };

        this.defaultPageSize = 18;

        this.updateIdentifiers = this.updateIdentifiers.bind(this);
        this.toggleFiters = this.toggleFiters.bind(this);
        this.toggleSort = this.toggleSort.bind(this);
        this.setSortingOrder = this.setSortingOrder.bind(this);
        this.setPage = this.setPage.bind(this);
        this.updateCount = this.updateCount.bind(this);
    }

    componentWillUpdate(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.updateIdentifiers(nextProps.match.params.id);
        }
    }

    componentWillMount() {
        ReactGA.pageview(location.pathname);
        this.updateIdentifiers(this.props.match.params.id);
    }

    updateCount(filtersJson){
        getProductsCount(filtersJson).then(count => {
            if (Math.ceil(count / this.defaultPageSize) !== this.state.pageCount)
            this.setState({pageCount: Math.ceil(count / this.defaultPageSize)})
        });
    }

    updateIdentifiers(expr){
        this.setState({isLoading: true});
        let identifiers = [];

        if (expr.charAt(24) === '&') {
            let data = expr.split('&');
            let promice1 = getProductParams(data[1]);
            let promice2 = getCategoryParams(data[0]);
            Promise.all([promice1, promice2]).then(values => {
                this.props.store.filters.addProperties(...values[0],...parseCategory(values[1]));
                identifiers.push(data[0]);
                identifiers.push(...values[1].child.map(elem => elem._id));
                this.setState({identifiers: identifiers, isLoading: false, stringSearch: true, idSearch: true})
            }
        )
        }
        else if (expr.charAt(0) === '&'){
            getProductParams(expr.substr(1)).then(data => {
                this.props.store.filters.addProperties(...data);
                this.setState({isLoading: false, stringSearch: true});
            })
        }
        else {
            getCategoryParams(expr).then(data => {
                this.props.store.filters.addProperties(...parseCategory(data))
                identifiers.push(expr);
                identifiers.push(...data.child.map(elem => elem._id));
                this.setState({identifiers: identifiers, isLoading: false, stringSearch: false, idSearch: true});
            });
        }

    }

    toggleFiters(){this.setState(oldState => ({filtersOpen: !oldState.filtersOpen}))};

    toggleSort(){this.setState(oldState => ({sortingOpen: !oldState.sortingOpen}))};

    setSortingOrder(order){
        this.setState({
            sortingOrder: order,
            page: 0
        });
        window.scrollTo(0,0);
    };

    setPage(page){
        console.log(page);
        this.props.store.filters.setPage(page.selected);
        window.scrollTo(0,0);
    }


    render() {

        let key = '';

        let filtersJson = clone(this.props.store.filters.Filters);
        if (this.state.stringSearch) {
            key = this.props.match.params.id;
            if (typeof filtersJson.properties !== "undefined")
                key = key + filtersJson.properties._id.length + filtersJson.properties._id[0];
            filtersJson._q = this.props.match.params.id.split('&')[1];
        }
        if (this.state.idSearch) {
            key = this.state.identifiers[0] + this.state.identifiers.length;
            filtersJson.category = {_id: this.state.identifiers};
        }
        return (
            <PageWrapper>
                <MetaTags>
                    <title>Каталог товаров</title>
                </MetaTags>
                <HeadBlock>
                    <AnimatedButton {...ButtonParams} onClick={this.toggleFiters}>Фильтры</AnimatedButton>
                    <AnimatedButton {...ButtonParams} onClick={this.toggleSort}>Сортировать</AnimatedButton>
                </HeadBlock>
                {location.pathname.split('/').pop().includes('&')?
                    <MetaTags>
                        <title>Поиск: {decodeURIComponent(location.pathname.split('/').pop().substring(1))}</title>
                    </MetaTags>:
                    <Query
                        query={gql`
                    query($id: ID!){
                      category(id: $id){
                        name_ru
                        meta_title
                        meta_keywords
                        meta_decription
                      }
                    }`}
                        variables={{'id': location.pathname.split('/').pop()}}
                    >
                        {({loading,error,data}) => {
                            if (loading) return ''
                            return <MetaTags>
                                <title>{data.category.name_ru}</title>
                                <meta name='title' content={data.category.meta_title}/>
                                <meta name='keywords' content={data.category.meta_keywords}/>
                                <meta name='decription' content={data.category.meta_decription}/>
                            </MetaTags>
                        }
                        }
                    </Query>}
                {this.state.isLoading?<Preloader/>:<Query
                    key={key}
                    query={gql`
                       query productsByCategory($filters: JSON!, $limit: Int, $start: Int, $sortingOrder: String) {
                          products(where: $filters, limit: $limit, sort: $sortingOrder, start: $start) {
                            _id
                          }
                        } 
                        `}
                    variables={{
                        filters: filtersJson,
                        sortingOrder: this.state.sortingOrder,
                        limit: this.defaultPageSize,
                        start: this.defaultPageSize * this.props.store.filters.page
                    }}
                >
                    {({loading, error, data}) => {
                        if (loading) return <Preloader/>
                        if (error) return <p/>
                        if (data.products.length === 0) return  <Title>По вашему запросу ничего не найдено :(</Title>
                        this.updateCount(filtersJson);
                        return (
                            <Content>
                               {data.products.map(el => <ProductPane productId={el._id} key={el._id}/>)}
                            </Content>
                        )
                    }}
                </Query>}
                <LeftPane open={this.state.filtersOpen}>
                    <DynamicFiltersBar categoryId={this.props.match.params.id}/>
                </LeftPane>
                <LeftPane open={this.state.sortingOpen}>
                    <Sorters setOrder={this.setSortingOrder}/>
                </LeftPane>
                <PaginationContainer>
                    {this.state.pageCount > 1 && <ReactPaginate
                        previousLabel={'Назад'}
                        nextLabel={'Далее'}
                        breakLabel={'...'}
                        forcePage={this.props.store.filters.page}
                        breakClassName={'break-me'}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3}
                        onPageChange={this.setPage}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />}
                </PaginationContainer>
                {this.state.isLoading?null:<Recomendations/>}
                <InfoFooter/>
            </PageWrapper>
        )
    }

}

const ButtonParams = {
    color: '#181818',
    height: '50px',
    width: '50%',
    borderRadius: '0',
    background: 'rgba(0,0,0,0)',
    fontSize: '14pt',
    otherStyles: 'display: inline-block; font-weight: bold;'
}



const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: calc(100vw - 50px);
  padding: 10px 25px 80px 25px;
  margin-top: 100px;
  overflow-x: hidden;
  grid-auto-rows: 269px;
`

const HeadBlock = styled.div`
  background: #fff;
  position: fixed;
  top: 50px;
  z-index: 5;
  width: 100vw;
`

const PaginationContainer = styled.div`
    padding-bottom: 40px;
    display: grid;
    justify-content: center;
    ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;
    
        li {
            display: inline-block;
            padding: 7px;
            font-size: 14pt;
            margin-right: 5px;
            height: 20px;
            width: 20px;
            box-shadow: 0 0 1px 1px #ccc;
            border-radius: 4px;
            text-align: center;
            outline: none;
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
            -webkit-tap-highlight-color: transparent
        }
        
        li.next,
        li.previous{
            display: none;
        }
        
        li.active{
            background: ${theme.primary};
            color: white;
        }
        .break-me{
            pointer-events: none;
        }
    }
    
`;

const Title = styled.h1`
    margin: 100px auto;
    display: block;
    font-size: 20pt;
    padding: 20px;
    text-align: center;
    color: #b4b4b4;
`;
