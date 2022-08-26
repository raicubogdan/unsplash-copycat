import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteImage, toggleLike } from '../../redux/slices/images';
import ActionButtonsProps from './types';

const ActionButtons = ({ image }: ActionButtonsProps) => {
  const dispatch = useDispatch();
  const [likeHover, setLikeHover] = useState(false);
  const [deleteHover, setDeleteHover] = useState(false);

  const handleHover = (setHover: (hover: boolean) => void, isHovering: boolean) => {
    setHover(isHovering);
  };

  return (
    <>
      <div className="flex space-x-2 justify-end w-full">
        <button
          className="w-10 h-8 flex justify-center items-center border rounded-sm bg-slate-200 p-2"
          onMouseEnter={() => handleHover(setLikeHover, true)}
          onMouseLeave={() => handleHover(setLikeHover, false)}
          onClick={() => dispatch(toggleLike(image.id))}>
          {image.isLiked ? (
            <img className="h-4 w-4 " src="/icons/red-heart.svg" alt="red-heart" />
          ) : (
            <img className="h-4 w-4" src={`/icons/${likeHover ? 'black-heart' : 'heart'}.svg`} alt="heart" />
          )}
        </button>

        <button
          className="w-10 h-8 flex justify-center items-center border rounded-sm bg-slate-200 p-2"
          onMouseEnter={() => handleHover(setDeleteHover, true)}
          onMouseLeave={() => handleHover(setDeleteHover, false)}
          onClick={() => dispatch(deleteImage(image.id))}>
          <img className="h-4 w-4" src={`/icons/${deleteHover ? 'black-bin' : 'bin'}.svg`} alt="red-heart" />
        </button>
      </div>
    </>
  );
};

export default ActionButtons;

