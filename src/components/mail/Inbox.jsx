import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Inbox.module.css";
import { authActions } from "../../store";

const Inbox = () => {
  const [inbox, setInbox] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMail, setShowMail] = useState(false);
  const [read, setRead] = useState(true);
  const currentEmail = useSelector((state) => state.email);
  const dispatch = useDispatch();

  let currentMail = "";
  for (const letter of currentEmail) {
    if (letter !== ".") {
      currentMail += letter;
    }
  }

  const mailToggleHandler = () => {
    setShowMail((prevState) => !prevState);
    setRead(false);
  };

  const fetchMail = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = fetch(
        `https://new-data-4a874-default-rtdb.firebaseio.com/${currentMail}.json`
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
    // setInterval(() => {
    //   fetchMail();
    // }, 30000);
  }, [fetchMail]);

  const deleteMailHandler = async (mailId) => {
    try {
      const response = await fetch(
        `https://new-data-4a874-default-rtdb.firebaseio.com/${currentMail}/${mailId}.json`,
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

  dispatch(authActions.setUnRead(inbox.length));

  return (
    <React.Fragment>
      {isLoading && (
        <div className={classes.inbox}>
          <h4>Loading...</h4>
        </div>
      )}
      {inbox.length === 0 && !isLoading && (
        <div className={classes.inbox}>
          <h4>No Mails Found.</h4>
        </div>
      )}
      {inbox.length > 0 && !showMail && !isLoading && (
        <section className={classes.inbox}>
          <div>
            {inbox.map((mail) => (
              <div key={mail.id} className={classes.list}>
                <div
                  to="/main/inbox"
                  className={classes.maillist}
                  onClick={mailToggleHandler}
                >
                  <h2>
                    {read && <span>* </span>}
                    {mail.subject}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {inbox.length > 0 && showMail && (
        <section className={classes.inbox}>
          <div>
            {inbox.map((mail) => (
              <div key={mail.id} className={classes.list}>
                <h2>{mail.subject}</h2>
                <h5>{mail.fromMail}</h5>
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

export default Inbox;
