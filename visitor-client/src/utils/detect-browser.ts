function detectBrowser() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf("Edg") > -1) {
    return "edge";
  } else if (userAgent.indexOf("Chrome") > -1) {
    return "chrome";
  } else if (userAgent.indexOf("Firefox") > -1) {
    return "firefox";
  } else if (userAgent.indexOf("Safari") > -1) {
    return "safari";
  } else if (userAgent.indexOf("Opera") > -1) {
    return "opera";
  } else if (
    userAgent.indexOf("Trident") > -1 ||
    userAgent.indexOf("MSIE") > -1
  ) {
    return "ie";
  }

  return "unknown";
}

export default detectBrowser;
