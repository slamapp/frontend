import type { ComponentProps, ComponentPropsWithRef, ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import { createContext, forwardRef, useContext, useMemo } from 'react'
import { DevTool } from '@hookform/devtools'
import { ErrorMessage } from '@hookform/error-message'
import { Box, Stack, useMediaQuery } from '@jsxcss/emotion'
import { Suspense } from '@suspensive/react'
import { useForm } from 'react-hook-form'
import { Spinner } from '~/components/common'
import LoadingIndicator from '~/components/kakaos/Map/LoadingIndicator'
import { Tab } from '~/components/uis'
import { Navigation } from '~/layouts/Layout/navigations'

type Form = {
  text: string
  textarea: string
  radio1: 'one' | 'two' | 'three'
  checkbox: ('one' | 'two' | 'three')[]
}

const Test = () => {
  const mediaQuery = useMediaQuery()
  const { register, control, handleSubmit, formState } = useForm<Form>({
    defaultValues: {
      text: 'text',
      textarea: 'textarea',
      checkbox: ['two', 'one'],
    },
  })

  const onSubmit = handleSubmit((form) => {
    console.log(form)
  })

  return (
    <Navigation top={{ isBack: true, title: 'Test' }} bottom>
      <Suspense.CSROnly>
        <LoadingIndicator />

        <Tab defaultTabName="kjlj">
          <Tab.Panel tabName="kjlj" />
          <Tab.Panel tabName="kjlj1" />
        </Tab>
        <Stack.Vertical as="form" onSubmit={onSubmit}>
          <Input
            type="text"
            {...register('text', {
              maxLength: { value: 8, message: '8 is maxLength' },
            })}
          />
          <ErrorMessage errors={formState.errors} name="text" />

          <Box as="textarea" height={200} {...register('textarea')} />

          <RadioGroup {...register('radio1', { required: true })} direction="horizontal" align="center" spacing={8}>
            <Radio value="one" label="1번 라디오" />
            <Radio value="two" label="2번 라디오" />
          </RadioGroup>
          <CheckboxGroup {...register('checkbox')}>
            <Checkbox value="one" label="1번 체크박스" />
            <Checkbox value="two" label="2번 체크박스" />
          </CheckboxGroup>
          <button
            type="submit"
            css={mediaQuery({
              backgroundColor: 'royalblue',
              color: 'white',
            })}
          >
            Submit
          </button>
          <Spinner />
        </Stack.Vertical>

        <DevTool control={control} />
      </Suspense.CSROnly>
    </Navigation>
  )
}

export default Test

const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(function Input(props, ref) {
  return <Box ref={ref} as="input" {...props} />
})

const CheckboxGroupContext = createContext<ComponentPropsWithRef<'input'> | undefined>(undefined)
const CheckboxGroup = forwardRef<
  HTMLInputElement,
  PropsWithChildren<Pick<ComponentPropsWithRef<'input'>, 'name' | 'onChange' | 'onBlur' | 'ref'>>
>(function Input({ children, ...props }, ref) {
  const value = useMemo(() => ({ ...props, ref }), [props, ref])

  return (
    <fieldset>
      <CheckboxGroupContext.Provider value={value}>{children}</CheckboxGroupContext.Provider>
    </fieldset>
  )
})
const useCheckboxGroup = () => {
  const checkboxGroup = useContext(CheckboxGroupContext)

  if (checkboxGroup === undefined) {
    throw new Error('CheckboxGroup를 부모 컴포넌트에 추가해주세요.')
  }

  return checkboxGroup
}
const Checkbox = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'> & { label?: string }>(function Input(
  { label, ...props },
  ref
) {
  const checkboxGroup = useCheckboxGroup()

  return (
    <Stack.Horizontal as="label" align="center" spacing={4}>
      <Box as="input" type="checkbox" ref={ref} {...checkboxGroup} {...props} />
      {!!label && <Box as="span">{label}</Box>}
    </Stack.Horizontal>
  )
})

const RadioGroupContext = createContext<ComponentPropsWithRef<'input'> | undefined>(undefined)
const RadioGroup = forwardRef<
  HTMLInputElement,
  PropsWithChildren<Pick<ComponentPropsWithRef<'input'>, 'name' | 'onChange' | 'onBlur' | 'ref'>> &
    Pick<ComponentProps<typeof Stack>, 'direction' | 'align' | 'justify' | 'spacing'>
>(function RadioGroup({ direction, align, justify, spacing, children, ...props }, ref) {
  const value = useMemo(() => ({ ...props, ref }), [props, ref])

  return (
    <Stack as="fieldset" direction={direction} align={align} justify={justify} spacing={spacing}>
      <RadioGroupContext.Provider value={value}>{children}</RadioGroupContext.Provider>
    </Stack>
  )
})
const useRadioGroup = () => {
  const radioGroup = useContext(RadioGroupContext)

  if (radioGroup === undefined) {
    throw new Error('RadioGroup를 부모 컴포넌트에 추가해주세요.')
  }

  return radioGroup
}

const Radio = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'> & { label?: string }>(function Radio(
  { label, ...props },
  ref
) {
  const radioGroup = useRadioGroup()
  const id = props.id ?? (props.value as string)

  return (
    <Stack.Horizontal as="label" htmlFor={id} align="center" spacing={4}>
      <Box as="input" id={id} type="radio" ref={ref} {...radioGroup} {...props} />
      {!!label && <Box as="span">{label}</Box>}
    </Stack.Horizontal>
  )
})
