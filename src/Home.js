import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  //data: blogs is important
  const {data: blogs, isPending, error} = useFetch('http://localhost:8000/blogs');

  return ( 
    <div className = "Home">
      {error && <div> {error} </div>}
      {isPending && <div> Loading... </div>}
      {blogs && <BlogList blogs = {blogs} title = {"dupa"}/>}
    </div>
   );
}
 
export default Home;

//npx json-server --watch  data/db.json --port 8000