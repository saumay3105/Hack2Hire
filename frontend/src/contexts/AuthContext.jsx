// import { createContext, useState, useEffect } from "react";

// // Create a context for authentication
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Store user data
//   const [loading, setLoading] = useState(true); // Loading state to check session

//   // Function to check if the user is logged in (calling the backend)
//   const checkLoginStatus = async () => {
//     try {
//       const token = localStorage.getItem("access");
//       const response = await fetch("http://127.0.0.1:8000/api/auth/user/", {
//         method: "GET",
//         credentials: "include", // Send cookies

//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setUser(data); // Store user data
//       } else {
//         setUser(null); // Not logged in
//       }
//     } catch (error) {
//       console.error("Error checking login status", error);
//       setUser(null); // Not logged in
//     } finally {
//       setLoading(false); // End loading state
//     }
//   };

//   // Run checkLoginStatus when the component mounts
//   //   useEffect(() => {
//   //     checkLoginStatus();
//   //   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };