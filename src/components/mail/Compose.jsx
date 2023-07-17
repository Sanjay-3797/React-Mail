import React, { useRef, useState } from "react";
import classes from "./Compose.module.css";
import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";

const Compose = () => {
  const emailInputRef = useRef();
  const subjectInputRef = useRef();

  const editorInputRef = useRef(null);
  const [content, setContent] = useState("");
  const fromEmail = useSelector((state) => state.email);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const toEmail = emailInputRef.current.value;
    let toMail = "";
    for (const letter of toEmail) {
      if (letter !== ".") {
        toMail += letter;
      }
    }

    const composedMail = {
      fromMail: fromEmail,
      toMail: emailInputRef.current.value,
      subject: subjectInputRef.current.value,
      body: content,
    };

    try {
      const response = await fetch(
        `https://new-data-4a874-default-rtdb.firebaseio.com/${toMail}.json`,
        {
          method: "POST",
          body: JSON.stringify(composedMail),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
            id="email"
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
          <button>Send</button>
        </div>
      </form>
    </section>
  );
};

export default Compose;
