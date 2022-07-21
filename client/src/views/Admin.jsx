import { useState } from "react";
import { Link } from "react-router-dom";
import { BsPlusSquare } from "react-icons/bs";

import { UserTable } from '../components/UserTable'
import Navbar from "../components/Navbar";
import UserCreate from "./UserCreate";



const Admin = () => {

  const [isCreateNew, setisCreateNew] = useState(false)


  return (
    <>
      <Navbar />

      
      {isCreateNew && (
        <>
        <section>
          <UserCreate />
          <button onClick={() => setisCreateNew(false)}>Close <BsPlusSquare /></button>
        </section>
        </>
      )}
      <section>
        <h1>Admins Page</h1>
        <br />

        {!isCreateNew && (
          <button onClick={() => setisCreateNew(true)}>Add a User <BsPlusSquare /></button>
        )}

        <UserTable />
        <br />

      </section>
    
    </>
  )
}

export default Admin
