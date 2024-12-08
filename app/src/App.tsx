import React from 'react';
import { JSX, useEffect, useState } from 'react';

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
      <div>Hello {value}</div>
      <div>API: {data}</div>
      <div>Database: {dbData}</div>
    </div>
  );
}
