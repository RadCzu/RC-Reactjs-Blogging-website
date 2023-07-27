import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import  profilePicture from "./graphics/profilepicture.png"
import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Profile = (params) => {
  const { id } = useParams();
  const [username, setUsername] = useState();
  const [bloglist, setBloglist] = useState([]);
  const {data: blogs, isPending, error} = useFetch('http://localhost:8000/blogs');
  const history = useHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/auth/get-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.name);
        } else {
          console.log("Failed to load profile");
          history.push("/NotFound")
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    };

    fetchUserData();
    if(!isPending){
    setBloglist(blogs.filter(blog => blog.author === username));
    }
  }, [id, isPending]);

  return ( 
  <div className = "profile">
    {!isPending && <h2 className = "header">{username}</h2>}
    {!isPending && <img src = {profilePicture} className = "profile-picture"></img>}
    {!isPending && <BlogList blogs = {bloglist} title = {username + "'s blogs"}></BlogList>}
    {isPending && <h1>Loading...</h1>}
  </div> );
}
 
export default Profile;