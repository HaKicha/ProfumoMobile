import React from 'react';
import styled from 'styled-components';
import {theme} from "../../stores/StyleStore";
import Query from "react-apollo/Query";
import gql from 'graphql-tag';
import Logo from "../../resources/image/Logo.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTelegram, faViber, faWhatsapp} from "@fortawesome/free-brands-svg-icons";

export default function InfoFooter(props) {
    
    return(
        <Container>
            <Query query={gql`query{
                                  contacts{
                                    phones
                                  }
                                }`}>
                {({loading, error, data}) => {
                    if (loading) return <p/>
                    if (error) return <p/>
                    return <Phones>
                        <span>Есть вопросы? Звоните, мы поможем!</span>
                        <span>понедельник-субота с 9:00 до 20:00</span>
                        <p>{data.contacts[0].phones.split(',').map((elem, index) => <p key={index}>{elem}</p>)}</p>
                    </Phones>
                }}
            </Query>
            <Query query={gql`
                                query{
                                  contacts{
                                    contacts_block
                                    telegram
                                    whats_app
                                    viber
                                  }
                                }`}>
                {({loading,error,data}) => {
                    if (loading) return <p/>
                    if (error) return <p></p>
                    return (
                            <Links>
                                <a href={data.contacts[0].telegram}>
                                    <FontAwesomeIcon icon={faTelegram} size={'3x'}/>
                                </a>
                                <a href={data.contacts[0].whats_app}>
                                    <FontAwesomeIcon icon={faWhatsapp} size={'3x'}/>
                                </a>
                                <a href={data.contacts[0].viber}>
                                    <FontAwesomeIcon icon={faViber} size={'3x'}/>
                                </a>
                            </Links>
                        )
                }}
            </Query>
            <b>Пользуясь даным веб-сайтом, вы даете свое согласие на использование файлов cookies. Если вы не согласны с условиями использования, пожалуйста покиньте даный веб-сайт</b>
            <Image src={Logo}/>
        </Container>
    )
    
}

const Container = styled.div`
    width: 100%;
    display: grid;
    background: ${theme.bgCol};
    justify-items: center;
    grid-gap: 10px;
    text-align: center;
    padding-bottom: 150px;
    margin-bottom: -100px;
    color: white;
`;

const Phones = styled.div`
    display: grid;
    grid-gap: 5px;
    padding-top: 15px;
    span  {
        font-size: 12pt;
    }
    p{
        font-size: 14pt;
        margin: 0;
    }
`;

const Links = styled.div`
    display: grid;
    grid-template-columns: repeat(3, max-content);  
    justify-items: center;
    grid-gap: 20px;
    svg {
        max-height: 100px;
        max-width: 100px;
        color: white;
        height: 15vw;
        width: 15vw;
    }
`;

const Image = styled.img`
    display: block;
    width: 70%;  
    object-fit: contain;
`;