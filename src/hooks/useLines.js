import useSWR from 'swr';
import fetcher from './swrFetcher';

/** useLines returns lines from MongoDB
 * @param {Object} opts options for useSWR config, e.g. { refreshInterval: 1000 }
 * @returns {Object} lines, isValidating, mutate, error
 */
export default function useLines(opts = {}) {
    const {
        data: lines,
        isValidating,
        mutate,
        error,
    } = useSWR('/api/assets/lines/', fetcher, opts);

    return {
        lines,
        isValidating,
        mutate,
        error,
    };
}
