import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [change, setOnChange] = useState(false);
    
// login
const login = (email, password) => {
   
    fetch("https://glacial-shelf-52388.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((response) => {
        //  console.log(email);
        // console.log(response);
        setOnChange(!change);
        if (response.message) {
          // console.log(response.error)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.message,
          });
        } else if (response.user) {
          setUser(response);
          sessionStorage.setItem("jwtToken", response.jwt);
          sessionStorage.setItem("user", JSON.stringify(response.user));

          Swal.fire({
            position: "center",
            icon: "success",
            title: "LoggedIn successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        } else {
          console.log("Not logged in, something went wrong");
        }
      });
  };

    // Register
    const register = (name, email, phone, password) => {
      fetch('https://glacial-shelf-52388.herokuapp.com/admins', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, phone, password })
      })
      .then(res => res.json())
      .then((response) => {
          setOnChange(!change);
          if (response.error) {
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: response.error,
                  timer: 1500,
              });
          } else {
              sessionStorage.setItem('isRegistered', true);
              Swal.fire({
                  icon: 'success',
                  title: 'Registration Successful',
                  text: 'Please login to continue',
                  timer: 1500,
              });
              navigate('/login');
          }
      });
  };

    const useAuth = () => {
   
        const jwt = sessionStorage.getItem('jwtToken');
        if(!jwt){
            return false;
        }
        return true;

    }

    const contextData = {
        user,
        login,
        register,
        // logout,
        useAuth,
    }

    return (
        <>
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
        </>
    )
}

