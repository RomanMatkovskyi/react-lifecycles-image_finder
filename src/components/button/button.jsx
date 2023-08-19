import { Component } from 'react';
import axios from 'axios';

class Button extends Component {
  handleLoadMoreData = (search, currentPage) => {
    this.props.handleLoading('pending');
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
          this.props.handleLoading('noMore');
          return;
        }
        this.props.loadMoreData(imageArray.data.hits);
        this.props.handleLoading('resolved');
      })
      .catch(error => {
        this.props.handleLoading('rejected');
      });
  };

  render() {
    const { currentSearch, currentPage } = this.props;
    var Scroll = require('react-scroll');
    var scroll = Scroll.animateScroll;
    return (
      <>
        <button
          type="button"
          className="Button"
          onClick={() => {
            this.handleLoadMoreData(currentSearch, currentPage);
            scroll.scrollToBottom();
          }}
        >
          Load More
        </button>
      </>
    );
  }
}

export default Button;
