import { configureStore } from '@reduxjs/toolkit';
import images from './slices/images';
import tags from './slices/tags';

const store = configureStore({
  reducer: {
    images,
    tags,
  },
});

export default store;

