import ImageEntry from '../../redux/slices/images/types';

export interface TagsListProps {
  focusedImage: ImageEntry;
  tagsArray: string[];
  handleTag: (tag: string) => void;
}

export interface TagsModalProps {
  handleShowTags: (image: ImageEntry) => void;
  focusedImage: ImageEntry;
  showTagsModal: boolean;
  setShowTagsModal: (showTagsModal: boolean) => void;
}

