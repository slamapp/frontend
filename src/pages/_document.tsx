import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import { ReactElement } from "react";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): ReactElement {
    return (
      <Html>
        <Head>
          <script
            async
            type="text/javascript"
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false&libraries=services`}
          />
          <script
            defer
            src="https://developers.kakao.com/sdk/js/kakao.min.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <style jsx global>
            {`
              #__next {
                height: 100%;
              }
            `}
          </style>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
