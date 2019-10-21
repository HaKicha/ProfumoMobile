import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
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
            page: 1,
            pageCount: 1,
            stringSearch: false
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
        if (expr.charAt(0) === '&'){
            getProductParams(expr.substr(1)).then(data => {
                this.props.store.filters.addProperties(...data);
                this.setState({isLoading: false, stringSearch: true});
            })
        }
        else {
            let identifiers = [];
            getCategoryParams(expr).then(data => {
                this.props.store.filters.addProperties(...parseCategory(data))
                identifiers.push(expr);
                identifiers.push(...data.child.map(elem => elem._id));
                this.setState({identifiers: identifiers, isLoading: false, stringSearch: false});
            });
        }

    }

    toggleFiters(){this.setState(oldState => ({filtersOpen: !oldState.filtersOpen}))};

    toggleSort(){this.setState(oldState => ({sortingOpen: !oldState.sortingOpen}))};

    setSortingOrder(order){this.setState({sortingOrder: order});};

    setPage(page){this.setState({page: page.selected})}


    render() {
        let key = '';

        let filtersJson = clone(this.props.store.filters.Filters);
        if (this.state.stringSearch) {
            key = this.props.match.params.id;
            console.log(key);
            if (typeof filtersJson.properties !== "undefined")
                key = key + filtersJson.properties._id.length + filtersJson.properties._id[0];
            console.log(key);
            filtersJson._q = this.props.match.params.id.substr(1);
        }
        else {
            key = this.state.identifiers[0] + this.state.identifiers.length;
            console.log(key);
            filtersJson.category = {_id: this.state.identifiers};
        }
        console.log(filtersJson);
        return (
            <PageWrapper>
                <HeadBlock>
                    <SearchInput/>
                    <AnimatedButton {...ButtonParams} onClick={this.toggleFiters}>Фильтры</AnimatedButton>
                    <AnimatedButton {...ButtonParams} onClick={this.toggleSort}>Сортировать</AnimatedButton>
                </HeadBlock>
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
                        start: this.defaultPageSize * (this.state.page - 1)
                    }}
                >
                    {({loading, error, data}) => {
                        if (loading) return <Preloader/>
                        if (error) return <p/>
                        this.updateCount(filtersJson);
                        let buffer = data.products.reduce((acc,el,index) => {
                            if (index % 2 === 0){
                                acc[Math.floor(index / 2)] = [el._id];
                                return acc;
                            } else  acc[Math.floor(index / 2)].push(el._id);
                            return  acc;
                        },[]);
                        return (
                            <Content>
                               <tbody>
                               {buffer.map(el => <tr key={el[0] + el[1]}>
                                   <ProductPane productId={el[0]}/>
                                   <ProductPane productId={el[1]}/>
                               </tr>)}
                               </tbody>
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
            </PageWrapper>
        )
    }

}

const ButtonParams = {
    color: '#767676',
    height: '50px',
    width: '50%',
    borderRadius: '0',
    background: 'rgba(0,0,0,0)',
    fontSize: '14pt',
    otherStyles: 'display: inline-block;'
}

const Content = styled.table`
  display: table;
  width: 100vw;
  margin-top: 90px;
  padding-left: 5px;
  padding-bottom: 80px;
  overflow-x: hidden;
`

const HeadBlock = styled.div`
  background: #fff;
  position: fixed;
  top: 50px;
  z-index: 2;
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
    }
    
`;

//{"variables":{"filters":{"_q":"Помада","properties":{"_id":["5da403cf1917cf2906fbaf23"]}},"limit":18,"sortingOrder":"rating:asc","start":0}}