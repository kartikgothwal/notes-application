import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/providers";

import "./App.css";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const Login = lazy(() => import("@/pages/Login"));

const App = () => {
  return (
    <Providers>
      <Navbar />
      <div className="flex flex-col w-full min-h-screen">
        <div className="flex-1 max-w-screen-2xl pt-[70px] mx-auto w-full">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </Providers>
  );
};

export default App;
