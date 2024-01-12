import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FillUp from './Page/FillUp.jsx'
import Login from './Page/Login.jsx'
import Dashboard from './Page/Dashboard.jsx'
import UserAdd from './Page/UserAdd.jsx'
import Form from './Page/Form.jsx'
import AddForm from './Page/AddForm.jsx'
import Profile from './Component/Profile.jsx'
import Post from './Component/Post.jsx'
import CalForm from './Page/CalForm.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import UserEdit from './Page/UserEdit.jsx'
import AddEvevt from './Page/AddEvevt.jsx'
import PostEv from './Component/PostEv.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='form' element={<Form />} />
      <Route path='login' element={<Login />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='useredit' element={<UserEdit /> } />
      <Route path='form' element={<Form />} />
      <Route path='addform' element={<AddForm />} />
      <Route path='profile' element={<Profile />} />
      <Route path='post' element={<Post />} />
      <Route path='calform' element={<CalForm />} />
      <Route path='fillup' element={<FillUp />} />
      <Route path='useradd' element={<UserAdd />} />
      <Route path='addevent' element={<AddEvevt/>} />
      <Route path='postev' element={<PostEv />} />
    </Routes>
  </BrowserRouter>
)
