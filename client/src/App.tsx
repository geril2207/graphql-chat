import  { useState } from "react";
// import { useSendMessageMutation } from '../generated/graphql'
import Router from "./routes/Router";

function App() {
  // const [mutate] = useSendMessageMutation()
  // useEffect(() => {
  //   mutate({
  //     variables: {
  //       message: {
  //         message: '123',
  //         receiverId: 2,
  //       },
  //     },

  //   })
  // }, [])
  const [asd, setasd] = useState('123')
  return (
    <div className="app">
      <Router />
    </div>
  );
}

export default App;
