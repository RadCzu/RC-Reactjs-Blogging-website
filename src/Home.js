const Home = () => {

  const handleClick = () => {
    console.Log("twoja stara");
  }
  return ( 
    <div className = "Home">
      <h2>Homepage</h2>
      <button onClick = {handleClick}>Click me</button>
    </div>
   );
}
 
export default Home;