import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import  profilePicture from "./graphics/profilepicture.png"
import { useEffect } from "react";
import useFetch from "./useFetch";

const Profile = (params) => {
  const { id } = useParams();
  const { data: profile, error, isPending } = useFetch(`http://localhost:8000/users/${id}`);

  useEffect(() => {
    
    console.log(profile);
  })

  return ( 
  <div className = "profile">
    <img src = {profilePicture} className = "profile-picture"></img>
  </div> );
}
 
export default Profile;