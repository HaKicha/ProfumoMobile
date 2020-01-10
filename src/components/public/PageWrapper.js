import React from 'react';
import Header from "./Header";
import styled from 'styled-components';
import SearchInput from "./SearchInput";

export default class PageWrapper extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            searchOpen: false
        }
        this.openSearch = this.openSearch.bind(this);
        this.closeSearch = this.closeSearch.bind(this);
    }

    openSearch(){
        this.setState({searchOpen: true})
    }
    closeSearch(e){
        this.setState({searchOpen: false})
    }

render() {
    return(
        <React.Fragment>
            <Header openSearch={this.openSearch}/>
            <SearchInput productId={''} open={this.state.searchOpen} close={this.closeSearch}/>
            <Content>
                {this.props.children}
            </Content>
        </React.Fragment>
    )
    }
}

const Content = styled.div`
    position: absolute;
    top: 60px;
    z-index: 1;
    width: 100vw;
    overflow-x: hidden;
`;