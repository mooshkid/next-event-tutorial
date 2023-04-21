import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";


const SingleEvent = ({ data }) => {
  // console.log(data);

  const inputEmail = useRef();
  const router = useRouter();
  // console.log(router);
  const [message, setMessage] = useState('');


  const onSubmit = async (e) => {
    e.preventDefault();
    const emailValue = inputEmail.current.value;
    const eventId = router?.query.id;
    // console.log(eventId);


    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!emailValue.match(validRegex)) {
      setMessage('Please enter a valid email address')
    }

    try {
      // POST fetch request
      const response = await fetch('/api/email-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: emailValue, eventId})
      })

      if(!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setMessage(data.message);
      inputEmail.current.value = '';
      
      console.log('Post', data)



    }
    catch (e) {
      console.log(e, "Error fetching event")
    }
  };



  return (
    <div>
      <p>hello</p>
      <h1>{data.title}</h1>
      <Image src={data.image} width={1000} height={500} alt={data.title} />
      <p>{data.description}</p>
      <form onSubmit={onSubmit} className="email_registration">
        <label>Get Registered for this event!</label>
        {/* <input ref={inputEmail} type="email" id="email" placeholder="Please insert your email here"/><button> Submit </button> */}
        {/* remove the type so browser doesn't try to auto check  */}
        <input ref={inputEmail} id="email" placeholder="Please insert your email here"/><button> Submit </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default SingleEvent;
