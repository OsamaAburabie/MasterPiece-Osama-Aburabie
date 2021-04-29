import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthContext from "../src/contexts/AuthContext";
import Connections from "./pages/Connections";
import Services from "./pages/Services";
import TaskerAds from "./pages/TaskerAds";
import SingleAd from "./pages/SingleAd";
import NotFound from "./pages/NotFound";
import TaskTrack from "./pages/Customer/TaskTrack";
import CircularProgress from "@material-ui/core/CircularProgress";
import Popup from "./components/Tasker/PendingPopup";
import ManageTasks from "./pages/Tasker/ManageTasks";
import SimpleBarReact from "simplebar-react";
import ScrollToTop from "./components/ScrollToTop";

function Routes() {
  const { isLoggedIn, role, pendingCon } = useContext(AuthContext);
  if (isLoggedIn === undefined) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="bg-primary">
      <BrowserRouter>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/myConnections" component={Connections} />
            <Route path="/services" exact component={Services} />
            <Route path="/services/:catId" exact component={TaskerAds} />
            <Route path="/services/:adId/:taskerId" component={SingleAd} />
            <Route path="/tasker/:taskerId" exact component={TaskTrack} />
            <Route path="/manageTasks" exact component={ManageTasks} />
            <Route path="/NotFound404" component={NotFound} />
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>

      {isLoggedIn && role === "tasker" && pendingCon.length > 0 && <Popup />}
    </div>
  );
}

export default Routes;
