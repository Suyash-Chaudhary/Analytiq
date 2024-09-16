function getMetaData() {
  const domain = document
    .querySelector('meta[name="analytiq-domain"]')
    .getAttribute("content");

  return [domain];
}

export default getMetaData;
