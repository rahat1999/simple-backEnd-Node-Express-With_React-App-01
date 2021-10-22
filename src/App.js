import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([])
  const nameRef = useRef()
  const emailRef = useRef()

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])
  const handaleAddUser = (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;

    const newUser = { name: name, email: email }

    //send data to the server side
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        const addedUser = data;
        const newUser = [...users, addedUser];
        setUsers(newUser)

        console.log(data)
      })
    nameRef.current.value = ""
    emailRef.current.value = ""
    e.preventDefault();
  }
  return (
    <div style={{ textAlign: "center" }}>
      <h1 >User Found: {users.length}</h1>
      <form onSubmit={handaleAddUser}>
        <input ref={nameRef} type="text" placeholder='name' />
        <br />
        <input ref={emailRef} type="email" placeholder='Email' />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>({user.id}) name: {user.name} Email: {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
