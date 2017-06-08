import pathToRegexp from 'path-to-regexp';

function match(path, pathname) {
  const keys = [];
  const regexp = pathToRegexp(path, keys);
  const m = regexp.exec(pathname);

  if (!m) return null;

  const params = {};
  for (let i = 1, len = m.length; i < len; ++i) {
    const key = keys[i - 1];
    const val = 'string' == typeof m[i] ? decodeURIComponent(m[i]) : m[i];
    if (key) params[key.name] = val;
  }

  return params;
}

export default routes => {
  return location => {
    for (const path in routes) {
      const params = match(path, location.pathname);

      if (params) {
        return { ...location, params: params, page: routes[path] };
      }
    }

    return null;
  };
};
