import { DevTool } from '@hookform/devtools'
import { Stack } from '@jsxcss/emotion'
import { Suspense } from '@suspensive/react'
import { useForm } from 'react-hook-form'
import { Spinner } from '~/components/common'
import { Navigation } from '~/layouts/Layout/navigations'

const delay = (s: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${s}초 후 성공했습니다.`)
    }, s * 1000)
  })

type Form = { test: ('one' | 'two' | 'three' | 'four')[] }

const Test = () => {
  const form = useForm<Form>({
    defaultValues: async () => {
      await delay(2)

      return { test: ['one', 'two'] }
    },
  })

  return (
    <Navigation top={{ isBack: true, title: 'formTest' }}>
      <Suspense.CSROnly>
        {form.formState.isLoading ? (
          <Spinner />
        ) : (
          <Stack.Vertical as="form" onSubmit={form.handleSubmit((form) => console.log(form))}>
            <label htmlFor="one">
              {form.formState.isLoading ? (
                <Spinner />
              ) : (
                <input type="checkbox" {...form.register('test')} id="one" value="one" />
              )}

              <span>one</span>
            </label>

            <label htmlFor="two">
              <input type="checkbox" {...form.register('test')} id="two" value="two" />
              <span>two</span>
            </label>
            <label htmlFor="three">
              <input type="checkbox" {...form.register('test')} id="three" value="three" />
              <span>three</span>
            </label>
            <label htmlFor="four">
              <input type="checkbox" {...form.register('test')} id="four" value="four" />
              <span>four</span>
            </label>
            <button type="submit">Submit</button>
          </Stack.Vertical>
        )}
      </Suspense.CSROnly>
      <DevTool control={form.control} />
    </Navigation>
  )
}

export default Test
