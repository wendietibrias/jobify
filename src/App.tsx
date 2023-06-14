import React from 'react';
import { Route,Routes } from "react-router-dom";
import { 
  Login,
  Register,
  Auth,
  Main,
  Stats,
  CreateJob,
  AllJob,
  Profile,
  UpdateJob
 } from './pages';


const App = () => {
  return (
    <div className="App">
      <Routes>
         <Route path="/auth" element={<Auth/>}>
           <Route path="login" element={<Login/>}/>
           <Route path="register" element={<Register/>}/>
         </Route>

         <Route path="/" element={<Main/>}>
           <Route index element={<Stats/>}/>
           <Route path="create" element={<CreateJob/>}/>
           <Route path="all-job" element={<AllJob/>}/>
           <Route path="profile" element={<Profile/>}/>
           <Route path="update/:id" element={<UpdateJob/>}/>
         </Route>
      </Routes>
    </div>
  );
}

export default App;
