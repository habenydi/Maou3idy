import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const navigate = useNavigate();
  return (
    <div className="App App-header space-around">
        <input className=' h-10 ' type="email" placeholder="Email"  />
      <button onClick={() => {
          fetch("http://127.0.0.1:8080/api/forgot-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify({ email: document.querySelector('input[type="email"]').value }),
          })
            .then(async (res) => {
              const data = await res.json();
              if (!res.ok) {
                throw new Error(data.message || (data.errors && Object.values(data.errors)[0][0]) || "An error occurred. Please try again.");
              }
              return data;
            })
            .then((data) => {
              console.log("Verification code:", data.verification_code); // Log the verification code for testing
              sessionStorage.setItem('verification_code', data.verification_code); // Store the code in session storage
              window.location.href = "/verification-email"; // Pass the code to the verification email page
            })
            .catch((err) => {
              console.error(err);
              alert(err.message);
            });
      }}>Reset Password</button>
    </div>
  );
}

export default ForgotPassword;