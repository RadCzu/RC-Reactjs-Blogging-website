import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {

  //hooks
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    //do not change the state in this
    //if only on first render, add a 2nd argument, '[]'
    fetch('http://localhost:8000/blogs')
      .then(response => response.json())
      .then(data => setBlogs(data))
  }, []);

  return ( 
    <div className = "Home">
      {
      blogs && <BlogList blogs = {blogs} title = {"dupa"}/>
      }
    </div>
   );
}
 
export default Home;