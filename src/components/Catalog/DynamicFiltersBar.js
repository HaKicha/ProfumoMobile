import React from 'react';
import styled from 'styled-components';
import { forOwn} from 'lodash';
import FilterDropdown from "./FilterDropdown";
import {inject, observer} from "mobx-react/index";
import {getCategoryParams} from "../../api/CategoryParams";
import {parseCategory} from "../../modules/CategoryPreprocessor";
import {debounce} from 'lodash';

@inject('store')
@observer
export default class DynamicFiltersBar extends React.Component {

    constructor(props){
        super(props);
        this.maxPriceInput = React.createRef();
        this.minPriceInput = React.createRef();
    }

    componentWillMount() {

    }

    inputMaxPriceHandler = debounce(() => this.props.store.filters.setMaxPrice(this.maxPriceInput.current.value), 1000);
    inputMinPriceHandler = debounce(() => this.props.store.filters.setMinPrice(this.minPriceInput.current.value), 1000);


    render() {
        let a = [];
        {forOwn(this.props.store.filters.Properties, (value, key) =>{
            a.push(<FilterDropdown
                key={key}
                Title={key}
                data={value}
            />)
            }

        )}


    return(
        <Container>
            <Title>Цена</Title>
            <PricesPane>
                <label>
                    <span>От</span>
                    <input type="text" onInput={this.inputMinPriceHandler} ref={this.minPriceInput}/>
                </label>
                <label>
                    <span>До</span>
                    <input type="text" onInput={this.inputMaxPriceHandler} ref={this.maxPriceInput}/>
                </label>
            </PricesPane>
            {a.map(elem => elem)}
        </Container>
    )
    }
}

const Container = styled.div`
    padding-bottom: 100px;    
    display: block;
`;

const PricesPane = styled.div`
     width: 100%;
     display: grid;
     grid-template-columns: repeat(2, max-content);
     grid-gap: 10px;
     padding-left: 10px;
     
     span {
        padding-right: 10px;
     }
     
     input{
        width: 70px;
        height: 27px;
        border-radius: 2px;
        border: 1px solid #676767;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
        -webkit-tap-highlight-color: transparent;
        font-size: 13pt;
        padding-left: 5px;
        &:active, &:focus {
          box-shadow: #e36f64 0 0 1px 1px;
          border: 1px solid #e36f64;
        }
     }
`;

const Title = styled.span`
    padding-left: 10px;
    margin-bottom: 5px;
`;
