import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserContext } from "../../App";

// // this private route is for only logged in users only who will have access to
// shipment page. the purpose of this page is to keep the checkout process limited
// to logged in users only. see more at react router redirect-auth article//

const PrivateRoute = ({ children, ...rest }) => {
  // using context api for login data//
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
