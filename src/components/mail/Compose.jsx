import React, { useRef, useState } from "react";
import classes from "./Compose.module.css";
import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";

const Compose = () => {
  const emailInputRef = useRef();
  const subjectInputRef = useRef();
  const [mailSent, setMailSent] = useState(false);

  const editorInputRef = useRef(null);
  const [content, setContent] = useState("");
  const fromEmail = useSelector((state) => state.email);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    setMailSent(prevState => !prevState);

    const toEmail = emailInputRef.current.value;
    let toMail = "";
    for (const letter of toEmail) {
      if (letter !== ".") {
        toMail += letter;
      }
    }

    let fromMail = "";
    for (const letter of fromEmail) {
      if (letter !== ".") {
        fromMail += letter;
      }
    }

    const composedMail = {
      fromMail: fromEmail,
      toMail: emailInputRef.current.value,
      subject: subjectInputRef.current.value,
      body: content,
    };

    try {
      const responseInbox = await fetch(
        `https://data-base-6259e-default-rtdb.firebaseio.com/inbox/${toMail}.json`,
        {
          method: "POST",
          body: JSON.stringify(composedMail),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseInboxData = await responseInbox.json();
      console.log(responseInboxData);

      const responseSent = await fetch(
        `https://data-base-6259e-default-rtdb.firebaseio.com/sent/${fromMail}.json`,
        {
          method: "POST",
          body: JSON.stringify(composedMail),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseSentData = await responseSent.json();
      console.log(responseSentData);

      emailInputRef.current.value = "";
      setContent("");
      subjectInputRef.current.value = "";
      setMailSent(prevState => !prevState);

    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <>
    <section className={classes.compose}>
      <h3>New Message</h3>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            required
            ref={emailInputRef}
            placeholder="To"
          />
        </div>
        <div className={classes.control}>
          <input
            type="text"
            id="subject"
            required
            ref={subjectInputRef}
            placeholder="Subject"
          />
        </div>
        <div className={classes.draft}>
          <JoditEditor
            ref={editorInputRef}
            value={content}
            onChange={(newContent) => {
              setContent(newContent);
            }}
          />
        </div>
        <div className={classes.actions}>
          <button style={{backgroundColor: mailSent ? "green" : "#9f5ccc"}}>{mailSent ? "Mail Sent" :"Send" }</button>
        </div>
      </form>
      </section>
    </>
  );
};

export default Compose;
