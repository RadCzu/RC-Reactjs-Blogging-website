import { useEffect, useState } from "react";

const useFetch = (url) => {

  //hooks
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const abortcont = new AbortController();
    //fake timer
    setTimeout(() => {fetch(url, {signal: abortcont.signal})
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
      if(err.name === "AbortError") {
        console.log("fetch aborted");
      } else {
        setIsPending(false);
        setError(err.message);
      }
    });
    }, 1000);

    return () => abortcont.abort();

  }, [url]);

    return {data, isPending, error};
}

export default useFetch;