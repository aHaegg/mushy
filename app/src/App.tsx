import React from 'react';
import { JSX, useEffect, useState } from 'react';
import { Card } from 'primereact/card';

export const App = (): JSX.Element => {

  const [data, setData] = useState('');
  const [dbData, setDbData] = useState('');

  useEffect(() => {
    (async function () {
      const { text, dbtext } = await (await fetch(`/api/hello`)).json();
      setData(text);
      setDbData(dbtext);
    })();
  }, []);

  const value = 'World!!';
  return (
    <div>
      <Card>Hello {value}</Card>
      <div>API: {data}</div>
      <div>Database: {dbData}</div>
    </div>
  );
}
