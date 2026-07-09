import axios from "axios";

function more_vert() {
  return (
        <>
            <button className="p-2 hover:text-primary">
                <span className="material-symbols-outlined">visibility</span>
            </button>
            <button className="p-2 hover:text-primary">
                <span className="material-symbols-outlined">edit</span>
            </button>
            <button className="p-2 hover:text-red-500">
                <span className="material-symbols-outlined">lock</span>
            </button>
    </>
    );
}

async function check_circle(userId: string) {
    await axios.post(`http://localhost:1337/admin/users/${userId}/approve`);
}

async function deleteUser(userId: string) {
    await axios.delete(`http://localhost:1337/admin/users/${userId}`);
    console.log(`User with ID ${userId} has been deleted.`);
}

export default function UsersAction({userId}: {userId: string}) {
  return (
    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 hover:text-green-500" onClick={() => check_circle(userId)}>
            <span className="material-symbols-outlined">check_circle</span>
        </button>
        <button className="p-2 hover:text-red-500" onClick={() => deleteUser(userId)}>
            <span className="material-symbols-outlined">delete</span>
        </button>
        <button className="p-2 hover:text-primary" onClick={more_vert}>
            <span className="material-symbols-outlined">more_vert</span>
        </button>
    </div>
  );
}