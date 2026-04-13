import { useState } from 'react';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const isDisabled = password === '' || confirmPassword === '' || password !== confirmPassword;
    return (
        <div className="App App-header space-around">
            <h1>Reset Password</h1>
            <p>Enter your new password below:</p>
            <input className='h-10 ' type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input className='h-10 ' type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <button disabled={isDisabled} onClick={() => {
                const params = new URLSearchParams(window.location.search);
                const token = params.get('token');
                fetch("http://127.0.0.1:8080/api/reset-password", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                }
                    ,body: JSON.stringify({password, token}),
                }
                )                .then(async (res) => {
                    const data = await res.json();
                    if (!res.ok) {
                        throw new Error(data.message || (data.errors && Object.values(data.errors)[0][0]) || "An error occurred. Please try again.");
                    }
                    return data;
                })
                .then((data) => {
                    alert("Password reset successful! Please log in with your new password.");
                    window.location.href = "/login";
                })
                .catch((err) => {
                    console.error(err);
                    alert(err.message);
                });
            }}>
                Reset Password
            </button>
        </div>
    );
}

export default ResetPassword;