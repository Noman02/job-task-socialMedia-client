import React from "react";
import HomePosts from "./HomePosts";
import MakePost from "./MakePost/MakePost";

const Home = () => {
  return (
    <div>
      <MakePost></MakePost>
      <HomePosts></HomePosts>
    </div>
  );
};

export default Home;
