const getIp = async () => {
  return new Promise<string>((resolve, reject) => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => resolve(data.ip))
      .catch((err) => reject(err));
  });
};

export default getIp;
