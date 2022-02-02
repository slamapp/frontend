const DEFAULT_MESSAGE_TEMPLATE_ID = 69947;
const DEFAULT_REQUEST_URL = "https://slams.app";

const defaultSettings = {
  templateId: DEFAULT_MESSAGE_TEMPLATE_ID,
  requestUrl: DEFAULT_REQUEST_URL,
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
