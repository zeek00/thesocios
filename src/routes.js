import Landing from "./pages/Landing";
import Login from "./pages/Login/Login";
import SignUpdate from "./pages/Signup/Signup";
import Dashboard from "./pages/Account/Dashboard/Dashboard";
import EscortDetails from "./pages/Account/Escort/EscortDetails";

export const routes = [
    {
        path: "/",
        exact: true,
        component: Landing,
        guarded: false,
    },
    {
        path: "/login",
        component: Login,
        guarded: false,
    },
    {
        path: "/sign-up",
        component: SignUpdate,
        guarded: false,
    },
    {
        path: "/dashboard",
        component: Dashboard,
        guarded: true,
    },

    {
        path: "/view-escorts/:id",
        component: EscortDetails,
        guarded: true,
    }
];
