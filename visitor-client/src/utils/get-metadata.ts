function getMetaData() {
  const domain = document
    .querySelector('meta[name="analytiq-domain"]')
    ?.getAttribute("content");

  if (!domain) throw new Error("Domain name not set in metadata");
  return [domain];
}

export default getMetaData;
