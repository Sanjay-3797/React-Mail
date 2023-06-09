import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Sent.module.css";

const Sent = () => {
  const [sent, setSent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMail, setShowMail] = useState(false);
  const currentEmail = useSelector((state) => state.email);

  let currentMail = "";
  for (const letter of currentEmail) {
    if (letter !== ".") {
      currentMail += letter;
    }
  }

  const mailToggleHandler = () => {
    setShowMail((prevState) => !prevState);
  };

  const fetchMail = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = fetch(
        `https://expense-tracker-48ec2-default-rtdb.firebaseio.com/${currentMail}.json`
      );

      const data = (await response).json();

      data.then((responseData) => {
        let sentMail = [];
        for (const key in responseData) {
          sentMail.push({
            id: key,
            fromMail: responseData[key].fromMail,
            toMail: responseData[key].toMail,
            subject: responseData[key].subject,
            body: responseData[key].body,
          });
        }
        setSent(sentMail);
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [currentMail]);

  useEffect(() => {
    fetchMail();
  }, [fetchMail]);

  const deleteMailHandler = async (mailId) => {
    try {
      const response = await fetch(
        `https://expense-tracker-48ec2-default-rtdb.firebaseio.com/${currentMail}/${mailId}.json`,
        {
          method: "DELETE",
        }
      );
      fetchMail();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      {isLoading && (
        <div className={classes.inbox}>
          <h4>Loading...</h4>
        </div>
      )}
      {sent.length > 0 && !showMail && (
        <section className={classes.inbox}>
          <div>
            {sent.map((mail) => (
              <div key={mail.id} className={classes.list}>
                <div className={classes.maillist} onClick={mailToggleHandler}>
                  <h2>{mail.subject}</h2>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {sent.length > 0 && showMail && (
        <section className={classes.inbox}>
          <div>
            {sent.map((mail) => (
              <div key={mail.id} className={classes.list}>
                <h2>{mail.subject}</h2>
                <h5>{mail.toMail}</h5>
                <p>{mail.body}</p>
                <div className={classes.actions}>
                  <button onClick={mailToggleHandler}>Back</button>
                  <button
                    onClick={() => {
                      deleteMailHandler(mail.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default Sent;
