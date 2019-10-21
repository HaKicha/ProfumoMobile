import React from 'react';
import styled,  {ThemeProvider} from 'styled-components';
import {theme} from "../../stores/StyleStore";
import '@material/icon-button/dist/mdc.icon-button.min.css'
import LogoImg from '../../resources/image/Logo.svg'
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {AnimatedIcon} from "../../stores/AnimatedObjectStore";
import {Link} from "react-router-dom";
import Catalog from "./Catalog/Catalog";

export default class Header extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLeftPaneOpen: false
        }
        this.toggleLeftPane = this.toggleLeftPane.bind(this);
    }

    toggleLeftPane = e => {
        this.setState(oldState => ({isLeftPaneOpen: !oldState.isLeftPaneOpen}))
    };

    render(){
        return(
            <ThemeProvider theme={theme}>
                <React.Fragment>
                    <Container>
                        <Link to={'/'}>
                            <Logo src={LogoImg}/>
                        </Link>

                        <AnimatedIcon
                            icon={faBars}
                            size={"1x"}
                            bgcolor={'rgba(131,131,131,0.5)'}
                            onClick={this.toggleLeftPane}
                        />
                    </Container>
                    <LeftPapne isLeftPaneOpen={this.state.isLeftPaneOpen}>
                        <Catalog closePane={this.toggleLeftPane}/>
                    </LeftPapne>
                    <LeftPaneGround
                        isLeftPaneOpen={this.state.isLeftPaneOpen}
                        onClick={this.toggleLeftPane}
                    />

                </React.Fragment>
            </ThemeProvider>
        )
    }
}
const Container = styled.div`
  display: grid;
  position: fixed;
  grid-template-columns: 1fr 60px;
  top: 0;
  width: 100vw;
  z-index: 2;
  height: 50px;
  background-color: ${props => props.theme.bgCol};
  
  a {
      display: block;
      justify-self: center;
      align-self: center;
      padding-left: 30px;
  }
`;

const Logo = styled.img`
  max-height: 40px;
  object-fit: contain;
`;

const LeftPapne = styled.div`
    z-index: 10;
    display: grid;
    position: fixed;
    top: 50px;
    left: ${props => props.isLeftPaneOpen?'0':'-80vw'};
    width: 80vw;
    height: calc(100vh - 100px);  
    background: ${props => props.theme.bgCol};
    transition: left .4s cubic-bezier(.02, -0.01, 0, .97);
    overflow-y: scroll;
`;

const LeftPaneGround = styled.div`
    z-index: 9;
    display: block;
    position: fixed;
    top: 50px;
    left: ${props => props.isLeftPaneOpen?'0':'100vw'};
    width: 100vw;
    height: calc(100vh - 100px);  
    background: rgba(150, 150, 150, 0.7);
    transition: left .3s cubic-bezier(.02, -0.01, 0, .97);
`;