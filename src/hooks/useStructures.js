import useSWR from 'swr';
import fetcher from './swrFetcher';

/** useStructures returns structures from MongoDB
 * @param {Object} opts options for useSWR config, e.g. { refreshInterval: 1000 }
 * @returns {Object} structures, isValidating, mutate, error
 */
export default function useStructures(opts = {}) {
  const {
    data: structures,
    isValidating,
    mutate,
    error,
  } = useSWR('/api/assets/structures/', fetcher, opts);

  return {
    structures,
    isValidating,
    mutate,
    error,
  };
}
