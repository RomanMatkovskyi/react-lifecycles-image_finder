import { Component } from 'react';

class ImageGalleryItem extends Component {
  state = {
    modalOpen: false,
    tempingSrc: '',
  };

  handleModalWindow = src => {
    this.setState({ modalOpen: true, tempingSrc: src });
  };

  handleKeyDown = event => {
    if (event.key === 'Escape' && this.state.modalOpen) {
      this.setState({ modalOpen: false });
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { imgData } = this.props;
    return (
      <>
        <div
          className={this.state.modalOpen ? 'Overlay' : 'Hidden'}
          onClick={() => {
            this.setState({ modalOpen: false });
          }}
        >
          <div className={this.state.modalOpen ? 'Modal' : 'Hidden'}>
            <img src={this.state.tempingSrc} alt="" className="modalImage" />
          </div>
        </div>
        <li
          className="ImageGalleryItem"
          onClick={() => {
            this.handleModalWindow(imgData.largeImageURL);
          }}
        >
          <img
            src={imgData.webformatURL}
            alt=""
            className="ImageGalleryItem-image"
            loading="lazy"
          />
        </li>
      </>
    );
  }
}

export default ImageGalleryItem;
