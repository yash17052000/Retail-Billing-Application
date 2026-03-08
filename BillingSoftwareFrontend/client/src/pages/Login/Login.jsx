import React, { useContext, useState } from 'react'
import { LoginAccount } from '../../Service/Auth.Service';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-hot-toast"
import { AppContext } from '../../context/AppContext';

function Login() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const {setAuthData}=useContext(AppContext)
    const navigate = useNavigate();
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };


    const onSubmitHandler = (e) => {
        e.preventDefault(); // ✅ Make sure to receive `e` as a parameter
        setLoading(true);
        
        LoginAccount(data).subscribe({
            next: (res) => {
                console.log("res", res);

                if (res.status === 200) {
                    toast.success({ message: "Login successful" });
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("role", res.data.role);
                    setAuthData(res.data.token,res.data.role)
                    navigate("/dashboard");
                } else {
                    console.log("Login failed:", res.message);
                }
                setLoading(false);
            },
            error: (err) => {
                console.error("Error during login:", err);
                setLoading(false); // ✅ Always stop loading on error
            },
            complete: () => {
                console.log("Request completed");
            }
        });
    };
    return (
        <div className="bg-light d-flex align-items-center justify-content-center vh-100 login-background">
            <div className="card shadow-lg w-100" style={{ maxWidth: '480px' }}>
                <div className="card-body">
                    <div className="text-center">
                        <h1 className="card-title">Sign in</h1>
                        <p className="card-text text-muted">
                            Sign in below to access your account
                        </p>
                    </div>
                    <div className="mt-4">
                        {/* form inputs go here */}
                        <form>

                            <div className="mb-4">
                                <label htmlFor="email" className="form-label text-muted">
                                    Email address
                                </label>
                                <input type="text" name="email" id="email" placeholder="yourname@example.com" className='form-control' onChange={onChangeHandler} value={data.email} />

                            </div>
                        </form>
                    </div>
                    <div className="mt-4">
                        {/* form inputs go here */}
                        <form>

                            <div className="mb-4">
                                <label htmlFor="password" className="form-label text-muted">
                                    Password
                                </label>
                                <input type="password" name="password" id="password" placeholder="*********" className='form-control' onChange={onChangeHandler} value={data.password} />

                            </div>
                        </form>
                    </div>
                    <div className="d-grid">
                        <button type="sumbit" className="btn btn-dark btn-lg" onClick={onSubmitHandler}>
                            {loading?"Loading...":"Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
