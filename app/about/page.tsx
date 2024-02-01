// pages/index.js
"use client";
import { useEffect, useState } from "react";
import { getUsers } from "@/app/api/getUserData/route";
interface User {
  id: string;
  nama: string;
  email: string;
  no_sk: string;
  file_sk: string | null;
  password: string;
  foto_profile: string | null;
  no_telp: string;
  alamat: string | null;
}
const Home = () => {
  //   const [users, setUsers] = useState([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>List of Users:</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
