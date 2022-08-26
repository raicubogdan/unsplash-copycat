import { useDispatch } from 'react-redux';
import { getImage } from './utils';
import { addImage } from './redux/slices/images';
import { useState } from 'react';
import ImageEntry from './redux/slices/images/types';
import TagsModal from './components/TagsModal';
import ImagesList from './components/ImagesList';

function App() {
  const dispatch = useDispatch();
  const [focusedImage, setFocusedImage] = useState({} as ImageEntry);
  const [showTagsModal, setShowTagsModal] = useState(false);

  const handleShowTags = () => {
    setShowTagsModal(prevShowTags => !prevShowTags);
  };

  const handleAddImage = async () => {
    const newCatImage = await getImage();
    if (newCatImage) {
      dispatch(addImage(newCatImage));
    }
    console.log('new cat arrived');
  };

  return (
    <div className="relative">
      <div className="w-full h-full flex flex-col justify-center items-center my-6">
        <button onClick={handleAddImage} className="border-2 p-5 border-black">
          Add a new image
        </button>
        <ImagesList handleShowTags={handleShowTags} setFocusedImage={setFocusedImage} />
      </div>
      {showTagsModal && (
        <TagsModal
          handleShowTags={handleShowTags}
          showTagsModal={showTagsModal}
          setShowTagsModal={setShowTagsModal}
          focusedImage={focusedImage}
        />
      )}
    </div>
  );
}

export default App;

