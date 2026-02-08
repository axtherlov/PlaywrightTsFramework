import invariant from 'tiny-invariant';

export const EnvConfig = {
    baseUrl: getBaseUrl(),
}

function getBaseUrl() {
  const baseUrl = process.env['BASE_URL'];
  invariant(baseUrl, 'Cannot run tests without BASE_URL');
  return baseUrl;
}