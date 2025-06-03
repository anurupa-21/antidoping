// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Auth.css";

// const Auth = () => {
//   const [isSignIn, setIsSignIn] = useState(false); // Set to false to show sign-up by default
//   const [isChecked, setIsChecked] = useState(false); // State to track checkbox
//   const [role, setRole] = useState(""); // State to track user role
//   const [error, setError] = useState(""); // To handle errors
//   const [sportsCategory, setSportsCategory] = useState(""); // State to track selected sports category
//   const navigate = useNavigate(); // Use useNavigate for redirection in react-router-dom v6

//   useEffect(() => {
//     // Hide Navbar when this component is mounted
//     const navbar = document.querySelector(".navbar");
//     if (navbar) {
//       navbar.style.display = "none";
//     }

//     // Restore Navbar visibility when the component is unmounted
//     return () => {
//       if (navbar) {
//         navbar.style.display = "";
//       }
//     };
//   }, []);

//   const handleGoogleSignIn = async () => {
//     try {
//       // This is where you will connect to your Google OAuth provider
//       window.open("http://localhost:8080/api/auth/google", "_self"); // Backend should handle Google OAuth and send JWT to frontend
//     } catch (error) {
//       console.error("Google Sign-In failed:", error);
//       setError("Google Sign-In failed. Please try again.");
//     }
//   };

//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked); // Toggle checkbox state
//   };

//   const handleRoleChange = (event) => {
//     setRole(event.target.value); // Update role when selected
//   };

//   const handleSportsCategoryChange = (event) => {
//     setSportsCategory(event.target.value); // Update sports category when selected
//   };

//   const handleLoginSubmit = async (event) => {
//     event.preventDefault();
//     const username = event.target.username.value;
//     const password = event.target.password.value;

//     try {
//       const response = await axios.post("http://localhost:8080/api/auth/login", {
//         username,
//         password,
//       });

//       if (response.data) {
//         const { token, role } = response.data;
//         localStorage.setItem("authToken", token); // Store JWT token
//         if (role === "player") {
//           navigate("/player-dashboard"); // Redirect to player dashboard
//         } else if (role === "admin") {
//           navigate("/admin-dashboard"); // Redirect to admin dashboard
//         }
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       setError("Invalid credentials, please try again.");
//     }
//   };

//   const handleSignUpSubmit = async (event) => {
//     event.preventDefault();
//     const username = event.target.username.value;
//     const password = event.target.password.value;
//     const profileImage = event.target.profileImage.files[0];
//     const dateJoined = event.target.dateJoined.value;

//     try {
//       const formData = new FormData();
//       formData.append("username", username);
//       formData.append("password", password);
//       formData.append("role", role);
//       formData.append("sportsCategory", sportsCategory);
//       formData.append("profileImage", profileImage);
//       formData.append("dateJoined", dateJoined);

