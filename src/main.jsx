import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Page/Home.jsx'
import Login from './Page/Login.jsx'
import Dashboard from './Page/Dashboard.jsx'
import Register from './Page/Register.jsx'
import Form from './Page/Form.jsx'
import AddForm from './Page/AddForm.jsx'
import Profile from './Component/Profile.jsx'
import Post from './Component/Post.jsx'
import Tests from './Component/Tests.jsx'
import CalForm from './Page/CalForm.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import EditForm from './Page/EditForm.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='Home' element={<Home />} />
      <Route path='Login' element={<Login />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='register' element={<Register /> } />
      <Route path='form' element={<Form />} />
      <Route path='addform' element={<AddForm />} />
      <Route path='profile' element={<Profile />} />
      <Route path='post' element={<Post />} />
      <Route path='calform' element={<CalForm />} />
      <Route path='tests' element={<Tests />} />
      <Route path='home' element={<Home />} />
      <Route path='editform' element={<EditForm />} />
    </Routes>
  </BrowserRouter>
)
