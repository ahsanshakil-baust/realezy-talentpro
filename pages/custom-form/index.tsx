import React from 'react'
import { useForm } from 'react-hook-form';

const CustomeFormFormDemo = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("firstName", { required: true, shouldUnregister: true })} />
      {errors.firstName && <span>This field is required</span>}
      <input {...register("lastName", { required: true, shouldUnregister: true })} />
      {errors.lastName && <span>This field is required</span>}
      <input type="submit" />
    </form>
  )
}

export default CustomeFormFormDemo
