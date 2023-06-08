import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Inbox = () => {
  // const [inbox, setInbox] = useState([]);
  const currentEmail = useSelector((state) => state.email);

  const fetchMail = useCallback(async () => {
    try {
      let currentMail = "";
      for (const letter of currentEmail) {
        if (letter !== ".") {
          currentMail += letter;
        }
      }

      const response = fetch(
        `https://expense-tracker-48ec2-default-rtdb.firebaseio.com/${currentMail}.json`
      );

      const data = (await response).json();

      // let inboxMail = [];
      // for (const key in data) {
      //   inboxMail.push({
      //     id: key,
      //     fromMail: data[key].toMail,
      //     toMail: data[key].fromMail,
      //     subject: data[key].subject,
      //     body: data[key].body,
      //   });
      // }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, [currentEmail]);

  useEffect(() => {
    fetchMail();
  }, [fetchMail]);

  // const mails = inbox.map((mail) => <li>{mail.key}</li>);

  return <div></div>;
};

export default Inbox;
