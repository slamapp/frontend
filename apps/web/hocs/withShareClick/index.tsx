import { ComponentType, UIEvent } from 'react'
import { positionType, proficiencyType } from '@slam/types'
import copy from 'copy-to-clipboard'
import { Toast } from '~/components/uis'
import { sendKakaoLink } from './sendKakaoLink'
import { ShareArgs } from './types'

const handleShareClick = (isKakaoInitialized: boolean, options: Parameters<typeof sendKakaoLink>[0]) => {
  if (isKakaoInitialized) {
    sendKakaoLink(options)
  } else {
    const copyText = options.requestUrl + options.templateArgs.path

    copy(copyText)
    Toast.show(`🔗 공유하실 링크를 복사했습니다 (${copyText})`)
  }
}

const withShareClick = (...args: ShareArgs) => {
  return (WrappedComponent: ComponentType<{ onClick?: (e?: UIEvent) => void }>) => {
    const defaultOptions = {
      requestUrl:
        window.location.hostname === 'localhost' ? `http://${window.location.host}` : `https://${window.location.host}`,
      templateArgs: {
        title: '슬램',
        subtitle: '같이 농구할 사람이 없다고?',
        path: '',
        buttonText: '슬램에서 보기',
      },
      callback: () =>
        Toast.show('성공적으로 공유했어요', {
          status: 'success',
        }),
    }

    let options: Parameters<typeof sendKakaoLink>[0] = {
      ...defaultOptions,
    }

    switch (args[0]) {
      case 'court': {
        const { id, name } = args[1].court
        options = {
          ...defaultOptions,
          templateArgs: {
            title: `${name}`,
            subtitle: `${name}에서 농구 한판 어때요?`,
            path: `/map?courtId=${id}`,
            buttonText: `${name} 놀러가기`,
          },
          callback: () =>
            Toast.show(`농구장 공유에 성공했어요🥳`, {
              status: 'success',
            }),
        }

        break
      }

      case 'courtChatroom': {
        const { id, court } = args[1].courtChatroom
        options = {
          ...defaultOptions,
          templateArgs: {
            title: `${court.name}`,
            subtitle: `우리 ${court.name} 채팅방으로 놀러오세요`,
            path: `/chat/${id}`,
            buttonText: `${court.name} 놀러가기`,
          },
          callback: () =>
            Toast.show(`농구장 채팅방 공유에 성공했어요🥳`, {
              status: 'success',
            }),
        }

        break
      }

      case 'user': {
        const { id, nickname, positions, proficiency } = args[1].user
        options = {
          ...defaultOptions,
          templateArgs: {
            title: `${nickname}`,
            subtitle: `${nickname}를 소개합니다
  포지션: ${positions.map((position) => positionType[position]).join(', ')}${
              proficiency
                ? `
  실력: ${proficiencyType[proficiency]}`
                : ''
            }`,
            path: `/user/${id}`,
            buttonText: `${nickname}를 만나러 가기`,
          },
          callback: () =>
            Toast.show(`사용자 공유에 성공했어요🥳`, {
              status: 'success',
            }),
        }

        break
      }

      default: {
        throw new Error('지정된 type이 아니면 withShareClick는 eventHandler를 바인딩 할 수 없습니다.')
      }
    }

    return (
      // <WrappedComponent
      //   onClick={() => handleShareClick(isKakaoInitialized, options)}
      // />
      null
    )
  }
}

export default withShareClick
