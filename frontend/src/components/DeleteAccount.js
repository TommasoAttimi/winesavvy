// frontend/src/components/DeleteAccount.js
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DeleteAccount = () => {
  const { deleteUser } = useContext(AuthContext);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      await deleteUser();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white p-2 rounded"
      >
        Delete Account
      </button>
    </div>
  );
};

export default DeleteAccount;
