const DEFAULT_MESSAGE_TEMPLATE = 69947;

const defaultSettings = {
  templateId: DEFAULT_MESSAGE_TEMPLATE,
  requestUrl: "https://slams.app",
  installTalk: true,
};

type SendKakaoLink = (templateArgs: {
  title: string;
  subtitle: string;
  path: string;
  alertText: string;
  buttonText: string;
}) => void;

export const sendKakaoLink: SendKakaoLink = ({
  title,
  subtitle,
  path,
  alertText,
  buttonText,
}) => {
  const settings = {
    callback: () => {
      alert(alertText);
    },
    templateArgs: { title, subtitle, path, buttonText },
  };
  window.Kakao.Link.sendScrap({ ...defaultSettings, ...settings });
};
