import { useState, useEffect } from 'react'

function App() {

  const [apiTest, setApiTest] = useState(null);

  useEffect(() => {
    async function testApi() {
      const response = await fetch("/api/v1");
      const data = await response.json();
      setApiTest(data.result);
    }

    testApi();
    
  }, []);

  return (
    <h1>{apiTest}</h1>
  )
}

export default App
