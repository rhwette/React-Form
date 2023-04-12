import { useState } from 'react';

import Form from './components/Form/Form';

function App() {
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      <Form />
    </div>
  );
}

export default App;
