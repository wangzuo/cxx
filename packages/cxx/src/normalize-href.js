import qs from 'qs';

export default href => {
  if (typeof href === 'string') {
    const [pathname, search] = href.split('?');
    const query = search && qs.parse(search);

    return query
      ? { pathname, query, search: `?${search}` }
      : { pathname, query: {} };
  } else {
    const { pathname, search } = href;

    return search
      ? { pathname, query: qs.parse(search.substr(1)), search }
      : { pathname, query: {} };
  }
};
