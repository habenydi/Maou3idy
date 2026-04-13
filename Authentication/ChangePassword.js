import React, { useState } from 'react';

export default function ChangePassword() {
    const [current_password, setCurrent_password] = useState('');
    const [new_password, setNew_password] = useState('');
    const [confirm_new_password, setConfirm_new_password] = useState('');
    const isDisabled = current_password === '' || new_password === '' || confirm_new_password === '' || new_password !== confirm_new_password;
    return (
    <div className="App App-header space-around">
      <h1>Change Password</h1>
      <input className='h-10 ' type="password" placeholder="Current Password" value={current_password} onChange={(e) => setCurrent_password(e.target.value)} />
      <input className='h-10 ' type="password" placeholder="New Password" value={new_password} onChange={(e) => setNew_password(e.target.value)} />
      <input className='h-10 ' type="password" placeholder="Confirm New Password" value={confirm_new_password} onChange={(e) => setConfirm_new_password(e.target.value)} />
      <button disabled={isDisabled} onClick={() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
          alert("You must be logged in to change your password.");
          window.location.href = "/login";
          return;
        }
        fetch("http://127.0.0.1:8080/api/user/change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify({ current_password: current_password, new_password: new_password }),
        })
        .then(async (res) => {
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || (data.errors && Object.values(data.errors)[0][0]) || "An error occurred. Please try again.");
            }
            return data;
        })
        .then((data) => {
            alert("Password changed successfully! Please log in with your new password.");
            localStorage.removeItem('access_token');
            window.location.href = "/login";
        })
        .catch((err) => {
            console.error(err);
            alert(err.message);
        });
      }}>
        Change Password
      </button>
      <button onClick={() => {
        window.location.href = "/success";
      }}>
        Cancel
      </button>
      <button onClick={() => {
        window.location.href = "/forgot-password";
      }}>
        Forgot Password
      </button>
    </div>
  );
}