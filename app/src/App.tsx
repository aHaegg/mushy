import React from 'react';
import { JSX, useEffect, useState } from 'react';

export const App = (): JSX.Element => {

  const [data, setData] = useState('');

  useEffect(() => {
    (async function () {
      const { text } = await (await fetch(`/api/hello`)).json();
      setData(text);
    })();
  }, []);

  const value = 'World!!';
  return (
    <div>
      <div>Hello {value}</div>
      <div>API: {data}</div>
    </div>
  );
}
