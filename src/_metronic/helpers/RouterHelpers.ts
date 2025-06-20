export function getCurrentUrl(pathname: string) {
  return pathname.split(/[?#]/)[0];
}

export function checkIsActive(pathname: string, url: string) {
  const current = getCurrentUrl(pathname);

  if (!current || !url) {
    return false;
  }

  // Normalize paths to ensure consistent comparison
  const normalizedCurrent = current.endsWith('/') ? current : `${current}/`;
  const normalizedUrl = url.endsWith('/') ? url : `${url}/`;

  // Check for exact match
  if (normalizedCurrent === normalizedUrl) {
    return true;
  }

  // Check if the current path starts with the URL and is a nested route
  if (normalizedCurrent.startsWith(normalizedUrl) && normalizedCurrent !== normalizedUrl) {
    return true;
  }

  return false;
}