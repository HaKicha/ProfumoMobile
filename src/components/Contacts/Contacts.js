import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "../../stores/StyleStore";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {sendFeedback} from "../../api/Feedback";
import MetaTags from "react-meta-tags";
import marked from 'marked'
import viber from "../../resources/image/SocialIcons/viber.png";
import whatsap from "../../resources/image/SocialIcons/whatsap.png";
import telegram from "../../resources/image/SocialIcons/telegram.png";
import PageWrapper from "../public/PageWrapper";
import Preloader from "../public/Preloader";
import ReactGA from 'react-ga';
import InfoFooter from "../public/InfoFooter";

export default class Contacts extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false
        }
        this.info = {
            text: "",
            name: "",
            phone: "",
            theme: "",
            email: ""
        }

        this.setProperty = this.setProperty.bind(this);
    }

    componentWillMount() {
        ReactGA.pageview(location.pathname);
        window.scrollTo(0,0);
    }

    setProperty = e => {
        this.info[e.target.name] = e.target.value;
    }

    send = e => {
        e.preventDefault();
        this.setState({loading: true});

            let data = {
                text: 'Тема: ' + this.info.theme + ';\n' + this.info.text,
                phone: this.info.phone,
                email: this.info.email,
                name: this.info.name
            }
            sendFeedback(data).then(response =>
                setTimeout(() => {
                    this.setState({loading: false})
                },1500));

    }

    

    render() {
        if (this.state.loading) return <Preloader/>
    return(
        <ThemeProvider theme={theme}>
        <PageWrapper>
            <MetaTags>
                <title>Наши контакты</title>
            </MetaTags>
            <Title>Наши контакты</Title>
            <Container>
                <Query query={gql`
                                query{
                                  contacts{
                                    contacts_block
                                    telegram
                                    whats_app
                                    viber
                                    meta_title
                                    meta_keywords
                                    meta_decription
                                  }
                                }`}>
                    {({loading,error,data}) => {
                        if (loading) return <p/>
                        if (error) return <p></p>
                        return (<>
                            <MetaTags>
                                <meta name='title' content={data.contacts[0].meta_title}/>
                                <meta name='keywords' content={data.contacts[0].meta_keywords}/>
                                <meta name='decription' content={data.contacts[0].meta_decription}/>
                            </MetaTags>
                                    <MarkdownContainer id={'container'}>
                                        <div dangerouslySetInnerHTML={{__html: marked(data.contacts[0].contacts_block).replace('!social_links', `<div
                                            class="links-container">
                                            <a href="${data.contacts[0].viber}"><img src="src/resources/image/SocialIcons/viber.png"/></a>
                                            <a href="${data.contacts[0].whats_app}"><img src="src//resources/image/SocialIcons/whatsap.png"/></a>
                                            <a href="${data.contacts[0].telegram}"><img src="src/resources/image/SocialIcons/telegram.png"/></a>
                                        </div>`)}}/>
                                    </MarkdownContainer>
                                </>)
                    }}
                </Query>
                <Form onSubmit={() => {}}>
                    <h3>Напишите нам сообщение</h3>
                    <InputContainer>
                        <input
                            type={'text'}
                            placeholder={'Ваше имя'}
                            name={'name'}
                            onChange={this.setProperty}
                            required={true}
                        />
                        <span/>
                    </InputContainer>
                    <InputContainer>
                        <input
                            type={'email'}
                            placeholder={'Ваш e-mail'}
                            name={'email'}
                            onChange={this.setProperty}
                        />
                        <span/>
                    </InputContainer>
                    <InputContainer>
                        <input
                            type={'text'}
                            placeholder={'Ваш номер телефона'}
                            name={'phone'}
                            required={true}
                            onChange={this.setProperty}
                        />
                        <span/>
                    </InputContainer>
                    <InputContainer>
                        <input
                            type={'text'}
                            placeholder={'Тема сообщения'}
                            name={'theme'}
                            onChange={this.setProperty}
                        />
                        <span/>
                    </InputContainer>

                    <Textarea
                        spellCheck={"false"}
                        name={'text'}
                        placeholder={'Текст сообщения'}
                        required={true}
                        onChange={this.setProperty}
                    />
                    <Button onClick={this.send}>
                        Отправить
                    </Button>
                </Form>

            </Container>
            <InfoFooter/>
        </PageWrapper>
        </ThemeProvider>
    )
    }
}

const Title = styled.h3`
    width: 100%;
    text-align: center;
    margin: 5px auto ;
    font-weight: bold;
`;

const MarkdownContainer = styled.div`
    font-size: 10pt;
    padding: 0 25px;
    
    .links-container{
        display: grid !important;
        grid-template-columns: repeat(3, 40px);
        grid-gap: 30px;
        height: 40px;
        img{
            cursor: pointer;
            max-height: 40px;
            max-width: 40px;
            object-fit: contain;
        }
    }
`

const Container = styled.div`
    display: grid;
    grid-gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
    
    a {
        display: inline-block;
    }
    
    img {
        max-width: 100%;
        object-fit: contain;
        margin: auto;
        margin-bottom: 20px;
    }
    
    p {
        text-align: justify;
        letter-spacing: 0px;
        line-height: 140%;
    }
    
    em{
        margin-bottom: 10px;
    }
    
    h1,h2,h3,h4,h5,h6 {
        text-align: center;
    }
    
    li {
        display: list-item; 
        line-height: 140%;
    }
`;

const Form = styled.form`
    padding-bottom: 25px;
    display: grid;
    justify-items: center;
    grid-gap: 5px;
`;

const InputContainer = styled.div`
    display: block;
    width: 90%;
    position: relative;
    height: max-content;
    justify-self: center;
    input {
        width: 100%;
        border: none;
        height: 30px;
        font-size: 14pt;
        border-bottom: 2px solid ${props => props.warning ? 'red' : '#ccc'};
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
        -webkit-tap-highlight-color: transparent;
        outline: none;
    }
    
    input:focus{
        outline: none;
    }
    small{
        display: none;
        font-size: 9pt;
        color: #636363;
        margin: 0;
        padding: 0;
    }
    input:focus ~ small{
      display: block;
       
    }
    
    input:invalid:not(:empty){
        outline: none;
        box-shadow: none;
        border-bottom: 2px solid red;
    }
    
    span{
        display: block;
        position: relative;
        width: 0;
        height: 2px;
        bottom: 2px;
        left: 0;
    }
    
    input:focus ~ span{
        width: 101%;
        left: 0;
        transition: width .3s ease-in;
        background: ${props => props.theme.primary};
      }
`;

const Textarea = styled.textarea`
    height: 120px;
    padding: 15px 5px 5px 15px;
    display: block;
    width: calc(90% - 20px);
    margin: 10px auto;
    border: 2px solid #ccc;
    resize: none;
    font-size: 14pt;
    font-family: "Gilroy" !important;
    outline: none;
    box-shadow: 0 0 1px 1px white;
    &:focus {
            border: 1px solid ${props => props.theme.primary};
    }
`;

const Button = styled.button`
    margin-top: 20px;
    display: block;
    background: ${props => props.theme.primary};
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    height: 35px;
    border: none;
    font-size: 14pt;
    color: white;
    font-weight: bold;
    cursor: pointer;
    width: 90%;
    text-align: center;
    vertical-align: center; 
    line-height: 35px;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
    -webkit-tap-highlight-color: transparent;
    &:hover{
         background: ${props => props.theme.primary_light};   
    }  
`;