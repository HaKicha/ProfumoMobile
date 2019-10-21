import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from "react-markdown";

export default function About(props){

    return(
        <Container>
            <Vendor>{props.product.vendor}</Vendor>
            {props.product.gift_status && <SpecialOffer>
            <SpecialOfferLogo>
            <span>
            <i>SPECIAL</i>
                <i>&nbsp;&nbsp;OFFER</i>
                </span>
                </SpecialOfferLogo>
                <p>
                {props.product.gift_text}
                </p>
                </SpecialOffer>}
            <ReactMarkdown source={props.product.desc}/>
        </Container>
    )
}

const Container = styled.div`
    padding: 10px 5%;
    font-size: 12pt;
`;

const Vendor = styled.p`
    font-weight: bold;
    font-size: 14pt;
    
`;

const SpecialOffer = styled.div`
    display: grid;
    grid-template-columns: 57px 1fr;
    margin-top: 10px;

    p {
    align-self: center;
    margin: 0 0 0 10px;
    padding: 0;
    font-size: 12pt;
    text-align: justify;
    }
    `;

const SpecialOfferLogo = styled.div`
    display: grid;
    height: 57px;
    border-radius: 50px;
    border: 1px solid #222222;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), inset 0 0 2px rgba(255, 255, 255, 0.75);
    justify-items: center;
    align-content: center;
    i {
    display: block;
    font-size: 9px;
    font-weight: bold;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    `;