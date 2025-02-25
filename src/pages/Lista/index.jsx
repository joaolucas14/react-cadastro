import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function ListarUsuarios() {
  const [allUsers, setAllUsers] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    async function loadUsers() {
      const token = localStorage.getItem("token");
      const {
        data: { users },
      } = await api.get("/listar-usuarios", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllUsers(users);
    }
    loadUsers();
  }, []);
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p8 border border-gray-300 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Listar Usuários
      </h2>
      <ul className="space-y-2">
        {allUsers &&
          allUsers.map((user) => (
            <li key={user.id} className="bg-gray-100 p-4 rounded-md">
              <p className="font-semibold">ID: {user.id}</p>
              <p className="font-semibold">Nome: {user.name}</p>
              <p className="font-semibold">E-mail: {user.email}</p>
            </li>
          ))}
      </ul>
      <button
        className="cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 mt-3"
        onClick={() => navigate("/")}
      >
        Voltar
      </button>{" "}
    </div>
  );
}
