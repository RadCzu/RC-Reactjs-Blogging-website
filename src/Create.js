import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const loggedIn = useSelector((state => state.isLoggedIn));
  const account = useSelector((state => state.userName));

  const handleSubmit = (e) => {
    setIsPending(true);
    e.preventDefault();
    const blog = {title: title, body: body, author: account};
    if (account && loggedIn || account === "") {
      blog.author = account;
    } else {
      blog.author = "anonymous";
    }
    //adding object to a json server
    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(blog)
    }).then(() => {
      console.log("new blog added");
      setIsPending(false);
      history.push("/");
    })
  }
  return ( 
  <div className = "create">
    <h2>Add a new Blog</h2>
    <form onSubmit = {handleSubmit}>
      <label>
        Title:
      </label>
      <input
       type = "text" 
       required
       value = {title}
       onChange={(e) => setTitle(e.target.value)}>
      </input>
      <label>
        Body:
      </label>
      <textarea 
      required
      value = {body}
      onChange={(e => setBody(e.target.value))}> 
      </textarea>

      {!isPending && <button>Add Blog</button>}
      {isPending && <button>Adding blog...</button>}
    </form>
  </div> 
  );
}
 
export default Create;