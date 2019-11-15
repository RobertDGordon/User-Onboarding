import React from 'react';
import './App.css';
import UserForm from './components/Form'
import styled from 'styled-components'

const MainApp = styled.div `
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  font-size: calc(10px + 2vmin);
  color: white;
  margin: 0 auto;
  background-attachment: fixed;
  background-image: url('https://wallpaperaccess.com/full/11804.jpg');
  background-size:cover;

`

function App() {

  return (
    <MainApp>
      <UserForm />
    </MainApp>
  );
}

export default App;
