import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MakePost = () => {
  const { register, handleSubmit, reset } = useForm();
  const imageHostKey = process.env.REACT_APP_imgbb_key;
  const navigate = useNavigate();

  const addPost = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const post = {
            text: data.text,
            image: imgData.data.url,
          };
          fetch("http://localhost:5000/posts", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(post),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success(`Posted`);
              navigate("/allmedia");
              reset();
            });
        }
      });
  };

  return (
    <div>
      <div className="bg-gray-200 max-w-screen-lg mx-auto p-4 my-12">
        <p className="items-center md:flex m-3">
          <FaPencilAlt></FaPencilAlt>
          <span className="font-semibold text-lg ml-4">Make Post</span>
        </p>
        <hr />
        <form onSubmit={handleSubmit(addPost)}>
          <textarea
            {...register("text", {
              required: "Text is required!",
            })}
            className="textarea border-none w-full h-48 text-lg font-medium"
            placeholder="Make Your Post   "
          ></textarea>
          <hr />
          <div className="my-4">
            <label>Photo</label>
            <input
              {...register("image")}
              type="file"
              placeholder="Type here"
              className="input w-full max-w-xs"
            />
          </div>
          <button className="btn btn-primary text-white">POST</button>
        </form>
      </div>
    </div>
  );
};

export default MakePost;
