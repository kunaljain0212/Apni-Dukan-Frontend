import React from "react";
import Base from "../core/Base";
import { isAuthenticated} from "../auth/helper";
import { JWT } from "../interfaces/userInterfaces";

function UserDashBoard() {
  const user = isAuthenticated() as JWT;
  return (
    <Base title="UserDashBoard">
      <h1>This is UserDashBoard</h1>
      <p> EMAIL: {user.email}</p>
      <p> Name : {user.name} </p>
    </Base>
  );
}

export default UserDashBoard;