//       const response = await axios.post("http://localhost:8080/api/auth/register", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.data) {
//         const { token, role } = response.data;
//         localStorage.setItem("authToken", token); // Store JWT token
//         if (role === "player") {
//           navigate("/player-dashboard"); // Redirect to player dashboard
//         } else if (role === "admin") {
//           navigate("/admin-dashboard"); // Redirect to admin dashboard
//         }
//       }
//     } catch (error) {
//       console.error("Sign-up failed:", error);
//       setError("Error during sign-up, please try again.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <img src="/logo.jpg" alt="Logo" className="auth-logo" />
//         <p className="auth-tagline">Join Our Community of athletes and experts!</p>
//         {isSignIn ? (
//           <>
//             <h1 className="auth-tagline">Welcome Back! Login to Continue</h1>
//             <form className="auth-form" onSubmit={handleLoginSubmit}>
//               <input
//                 type="text"
//                 placeholder="Username or Email"
//                 required
//                 className="auth-input"
//                 name="username"
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 required
//                 className="auth-input"
//                 name="password"
//               />
//               {error && <p className="auth-error">{error}</p>}
//               <p className="auth-forgot-password">
//                 Forgot password? <Link to="/reset">Reset here</Link>
//               </p>
//               <button type="submit" className="auth-submit">
//                 Log In
//               </button>
//               <button
//                 type="button"
//                 onClick={handleGoogleSignIn}
//                 className="auth-google"
//               >
//                 <img className="auth-google-img" src="google.png" alt="google" />
//                 Login with Google
//               </button>
//               <p className="auth-toggle">
//                 Don't have an account?{" "}
//                 <span onClick={() => setIsSignIn(false)}>Sign Up</span>
//               </p>
//             </form>
//           </>
//         ) : (
//           <>
//             <h1 className="auth-tagline">Create an Account</h1>
//             <form className="auth-form" onSubmit={handleSignUpSubmit}>
//               <input
//                 type="text"
//                 placeholder="Username"
//                 required
//                 className="auth-input"
//                 name="username"
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 required
//                 className="auth-input"
//                 name="password"
//               />
//               <select
//                 value={role}
//                 onChange={handleRoleChange}
//                 className="auth-input"
//                 required
//               >
//                 <option value="" disabled>
//                   Select Role
//                 </option>
//                 <option value="user">Player</option>
//                 <option value="admin">Admin</option>
//               </select>
//               <select
//                 name="sportsCategory"
//                 className="auth-input"
//                 value={sportsCategory}
//                 onChange={handleSportsCategoryChange}
//                 required
//               >
//                 <option value="" disabled>
//                   Select Sports Category
//                 </option>
//                 <option value="cricket">Cricket</option>
//                 <option value="football">Football/Soccer</option>
//                 <option value="athletes">Athletes</option>
//                 <option value="cycling">Cycling</option>
//                 <option value="boxing">Boxing</option>
//                 <option value="weightlifting">Weightlifting</option>
//                 <option value="wrestling">Wrestling</option>
//               </select>
//               <input
//                 type="file"
//                 className="auth-input"
//                 placeholder="Upload Profile Image"
//                 name="profileImage"
//               />
//               <input
//                 type="date"
//                 placeholder="Date Joined"
//                 required
//                 className="auth-input"
//                 name="dateJoined"
//               />
//               <div className="auth-checkbox">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   checked={isChecked}
//                   onChange={handleCheckboxChange}
//                   required
//                 />
//                 <label htmlFor="terms">
//                   <p className="agree">By signing up, you agree to our</p> {" "}
//                   <Link to="/terms" className="terms">Terms of Service</Link> <p className="agree">and</p>{" "}
//                   <Link to="/privacy" className="privacy">Privacy Policy</Link>.
//                 </label>
//               </div>
//               <button
//                 type="submit"
//                 className="auth-submit"
//                 disabled={!isChecked} // Disable submit if checkbox is not checked
//               >
//                 Sign Up
//               </button>
//               <button
//                 type="button"
//                 onClick={handleGoogleSignIn}
//                 className="auth-google"
//               >
//                 <img className="auth-google-img" src="google.png" alt="google" />
//                 Sign in with Google
//               </button>
//               <p className="auth-toggle">
//                 Already have an account?{" "}
//                 <span onClick={() => setIsSignIn(true)}>Log In</span>
//               </p>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Auth;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [sportsCategory, setSportsCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Configure axios defaults
  useEffect(() => {
    // Set default axios configuration
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    
    // Hide Navbar when this component is mounted
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      navbar.style.display = "none";
    }

    // Restore Navbar visibility when the component is unmounted
    return () => {
      if (navbar) {
        navbar.style.display = "";
      }
    };
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      // Open Google OAuth in same window
      window.location.href = "http://localhost:8080/api/auth/google";
    } catch (error) {
      console.error("Google Sign-In failed:", error);
      setError("Google Sign-In failed. Please try again.");
      setLoading(false);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSportsCategoryChange = (event) => {
    setSportsCategory(event.target.value);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    
    const username = event.target.username.value.trim();
    const password = event.target.password.value;

    if (!username || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/login", {
        username: username,
        password: password,
      });

      if (response.status === 200 && response.data) {
        const { token, role, user } = response.data;
        
        // Store authentication data
        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", role);
        localStorage.setItem("userId", user?.id || '');
        
        // Set authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Navigate based on role
        if (role === "player" || role === "user") {
          navigate("/player-dashboard");
        } else if (role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard"); // fallback
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.message || error.response.data?.error || "Login failed";
        
        switch (status) {
          case 401:
            setError("Invalid username or password.");
            break;
          case 403:
            setError("Account is disabled or not verified.");
            break;
          case 404:
            setError("User not found.");
            break;
          case 500:
            setError("Server error. Please try again later.");
            break;
          default:
            setError(message);
        }
      } else if (error.request) {
        setError("Unable to connect to server. Please check your connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    
    const username = event.target.username.value.trim();
    const password = event.target.password.value;
    const profileImage = event.target.profileImage.files[0];
    const dateJoined = event.target.dateJoined.value;

    // Validation
    if (!username || !password || !role || !sportsCategory || !dateJoined) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("sportsCategory", sportsCategory);
      formData.append("dateJoined", dateJoined);
      
      if (profileImage) {
        // Validate file type and size
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(profileImage.type)) {
          setError("Please upload a valid image file (JPEG, PNG, or GIF).");
          setLoading(false);
          return;
        }
        
        if (profileImage.size > 5 * 1024 * 1024) { // 5MB limit
          setError("Image file size must be less than 5MB.");
          setLoading(false);
          return;
        }
        
        formData.append("profileImage", profileImage);
      }

      const response = await axios.post("/api/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201 || response.status === 200) {
        const { token, role, user, message } = response.data;
        
        if (token) {
          // Store authentication data
          localStorage.setItem("authToken", token);
          localStorage.setItem("userRole", role);
          localStorage.setItem("userId", user?.id || '');
          
          // Set authorization header for future requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Navigate based on role
          if (role === "player" || role === "user") {
            navigate("/player-dashboard");
          } else if (role === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/dashboard");
          }
        } else {
          // Registration successful but no immediate login
          setError(message || "Registration successful! Please login.");
          setIsSignIn(true); // Switch to login form
        }
      }
    } catch (error) {
      console.error("Sign-up failed:", error);
      
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || error.response.data?.error || "Registration failed";
        
        switch (status) {
          case 400:
            setError(message || "Invalid registration data.");
            break;
          case 409:
            setError("Username already exists. Please choose another.");
            break;
          case 422:
            setError("Please check your input data.");
            break;
          case 500:
            setError("Server error. Please try again later.");
            break;
          default:
            setError(message);
        }
      } else if (error.request) {
        setError("Unable to connect to server. Please check your connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="/logo.jpg" alt="Logo" className="auth-logo" />
        <p className="auth-tagline">Join Our Community of athletes and experts!</p>
        {isSignIn ? (
          <>
            <h1 className="auth-tagline">Welcome Back! Login to Continue</h1>
            <form className="auth-form" onSubmit={handleLoginSubmit}>
              <input
                type="text"
                placeholder="Username or Email"
                required
                className="auth-input"
                name="username"
                disabled={loading}
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="auth-input"
                name="password"
                disabled={loading}
              />
              {error && <p className="auth-error">{error}</p>}
              <p className="auth-forgot-password">
                Forgot password? <Link to="/reset">Reset here</Link>
              </p>
              <button 
                type="submit" 
                className="auth-submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="auth-google"
                disabled={loading}
              >
                <img className="auth-google-img" src="google.png" alt="google" />
                {loading ? "Please wait..." : "Login with Google"}
              </button>
              <p className="auth-toggle">
                Don't have an account?{" "}
                <span onClick={() => !loading && setIsSignIn(false)}>Sign Up</span>
              </p>
            </form>
          </>
        ) : (
          <>
            <h1 className="auth-tagline">Create an Account</h1>
            <form className="auth-form" onSubmit={handleSignUpSubmit}>
              <input
                type="text"
                placeholder="Username"
                required
                className="auth-input"
                name="username"
                disabled={loading}
              />
              <input
                type="password"
                placeholder="Password (min 6 characters)"
                required
                className="auth-input"
                name="password"
                disabled={loading}
              />
              <select
                value={role}
                onChange={handleRoleChange}
                className="auth-input"
                required
                disabled={loading}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="player">Player</option>
                <option value="admin">Admin</option>
              </select>
              <select
                name="sportsCategory"
                className="auth-input"
                value={sportsCategory}
                onChange={handleSportsCategoryChange}
                required
                disabled={loading}
              >
                <option value="" disabled>
                  Select Sports Category
                </option>
                <option value="cricket">Cricket</option>
                <option value="football">Football/Soccer</option>
                <option value="athletics">Athletics</option>
                <option value="cycling">Cycling</option>
                <option value="boxing">Boxing</option>
                <option value="weightlifting">Weightlifting</option>
                <option value="wrestling">Wrestling</option>
              </select>
              <input
                type="file"
                className="auth-input"
                placeholder="Upload Profile Image"
                name="profileImage"
                accept="image/*"
                disabled={loading}
              />
              <input
                type="date"
                placeholder="Date Joined"
                required
                className="auth-input"
                name="dateJoined"
                disabled={loading}
              />
              <div className="auth-checkbox">
                <input
                  type="checkbox"
                  id="terms"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  required
                  disabled={loading}
                />
                <label htmlFor="terms">
                  <p className="agree">By signing up, you agree to our</p> {" "}
                  <Link to="/terms" className="terms">Terms of Service</Link> <p className="agree">and</p>{" "}
                  <Link to="/privacy" className="privacy">Privacy Policy</Link>.
                </label>
              </div>
              <button
                type="submit"
                className="auth-submit"
                disabled={!isChecked || loading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="auth-google"
                disabled={loading}
              >
                <img className="auth-google-img" src="google.png" alt="google" />
                {loading ? "Please wait..." : "Sign in with Google"}
              </button>
              <p className="auth-toggle">
                Already have an account?{" "}
                <span onClick={() => !loading && setIsSignIn(true)}>Log In</span>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;