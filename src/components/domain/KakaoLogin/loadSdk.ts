export default () =>
  new Promise((resolve) => {
    const js: HTMLScriptElement = document.createElement("script");

    js.id = "kakao-sdk";
    js.src = "//developers.kakao.com/sdk/js/kakao.min.js";
    js.onload = resolve;

    document.body.append(js);
  });
