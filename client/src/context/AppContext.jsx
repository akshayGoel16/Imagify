import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// A CONTEXT OBJECT CALLED APPCONTEXT IS CREATED BELOW AND THIS CONTEXT WILL ACT AS A GLOBAL STORE THAT CAN HOLD SHARED DATA
export const AppContext = createContext();

const AppContextProvider = (props) => {
  // NOW MULTIPLE STATES WILL BE DEFINED HERE, BECAUSE THEY WILL BE USED IN MULTIPLE FILES

  // TO CHECK WHETHER THE USER IS LOGGED IN OR LOGGED OUT, THE FOLLOWING STATE VARIABLE IS CREATED AND INITIALISED WITH NULL I.E. LOGGED OUT
  const [user, setUser] = useState(null);

  // TO ENABLE/DISABLE THE LOGIN FORM ON SCREEN I.E. TO CONTROL THE VISIBILITY OF THE LOGIN FORM
  const [showLogin, setShowLogin] = useState(false);

  // TOKEN STATE VARIABLE TO STORE THE TOKEN IN LOCAL STORAGE
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [credit, setCredit] = useState(0);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/user/credits", {
        headers: { token },
      });

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendURL + "/api/image/generate-image",
        { prompt },
        { headers: { token } }
      );

      if (data.success) {
        loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditsData();
        if (data.creditBalance === 0) {
          navigate("/buy");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const LogOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  // BELOW IS THE COMBINED OBJECT THAT CONTAINS ALL THE STATES AND THEIR SETTER FUNCTIONS
  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendURL,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    LogOut,
    generateImage,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
  // Every component inside <AppContextProvider> will be able to access user, setUser, showLogin, and setShowLogin using the useContext hook.
};

export default AppContextProvider;
