// import React, { FormEvent, useRef, useState } from 'react';
import './Form.css';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(3, { message: 'Name must have at least 3 chars' }),
  age: z
    .number({ invalid_type_error: 'Age field is required' })
    .min(18, { message: 'Age must be at least 188' }),
});

type FormData = z.infer<typeof schema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          // {...register('name', { required: true, minLength: 3 })}
          {...register('name')}
          id="name"
          type="text"
          className="form-control"
        />

        {errors.name && <p className="text-danger"> {errors.name.message}</p>}
        {/* errors object could be empty 
        the ?. or optional chaining will chain the '.type' only
        if there is a name property in the object errors */}

        {/* {errors.name?.type === 'required' && (
          <p className="text-danger"> The name field is required</p>
        )} */}
        {/* {errors.name?.type === 'minLength' && (
          <p className="text-danger"> The name must be at least 3 characters</p>
        )} */}
      </div>
      <div className="form">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register('age', { valueAsNumber: true })}
          id="age"
          type="number"
          className="form-control"
        />
        {errors.age && <p className="text-danger"> {errors.age.message}</p>}
      </div>
      <button
        disabled={!isValid}
        className="button btn btn-primary"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
