import React from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {UrlStore} from "../../stores/UrlStore";
import {Link} from "react-router-dom";

export default class Slider extends React.Component {

    constructor(props){
        super(props);

        this.galerry = React.createRef();
        this.disableSwipe = this.disableSwipe.bind(this);
        this.enableSwipe = this.enableSwipe.bind(this);
    }

    disableSwipe(e){
        e.stopPropagation();
        this.galerry.current.pause();
    }


    enableSwipe(e){
        e.stopPropagation();
        this.galerry.current.play();
    }



    render() {
        return (
            <div  style={{marginTop: '10px'}}>

            <Query query={gql`{
                      slidercontents{
                        link
                        image {
                          url
                        }
                      }
                    }`}>
                {({loading, error, data}) => {
                    if (loading) return <p></p>;
                    if (error) {
                        return <p>Error :(</p>;
                    }
                    const images = data.slidercontents.map((content, index) => {
                        let url;
                        if (content.link)
                         url = new URL(content.link);
                        else url = new URL('https://profumo.com.ua/')
                        return ({
                            original: `${UrlStore.MAIN_URL}${ content.image[0].url }`,
                            link: `${url.pathname}`
                        });
                    });
                    return (<ImageGallery items={images}
                                          showThumbnails={false}
                                          autoPlay={true}
                                          showBullets={true}
                                          slideInterval={5000}
                                          showPlayButton={false}
                                          showFullscreenButton={false}
                                          onMouseOver={this.disableSwipe}
                                          onMouseLeave={this.enableSwipe}
                                          ref={this.galerry}
                                          renderItem={(item, index) => {
                                              return (
                                                  <div className={'image-gallery-image'}>
                                                      <Link to={item.link}>
                                                          <img src={item.original} alt=""  loading={'lazy'}/>
                                                      </Link>
                                                  </div>
                                              )

                                          }}
                    />);
                }}
            </Query>
            </div>

        );
    };


}
