import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Inbox.module.css";

const Inbox = () => {
  const [inbox, setInbox] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentEmail = useSelector((state) => state.email);

  let currentMail = "";
  for (const letter of currentEmail) {
    if (letter !== ".") {
      currentMail += letter;
    }
  }

  const fetchMail = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = fetch(
        `https://expense-tracker-48ec2-default-rtdb.firebaseio.com/${currentMail}.json`
      );

      const data = (await response).json();

      data.then((responseData) => {
        let inboxMail = [];
        for (const key in responseData) {
          inboxMail.push({
            id: key,
            fromMail: responseData[key].fromMail,
            toMail: responseData[key].toMail,
            subject: responseData[key].subject,
            body: responseData[key].body,
          });
        }
        setInbox(inboxMail);
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
      {inbox.length > 0 && (
        <section className={classes.inbox}>
          <div>
            {inbox.map((mail) => (
              <div key={mail.id} className={classes.list}>
                <h2>{mail.subject}</h2>
                <h5>{mail.fromMail}</h5>
                <p>{mail.body}</p>
                <div className={classes.actions}>
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

export default Inbox;
