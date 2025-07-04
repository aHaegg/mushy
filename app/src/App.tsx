import React, { JSX, useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export const App = (): JSX.Element => {
  const [data, setData] = useState("");
  const [dbData, setDbData] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(`/api/hello`);
        if (response.status === 401) {
          setVisible(true);
          return;
        }
        const { text, dbtext } = await response.json();
        setData(text);
        setDbData(dbtext);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  const callHello = async () => {
    try {
      const response = await fetch(`/api/hello`);
      if (response.status === 401) {
        setVisible(true);
        return;
      }
      const { text, dbtext } = await response.json();
      setData(text);
      setDbData(dbtext);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = () => {
    window.location.href = "/logout";
  };

  const accept = () => {
    window.location.href = "/login";
  };

  const value = "World!!";
  return (
    <div>
      <Card>Hello {value}.</Card>
      <div>API: {data}</div>
      <div>Database: {dbData}</div>
      <div>
        <button onClick={callHello}>Call hello</button>
        <button onClick={handleLogout}>Logga ut</button>
      </div>
      <Dialog
        header="Inte inloggad"
        visible={visible}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        footer={<Button onClick={accept}>Logga in</Button>}
      >
        <p className="m-0">Du verkar inte inloggad</p>
      </Dialog>
    </div>
  );
};
