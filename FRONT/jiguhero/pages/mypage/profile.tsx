import { FieldErrors, useForm } from "react-hook-form";




interface Update {
	username:string
	email: string
	password: string
}

export default function Profile() {
  
	const {register, watch, handleSubmit} = useForm<Update>()
	const onValid = (data: U) => {}
	const onInvalid = (errors:FieldErrors) => {}
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)} >
      <input
        {...register("username"), {
					required: true,
				}}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email"), {
					required: true
				}}
        type="email"
        placeholder="Username"
      />
      <input
			{...register("password"), {
				required: true
			}}
        type="password"
        placeholder="Username"
      />
			<input type="submit" value="submit" />
    </form>
  );
}
