function checkValidUrl(url: string): boolean {
  const urlPattern = /^(http|https):\/\/[^ "]+$/;

  return urlPattern.test(url);
}

export default checkValidUrl;
