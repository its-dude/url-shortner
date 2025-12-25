export function normalizeAndValidateUrl(input: string): string {
  const url = new URL(input);

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('Invalid protocol');
  }

  return url.toString();
}
