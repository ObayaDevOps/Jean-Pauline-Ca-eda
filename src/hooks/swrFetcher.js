import axios from 'axios';
import toast from 'react-hot-toast';

export default async function fetcher(url) {
  if (!url) throw new Error('no url provided');

  const res = await axios.get(url).catch((e) => {
    if (e.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const error = new Error();
      error.info = e.response;
      error.status = e.response.status;
      error.message = 'An error occurred while fetching the data.';

      if (e.response.status !== 401) {
        toast.error(error.message);
      }

      throw error;
    } else if (e.request) {
      // The request was made but no response was received
      const error = new Error();
      error.info = e.request;
      error.status = e.request.status;
      error.message = 'An error occurred while requesting the data.';
      toast.error(error.message);

      throw error;
    } else if (!res.data.success) {
      const error = new Error();
      error.info = res.data.message;
      error.status = e.request.status;
      error.message = 'An error occurred while getting the data';
      toast.error(error.message);

      throw error;
    } else {
      const error = new Error();
      error.message = 'An error occurred setting up the request in the hook';
      toast.error(error.message);

      throw error;
    }
  });

  const { data } = res.data;
  return data;
}
