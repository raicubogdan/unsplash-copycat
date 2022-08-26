import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../..';

const tagsSlice = createSlice({
  name: 'tags',
  initialState: ['chonky', 'wonky', 'bonky', 'plonky', 'dunkey'] as string[],
  reducers: {
    addGlobalTag: (state, action) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
    },
  },
});

export const { addGlobalTag } = tagsSlice.actions;
export const selectGlobalTags = (state: RootState) => state.tags;

export default tagsSlice.reducer;

