import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NotFound = () => {
  return ( 
    <div className = "notFound">  
      <h1> Error 404 </h1>
      <p> Page not Found </p>
      <Link to = "/"> Homepage </Link>
    </div>
     );
    

}
 
export default NotFound;