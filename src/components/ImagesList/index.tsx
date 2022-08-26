import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeImageTag, selectImages } from '../../redux/slices/images';
import ImageEntry from '../../redux/slices/images/types';
import ActionButtons from '../ActionButtons';
import ImagesListProps from './types';

const ImagesList = ({ handleShowTags, setFocusedImage }: ImagesListProps) => {
  const images = useSelector(selectImages);
  const dispatch = useDispatch();
  const [addTagsHover, setAddTagsHover] = useState(false);

  const handleHover = (setHover: (hover: boolean) => void, isHovering: boolean) => {
    setHover(isHovering);
  };

  const handleTags = (image: ImageEntry) => {
    handleShowTags(true);
    setFocusedImage(image);
  };

  const handleRemoveTag = (id: string, tag: string) => {
    dispatch(removeImageTag({ id, tag }));
  };

  return (
    <div className="w-full max-w-6xl my-10 md:columns-3 sm:columns-2 columns-1 gap-5 px-6">
      {images &&
        images.map(image => {
          return (
            <div
              key={image.id}
              className={`flex flex-col justify-between group w-full relative mb-5 break-inside-avoid span`}>
              <img className="h-full w-full" src={image.url} alt="cat-item" />
              <div className="p-4 w-full h-full text-lg absolute group-hover:transition-all ease-in-out duration-300 opacity-0 bg-opacity-20 group-hover:opacity-100 group-hover:bg-slate-800 group-hover:bg-opacity-20 justify-between flex flex-col space-x-2 space">
                <div className="flex ">
                  <div className="relative self-start">
                    <button
                      className="w-20 h-8 flex justify-center items-center border rounded-sm bg-slate-200 p-2"
                      onMouseEnter={() => handleHover(setAddTagsHover, true)}
                      onMouseLeave={() => handleHover(setAddTagsHover, false)}
                      onClick={() => handleTags(image)}>
                      <span className={`text-xs ${addTagsHover ? 'text-black' : 'text-gray-400'}`}>Tags</span>
                    </button>
                  </div>
                  <ActionButtons image={image} />
                </div>
                <div className="flex flex-row items-end justify-start flex-wrap w-full">
                  {image.tags.map(tag => {
                    return (
                      <button
                        key={`${tag}-${image.id}`}
                        onClick={() => handleRemoveTag(image.id, tag)}
                        className="bg-violet-600 text-white rounded-md p-2 m-2 text-sm">
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ImagesList;

