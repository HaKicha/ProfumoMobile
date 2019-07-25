import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Cause from '../../resources/image/cause.jpg';
import {faArrowRight, faSignOutAlt, faUserAlt, faIdCard, faHeart,faTasks, faPen} from "@fortawesome/free-solid-svg-icons";
import {theme} from "../../stores/StyleStore";
import Header from "../public/Header";
import Footer from "../public/Footer";

export default class Cabinet extends React.Component{
    render() {
        return(
            <div>
                <Header />
                <ThemeProvider theme={theme}>
                <GlobalMain>
                <JustMain>
                <Main>
                    <Inform>
                        <Empty></Empty>
                        <Centr>
                            <Picture>
                                <Logo src={Cause}/>
                            </Picture>
                            <Name>
                                <p>Name Surname</p>
                            </Name>
                            <Address>
                                <p>Address</p>
                            </Address>
                        </Centr>
                        <Out>
                            <ButIcon id="star-this-item"
                                     className="mdc-icon-button mdc-icon-button--on"
                                     aria-label="Unstar this item"
                                     aria-hidden="true"
                                     aria-pressed="true">
                                <FaIcon icon={faSignOutAlt} size="1x" className="mdc-icon-button__icon mdc-icon-button__icon--on"/>
                            </ButIcon>
                        </Out>
                    </Inform>
                    <Links>
                        <First>
                            <Button id="star-this-item"
                                     className="mdc-icon-button mdc-icon-button--on"
                                     aria-label="Unstar this item"
                                     aria-hidden="true"
                                     aria-pressed="true">
                                <Icon icon={faIdCard} size="1x" className="mdc-icon-button__icon mdc-icon-button__icon--on"/>
                            </Button>
                            <p>Contacts</p>
                        </First>
                        <Second>
                            <Button id="star-this-item"
                                    className="mdc-icon-button mdc-icon-button--on"
                                    aria-label="Unstar this item"
                                    aria-hidden="true"
                                    aria-pressed="true">
                                <Icon icon={faHeart} size="1x" className="mdc-icon-button__icon mdc-icon-button__icon--on"/>
                            </Button>
                            <p>I want it</p>
                        </Second>
                        <Third>
                            <Button id="star-this-item"
                                    className="mdc-icon-button mdc-icon-button--on"
                                    aria-label="Unstar this item"
                                    aria-hidden="true"
                                    aria-pressed="true">
                                <Icon icon={faTasks} size="1x" className="mdc-icon-button__icon mdc-icon-button__icon--on"/>
                            </Button>
                            <p>Purchase history</p>
                        </Third>
                        <Four>
                            <Button id="star-this-item"
                                    className="mdc-icon-button mdc-icon-button--on"
                                    aria-label="Unstar this item"
                                    aria-hidden="true"
                                    aria-pressed="true">
                                <Icon icon={faPen} size="1x" className="mdc-icon-button__icon mdc-icon-button__icon--on"/>
                            </Button>
                            <p>Edit profile</p>
                        </Four>
                    </Links>
                </Main>
                </JustMain>
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
  top: 70px;
  z-index: 1;
  width: 100vw;
`
const JustMain = styled.div`
  display: grid;
`
const Main = styled.div`
  display: grid;
  width: 90%;
  grid-template-rows: 260px 300px;
  height: 100vh;
  justify-self: center;
`
const Inform = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px 1fr;
  justify-self: center;
  width: 100%;
`
const Empty = styled.div`
`
const Centr = styled.div`
  display: grid;
  grid-template-rows: 200px 30px 30px;
  justify-self: center;
  width: 100%;
  margin-top: 12px;
`
const Picture = styled.div`
  display: grid;
  
`
const Logo = styled.img`
  justify-self: center;
  width: 70%;
  height: 70%;
  border-radius: 50%;
  
`
const Name = styled.div`
  display: grid;

  p{
    font-size: 20px;
    font-weight: bold;
    justify-self: center;
    margin: 0;
  }
`
const Address = styled.div`
  display: grid;
  p{
    font-size: 18px;
    margin: 0;
    justify-self: center;
  }
`
const Out = styled.div`
  display: grid;
`
const ButIcon = styled.button`
  align-self: start;
  justify-self: end;

`
const FaIcon = styled(FontAwesomeIcon)`
  &:active{
    color:#767676;!important;
  }
`;
const Links = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  margin-top: 60px;
  justify-self: center;
  width: 80%;
`
const First = styled.div`
  display: grid;
  grid-template-rows: 1fr 30px;
  p{
  font-size: 20px;
  margin: 0;
  justify-self: center;
  }
`
const Button = styled.button`
  color: ${props => props.theme.primary};
  justify-self: center;
  align-self: center;
`
const Icon = styled(FontAwesomeIcon)`

`;
const Second = styled.div`
  display: grid;
  grid-template-rows: 1fr 30px;
  p{
  font-size: 20px;
  margin: 0;
  justify-self: center;
  }
`
const Third = styled.div`
  display: grid;
  grid-template-rows: 1fr 30px;
  justify-self: center;
  p{
  font-size: 20px;
  margin: 0;
  text-align: center;
  }
`
const Four = styled.div`
  display: grid;
  grid-template-rows: 1fr 30px;
  p{
  font-size: 20px;
  margin: 0;
  justify-self: center;
  }
`

