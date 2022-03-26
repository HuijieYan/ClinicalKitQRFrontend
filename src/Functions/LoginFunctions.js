import {
  getExpireTime,
  getHospitalId,
  getPassword,
  getUserName,
  setExpireTime,
  setHospitalID,
  setLevel,
  setName,
  setPassword,
  setTrustID,
  setUserName,
} from "./UserStatus";
import GetData from "./GetData";

/**
 * @memberof module:Functions
 * @class Login Controller provide api for check user status and log out
 */
export function checkLogIn() {
  const hospitalId = getHospitalId();
  const username = getUserName();
  const password = getPassword();

  if (GetData.login(hospitalId, username, password).length === 0) {
    return false;
  } else if(new Date().valueOf() > getExpireTime()){
    logout();
    return false;
  }
  return true;
}

export function logout() {
  setPassword("");
  setHospitalID(-1);
  setUserName("");
  setTrustID(-1);
  setName("");
  setLevel(-1);
  setExpireTime(-1);
}