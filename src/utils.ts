import ImageEntry from './redux/slices/images/types';

export const getImage = async (): Promise<ImageEntry | undefined> => {
  try {
    const response = await fetch(
      'https://api.thecatapi.com/v1/images/search?limit=1&mime_types=&order=Random&size=small&page=3&sub_id=demo-ce06ee',
    );
    const data = await response.json();

    if (data.length) {
      const { id, url, width, height } = data[0];

      return { id, url, isLiked: false, width, height, tags: [] };
    }
  } catch (error) {
    alert(error);
  }
};

