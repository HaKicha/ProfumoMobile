import React from 'react';
import styled from 'styled-components';
import {AnimatedRadioButton} from "../../stores/AnimatedObjectStore";



export function Sorters(props) {
    return(
        <Container>
            <AnimatedRadioButton>
                <input type={'radio'}
                       name={'sorter'}
                       onChange={e => {
                           if (e.target.checked) props.setOrder('rate:desc')
                       }}
                       defaultChecked={true}/>
                <span>По популярности</span>
            </AnimatedRadioButton>
            <AnimatedRadioButton>
                <input type={'radio'}
                       onChange={e => {
                           if (e.target.checked) props.setOrder('price:asc')
                       }}
                       name={'sorter'}/>
                <span>От дешевых к дорогим</span>
            </AnimatedRadioButton>
            <AnimatedRadioButton>
                <input type={'radio'}
                       onChange={e => {
                           if (e.target.checked) props.setOrder('price:desc')
                       }}
                       name={'sorter'}/>
                <span>От дорогих к дешевым</span>
            </AnimatedRadioButton>
            <AnimatedRadioButton>
                <input type={'radio'}
                       onChange={e => {
                           if (e.target.checked) props.setOrder('createdAt:desc')
                       }}
                       name={'sorter'}/>
                <span>Дата добавления</span>
            </AnimatedRadioButton>
        </Container>
    )
}

const Container = styled.div`
    padding-left: 10px;
    
`;