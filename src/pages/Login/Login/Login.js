import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { authContext } from "../../../AuthContext";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signIn, user } = useContext(authContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (data) => {
    const email = data.email;
    const password = data.password;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        toast.success("Successfully logged in");
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="flex justify-center">
      <div className="w-96 shadow-xl rounded-xl p-8">
        <h3 className="text-2xl font-semibold text-center mt-6">Login</h3>
        <form className="text-center" onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label className="label">Email</label>
            <input
              {...register("email", { required: "Email address is required!" })}
              type="email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>
          <div>
            <label className="label">Password</label>
            <input
              {...register("password", {
                required: "Invalid password!!",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer",
                },
              })}
              type="password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
            <label className="label">Forget Password?</label>
          </div>
          <input
            type="submit"
            value="Login"
            className="btn btn-accent lg:w-full"
          />
          <div></div>
        </form>
        <p className="my-4">
          New to doctors portal?{" "}
          <Link className="text-primary font-medium" to="/signup">
            Create new account
          </Link>{" "}
        </p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full mb-7">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Login;
