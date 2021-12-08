import { ChangeEvent, FormEvent, useState } from "react";

export type Error<T> = { [P in keyof T]?: string };

interface UseFormArgs<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validate: (values: T) => Error<T>;
}

const useForm = <T>({ initialValues, onSubmit, validate }: UseFormArgs<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Error<T>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const newErrors = validate ? validate(values) : {};
    if (Object.keys(newErrors).length === 0) {
      await onSubmit(values);
    }
    setErrors(newErrors);
    setIsLoading(false);
  };

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
