const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export async function getTopStoriesIds() {
  try {
    const response = await fetch(`${BASE_URL}/topstories.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch top stories');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching top stories:', error.message);
    return [];
  }
}

export async function getStoryById(id) {
  try {
    if (id) {
      const response = await fetch(`${BASE_URL}/item/${id}.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch top stories');
      }
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching unique storie:', error.message);
    return [];
  }
}
