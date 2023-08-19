import React, { Component } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import axios from 'axios';

import SearchBar from './searchbar/searchbar';
import ImageGallery from './imageGallery/imageGallery';
import Button from './button/button';

class App extends Component {
  state = {
    data: [],
    currentSearch: '',
    currentPage: 2,
    isLoading: false,
    status: 'idle',
  };

  searchForData = (search, currentPage) => {
    this.setState(() => ({
      currentPage: 2,
      status: 'pending',
    }));
    let params = new URLSearchParams({
      key: '37799813-d6baa13d55c299777f9561755',
      q: search,
      orientation: 'horizontal',
      page: currentPage,
      per_page: 15,
    });
    axios
      .get(`https://pixabay.com/api/?${params}`)
      .then(imageArray => {
        if (imageArray.data.hits.length === 0) {
          this.setState(() => ({
            status: 'noQuery',
          }));
          return;
        }
        if (currentPage >= 2) {
          this.setState(prevState => ({
            currentSearch: search,
            data: [...prevState.data, ...imageArray.data.hits],
            status: 'resolved',
          }));
        } else {
          this.setState(() => ({
            status: 'resolved',
            currentSearch: search,
            data: imageArray.data.hits,
          }));
        }
      })
      .catch(error => {
        this.setState(() => ({
          status: 'rejected',
        }));
      });
  };

  loadMoreData = newData => {
    this.setState(prevState => ({
      currentPage: (prevState.currentPage += 1),
    }));
    this.setState(prevState => ({
      data: [...prevState.data, ...newData],
    }));
  };

  handlePaggination = currentPage => {
    this.searchForData(this.state.currentSearch, currentPage);
  };

  handleLoading = status => {
    this.setState(() => ({
      status: status,
    }));
  };

  render() {
    const { data, currentSearch, currentPage, status } = this.state;
    return (
      <>
        <SearchBar onSearch={this.searchForData} />
        {status === 'idle' && (
          <h1 className="Preview">Here you can find anything you want.</h1>
        )}
        {status === 'noQuery' && (
          <h1 className="Preview">
            Well, almost everything <span>&#128517;</span>
          </h1>
        )}
        {status === 'rejected' && (
          <h1 className="Error">
            Uuppppss, something went wrong... <span>&#128517;</span>
          </h1>
        )}

        <ImageGallery data={this.state.data} />
        {status === 'pending' && (
          <div className="Loader">
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          </div>
        )}
        {(data.length !== 0) & (status !== 'noMore') && (
          <Button
            currentSearch={currentSearch}
            currentPage={currentPage}
            loadMoreData={this.loadMoreData}
            handleLoading={this.handleLoading}
          />
        )}
      </>
    );
  }
}

export default App;
