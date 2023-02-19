const DEFAULT_MESSAGE_TEMPLATE_ID = 69947

type Options = {
  requestUrl: string
  templateArgs: {
    title: string
    subtitle: string
    path: string
    buttonText: string
  }
  callback?: () => void
}

export const sendKakaoLink = ({ requestUrl, templateArgs }: Options) => {
  // window.Kakao.Link.sendScrap({
  //   templateId: DEFAULT_MESSAGE_TEMPLATE_ID,
  //   requestUrl,
  //   installTalk: true,
  //   templateArgs,
  // })
}
