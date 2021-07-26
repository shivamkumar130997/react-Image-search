import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import ImageList from './imageList';
const API_KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component  {
    state = { images: [] };

    onSearchSubmit = async (term) => {
        const response = await axios.get('https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=b98defb467f698be779d59a6aab0bac1&format=rest&api_sig=51732844defc27afac172b8a87facc18', {
            params: { query: term},
            headers: {
                Authorization: `Client-ID ${API_KEY}`
            }
        })

        this.setState({ images: response.data.results })
    }

    render() {
        return (
            <div>
                <SearchBar userSubmit={this.onSearchSubmit}/>
                <span>Found: {this.state.images.length} images</span>
                <ImageList foundImages={this.state.images} />
            </div>
        )
    }

}

export default App;
