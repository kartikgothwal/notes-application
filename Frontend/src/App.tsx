import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/providers";
import ProtectedRoute from "@/utils/ProtectedRoute";
import Loader from "./utils/Loader";
import "./App.css";
import { useAuth } from "./components/context/AuthContext";
import Notes from "./components/notes/Notes";
import { PostRequestHandler } from "./axios/PostRequestHandler";

const About = lazy(() => import("@/pages/About"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const Login = lazy(() => import("@/pages/Login"));
const Profile = lazy(() => import("@/pages/Profile"));

const App = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    verifyToken();
    async function verifyToken() {
      const token = localStorage.getItem("token");
      console.log("🚀 ~ verifyToken ~ token:", token, location?.pathname);
      if (token) {
        if (location?.pathname == "/") {
          console.log("🚀 ~ verifyToken ~ location:", location);
          navigate("/dashboard");
        }
        console.log("🚀 ~ verifyToken ~ token: ____inside", token);
        try {
          const response = await PostRequestHandler(
            "api/auth/verify",
            {},
            token
          );
          if (response.status === 200) {
            navigate(location?.pathname);
            setIsAuthenticated(true);
          } else {
            throw new Error("Invalid Token");
          }
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setIsAuthenticated(false);
          navigate("/login");
        }
      } else {
        setIsAuthenticated(false);
        navigate("/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Providers>
      <Navbar />
      <div className="flex flex-col w-full min-h-screen">
        <div className="flex-1 max-w-screen-2xl pt-[70px] mx-auto w-full">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/dashboard" element={<Notes />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </Providers>
  );
};

export default App;
