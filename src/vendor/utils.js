import {stringify} from 'query-string';
import {fetch2} from './fetch';

function buildURL(url, params) {
    if (params == null) return url;

    const serializedParams = stringify(params);
    if (!serializedParams) return url;

    return `${url}${url.indexOf('?') < 0 ? '?' : '&'}${serializedParams}`;
}

export {buildURL, fetch2};
