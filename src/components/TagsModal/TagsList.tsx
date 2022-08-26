import { TagsListProps } from './types';

const TagsList = ({ focusedImage, tagsArray, handleTag }: TagsListProps) => (
  <div className="flex w-full h-40 overflow-scroll overflow-x-hidden p-3 flex-wrap">
    {focusedImage &&
      tagsArray.map((tag: string) => {
        return (
          <button
            key={`${tag}-${focusedImage.id}`}
            className="h-fit bg-violet-600 text-white rounded-md p-2 text-sm m-2"
            onClick={() => handleTag(tag)}>
            {tag}
          </button>
        );
      })}
  </div>
);

export default TagsList;

