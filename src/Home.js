import { useState } from "react";
import BlogList from "./BlogList";

const Home = () => {

  //hooks
  const [blogs, setBlogs] = useState([
    {title: "My new websote", body: "It's a me",author: "Mario", id: 1},
    {title: "Twoja Stara", body: "zapierdala",author: "Twój Stary", id: 2},
    {title: "Top Secret", body: "None of your buisness",author: "HWI@#$(&hs12", id: 3}
  ]);

  
  const handleDelete = (id) => {
    const newBlogs = blogs.filter((blog) => blog.id !== id)
    setBlogs(newBlogs);
  }

  return ( 
    <div className = "Home">
      <BlogList blogs = {blogs} title = {"dupa"} handleDelete = {handleDelete}/>
      <BlogList blogs = {blogs.filter((blog) => blog.author === "Mario")} title = {"Mario's blogs"} handleDelete = {handleDelete}/>
    </div>
   );
}
 
export default Home;