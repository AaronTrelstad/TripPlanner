import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Header from './components/header/header'
import LandingPage from './components/landing/landing'
import UserProfile from './components/profile/userProfile'
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Reset from "./components/auth/reset";
import Discussions from "./components/discussion/discussion";
import Messages from "./components/messages/messages";
import Trending from "./components/trending/trending";
import SearchPage from "./components/searchPage/searchPage";
import Company from "./components/company/company";
import Footer from "./components/footer/footer";
import './index.css';

const router = createBrowserRouter([{
  path:"/",
  element: (
    <>
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  ),
  children: [
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/profile',
      element: <UserProfile />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/reset',
      element: <Reset />
    },
    {
      path: '/discussions',
      element: <Discussions />
    },
    {
      path: '/messages',
      element: <Messages />
    },
    {
      path: '/trending',
      element: <Trending />
    },
    {
      path: '/search',
      element: <SearchPage />
    },
    {
      path: '/company',
      element: <Company />
    }
  ]
}]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
