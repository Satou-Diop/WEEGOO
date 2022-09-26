import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
    technicien: JSON.parse(localStorage.getItem("technicien")) || null, 
    loading: false,
    error: null,
  };
const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          technicien: null,
          loading: true,
          error: null,
        };
      case "LOGIN_SUCCESS":
        return {
          technicien: action.payload,
          loading: false,
          error: null,
        };

        case "LOGIN_UPDATE":
          return {
            technicien: action.payload,
            loading: false,
            error: null,
          };
          
      case "LOGIN_FAILURE":
        return {
          technicien: null,
          loading: false,
          error: action.payload,
        };
      case "LOGOUT":
    
        return {
          technicien: null,
          loading: false,
          error: null,
        };
      default:
        return state;
    }
  };
  

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
      localStorage.setItem("technicien", JSON.stringify(state.technicien));
    }, [state.technicien]);
  

    return (
        <AuthContext.Provider value={{
            technicien: state.technicien,
            loading: state.loading,
            error: state.error,
            dispatch,
          }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
