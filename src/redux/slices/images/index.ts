import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../..';
import ImageEntry from './types';

const imagesSlice = createSlice({
  name: 'images',
  initialState: [] as ImageEntry[],
  reducers: {
    addImage: (state, action) => {
      const { id, url, width, height } = action.payload;

      state.push({ id, url, isLiked: false, width, height, tags: [] });
    },

    deleteImage: (state, action) => {
      const index = state.findIndex(imageEntry => imageEntry.id === action.payload);

      if (index !== -1) {
        state.splice(index, 1);
      }
    },

    toggleLike: (state, action) => {
      const imageEntry = state.find(imageEntry => imageEntry.id === action.payload);

      if (imageEntry) {
        imageEntry.isLiked = !imageEntry.isLiked;
      }
    },

    addImageTag: (state, action) => {
      const { id, tag } = action.payload;
      const imageEntry = state.find(imageEntry => imageEntry.id === id);

      if (imageEntry) {
        imageEntry.tags.push(tag);
      }
    },

    removeImageTag: (state, action) => {
      const { id, tag } = action.payload;
      const imageEntry = state.find(imageEntry => imageEntry.id === id);

      if (imageEntry) {
        const index = imageEntry.tags.findIndex(tagToDelete => tagToDelete === tag);
        if (index !== -1) {
          imageEntry.tags.splice(index, 1);
        }
      }
    },
  },
});

export const { addImage, deleteImage, toggleLike, addImageTag, removeImageTag } = imagesSlice.actions;
export const selectImages = (state: RootState) => state.images;

export default imagesSlice.reducer;

