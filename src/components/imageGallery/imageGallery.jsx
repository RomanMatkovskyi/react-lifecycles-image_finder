import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ data }) => {
  return (
    <ul className="ImageGallery">
      {data.map(img => (
        <ImageGalleryItem key={img.id} imgData={img} />
      ))}
    </ul>
  );
};

export default ImageGallery;
