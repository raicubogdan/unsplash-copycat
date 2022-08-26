import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useToggleModal from '../../hooks/useToggleModal';
import { addImageTag, removeImageTag } from '../../redux/slices/images';
import ImageEntry from '../../redux/slices/images/types';
import { addGlobalTag, selectGlobalTags } from '../../redux/slices/tags';
import TagsList from './TagsList';
import { TagsModalProps } from './types';

const TagsModal = ({ handleShowTags, focusedImage, showTagsModal, setShowTagsModal }: TagsModalProps) => {
  const dispatch = useDispatch();
  const allTags = useSelector(selectGlobalTags);
  const [availableTags, setAvailableTags] = useState(allTags);
  const [currentTags, setCurrentTags] = useState(focusedImage.tags);
  const [inputValue, setInputValue] = useState('');

  // Close modal on escape press
  useToggleModal(setShowTagsModal);

  useEffect(() => {
    focusedImage &&
      setAvailableTags(focusedImage.id ? allTags.filter((tag: string) => !focusedImage.tags.includes(tag)) : allTags);
  }, [setAvailableTags]);

  const handleAddTag = (tag: string) => {
    setAvailableTags((prevAvailableTags: string[]) => {
      const index = prevAvailableTags.findIndex((tagToRemove: string) => tagToRemove === tag);
      if (index !== -1) {
        prevAvailableTags.splice(index, 1);
      }

      return prevAvailableTags;
    });

    dispatch(addImageTag({ id: focusedImage.id, tag }));
    setCurrentTags((currentTags: string[]) => [...currentTags, tag]);
  };

  const handleRemoveTag = (tag: string) => {
    setCurrentTags((prevCurrentTags: string[]) => {
      const index = prevCurrentTags.findIndex((currentTag: string) => currentTag === tag);
      if (index !== -1) {
        prevCurrentTags.splice(index, 1);
      }

      return prevCurrentTags;
    });

    dispatch(removeImageTag({ id: focusedImage.id, tag }));
    setAvailableTags(prevAvailableTags => [...prevAvailableTags, tag]);
  };

  const filterTags = (value: string) => {
    if (value) {
      setAvailableTags(availableTags.filter(tag => tag.includes(value)));
    } else {
      setAvailableTags(focusedImage.id ? allTags.filter((tag: string) => !focusedImage.tags.includes(tag)) : allTags);
    }
    setInputValue(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    let newTagsList = allTags;

    if (e.key === 'Enter') {
      const value = (e.target as HTMLInputElement).value;
      if (value && !allTags.includes(value)) {
        dispatch(addGlobalTag((e.target as HTMLInputElement).value));
        newTagsList = [...allTags, value];
      }
      setAvailableTags(
        focusedImage.id ? newTagsList.filter((tag: string) => !focusedImage.tags.includes(tag)) : allTags,
      );
      setInputValue('');
    }
  };

  return (
    <div
      className={`absolute h-screen w-screen ${
        showTagsModal ? 'flex' : 'hidden'
      } flex justify-center items-center top-0 bg-opacity-20 bg-black`}>
      <div className="w-[500px] h-[600px] bg-white rounded-md">
        <div className="w-full h-full p-6 flex flex-col justify-between">
          <div className="space-y-10">
            <div>
              <input
                onKeyDown={e => handleKeyPress(e)}
                className="text-xl w-full focus:outline-none border-b-2"
                type="text"
                placeholder="Search or add a new global tag"
                onChange={e => filterTags(e.target.value)}
                value={inputValue}
              />
              <TagsList focusedImage={focusedImage} tagsArray={availableTags} handleTag={handleAddTag} />
            </div>
            <div>
              <span className="text-gray-400 text-xl mb-">Current tags</span>
              <TagsList focusedImage={focusedImage} tagsArray={currentTags} handleTag={handleRemoveTag} />
            </div>
          </div>
          <button className="border-2 solid black p-3 m-3" onClick={() => handleShowTags({} as ImageEntry)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagsModal;

