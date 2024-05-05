import { jwtDecode } from "jwt-decode";
import { getUser , getUserInfo} from ".";

const hasRole = (role) => {
    const userInfo = getUser();
    const roles = userInfo.roles;

    let userRoles = [];
    if (Array.isArray(roles)) {
        userRoles = userRoles.concat(roles);
    } else {
        userRoles.push(roles);
    }
    if (userRoles.some(x => x == role))
        return true;
    return false;
}
const userId = () => {
    const userInfo = getUserInfo();
    const accessToken = userInfo.accessToken;
    const decoded = jwtDecode(accessToken);
    return decoded.Id;
}


export {
    userId,
    hasRole
}
