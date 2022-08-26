import ImageEntry from '../../redux/slices/images/types';

interface ImagesListProps {
  handleShowTags: (showTags: boolean) => void;
  setFocusedImage: (image: ImageEntry) => void;
}

export default ImagesListProps;

