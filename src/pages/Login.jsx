import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/AuthProvider";

const loginSchema = yup.object().shape({
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

const Login = () => {
  const { login } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data) => {
    const { username, password } = data;

    await login(username, password);
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(handleLogin)} className="auth-form">
        <label htmlFor="username">Username:</label>
        <input type="text" {...register("username")} />
        {errors.username && (
          <div className="form-error-message">{errors.username.message}</div>
        )}

        <label htmlFor="password">Password:</label>
        <input type="password" {...register("password")} />
        {errors.password && (
          <div className="form-error-message">{errors.password.message}</div>
        )}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
