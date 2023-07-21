import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";

const SignUp = () => {

  const [username, setUsername] = useState("");
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordTooShort, setPasswordTooShort] = useState(false);
  const [passwordWrongChars, setPasswordWrongChars] = useState(false);
  const [passwordNotSame, setPasswordNotSame] = useState(false);
  const [email, setEmail] = useState("");

  const [emailInvalid, setEmailInvalid] = useState(false);

  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();

  const characters = 8;

  const handleSubmit = (e) => {
    setIsPending(true);
    e.preventDefault();
    const user = {username, password1, email};
    
    //adding object to a json server
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user)
    }).then(() => {
      setIsPending(false);
      history.push("/");
    })
  }

  function isValidEmail(input) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    return emailRegex.test(input);
  }

  function hasRequiredCharacters(input) {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /\d/;
    const uppercaseLetterRegex = /[A-Z]/;
  
    const hasSpecialChar = specialCharRegex.test(input);
    const hasNumber = numberRegex.test(input);
    const hasUppercaseLetter = uppercaseLetterRegex.test(input);
  
    return hasSpecialChar && hasNumber && hasUppercaseLetter;
  }

  function passwordRulesMet() {
    if(password1.length < characters) {
      setPasswordTooShort(true);
      return false;
    } else if(!hasRequiredCharacters(password1)) {
      setPasswordWrongChars(true);
      return false;
    } else if(password1 !== password2) {
      setPasswordNotSame(true);
      return false;
    }
    return true;
  }

  const handleAccountCreation = async (e) => {
    e.preventDefault(); // stop from submission
    if(passwordRulesMet()) {
      if(!isValidEmail(email)){
        setEmailInvalid(true);
      } else {
        setEmailInvalid(false);
        try {
          const response = await fetch("http://localhost:8000/auth/sign-up", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
          });
      
          if (response.ok) {
            const data = response.json();
            const index = data.id;
            setUsername(data.user);
            localStorage.setItem("userName", JSON.stringify({username}));
            localStorage.setItem("userIndex", JSON.stringify({index}));
            dispatch({type: "LOGIN", payload: {username, index} });
            handleSubmit(e);
            history.push("/");
          } else {
            console.log("Username Taken");
            setUsernameTaken(true);
          }
        } catch (error) {
          console.error("Error logging in:", error);
        }
      }
    }
  }


  return ( 
    <div className = "sign-up">
    
    <form onSubmit = {handleAccountCreation}>
      <div>
        <label>
          Account Name
        </label>
        <input 
        required
        value = {username}
        onChange={(e) => setUsername(e.target.value)}> 
        </input>
        {usernameTaken && <p className="sign-up-fail">Username already taken</p>}
        {!usernameTaken && <p></p>}
      </div>

      <div>
        <label>
          Email
        </label>
        <input 
        required
        value = {email}
        onChange={(e) => setEmail(e.target.value)}> 
        </input>
        {emailInvalid && <p className="sign-up-fail">Must be a real email adress</p>}
        {!emailInvalid && <p></p>}
      </div>

      <div>
        <label>
          Password
        </label>
        <input 
        required
        value = {password1}
        onChange={(e) => setPassword1(e.target.value)}> 
        </input>
        {passwordTooShort && <p className="sign-up-fail"> Password Too Short must be at least {characters} characters</p>}
        {passwordWrongChars && <p className="sign-up-fail"> Password must contain at least 1 number, uppercase letter and special character</p>}
        {!passwordTooShort && !passwordWrongChars && <p></p>}
      </div>

      <div>
        <label>
          Repeat Password
        </label>
        <input 
        required
        value = {password2}
        onChange={(e) => setPassword2(e.target.value)}> 
        </input>
        {passwordNotSame && <p className="sign-up-fail"> confirmed password must be the same </p>}
        {!passwordNotSame && <p></p>}
      </div>

      <button>Sign Up</button>

      {isPending && <h2>Loading...</h2>}
    </form>
  </div> 
   );
}
 
export default SignUp;