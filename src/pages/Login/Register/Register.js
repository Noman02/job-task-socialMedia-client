import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../../AuthContext";

const Register = () => {
  const { createUser, updateUser } = useContext(authContext);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const imageHostKey = process.env.REACT_APP_imgbb_key;

  const handleSignup = (data) => {
    const image = data.photo[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((img) => {
        if (img.success) {
          const photo = img.data.url;
          const name = data.name;
          const email = data.email;
          const password = data.password;

          //create user
          createUser(email, password)
            .then((result) => {
              const user = result.user;
              toast.success("User created successfully");

              updateUserProfile(name, photo);
              navigate("/");
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
  };

  const updateUserProfile = (name, photo) => {
    const profile = {
      displayName: name,
      photoURL: photo,
    };
    updateUser(profile);
  };

  return (
    <div className="flex justify-center">
      <div className="w-96 shadow-xl rounded-xl p-8">
        <h3 className="text-2xl font-semibold text-center mt-6">SignUp</h3>
        <form onSubmit={handleSubmit(handleSignup)} className="text-center">
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", {
                required: "name is required!",
              })}
              className="input input-bordered w-full"
            />
            {errors?.name && (
              <p className="text-red-600">{errors?.name.message}</p>
            )}
          </div>
          <div>
            <label className="label">Photo</label>
            <input
              type="file"
              {...register("photo", {
                required: "photo is required!",
              })}
              className="input input-bordered w-full"
            />
            {errors?.name && (
              <p className="text-red-600">{errors?.name.message}</p>
            )}
          </div>
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Please set valid email!",
              })}
              className="input input-bordered w-full"
            />
            {errors?.email && (
              <p className="text-red-600">{errors?.email.message}</p>
            )}
          </div>
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer ",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  message: "password must be strong!",
                },
              })}
              className="input input-bordered w-full"
            />
            {errors?.password && (
              <p className="text-red-600">{errors?.password.message}</p>
            )}
          </div>
          <input
            type="submit"
            value="Login"
            className="btn btn-accent lg:w-full mt-4"
          />
        </form>
        <p className="my-4">
          Already have an account?{" "}
          <Link className="text-primary font-medium" to="/login">
            SignUp
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

export default Register;
