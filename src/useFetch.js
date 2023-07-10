import { useEffect, useState } from "react";

const useFetch = (url) => {

  //hooks
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    //fake timer
    setTimeout(() => {fetch(url)
    .then(response => {
      console.log(response);
      if(!response.ok) {
        throw Error("could not fetch the data");
      }
      return response.json();
    })
    .then(data => {
      setData(data);
      setIsPending(false);
    })
    .catch(err => {
      setIsPending(false);
      setError(err.message);
    });
    }, 1000);

  }, [url]);

    return {data, isPending, error};
}

export default useFetch;