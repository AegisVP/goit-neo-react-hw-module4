import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com';
axios.defaults.headers.common['Authorization'] = `Client-ID pO_2ZBSNuhs85Q4s31H3v1TX3AwdWk7-chkwjUn1X7Q`;

let prevQuery = '';

export async function getPhotos(query, page = 1) {
  if (`${query}${page}` === prevQuery) return;

  prevQuery = `${query}${page}`;

  const res = await axios.get('/search/photos', { params: { query, page } });
  return res.data;
}
