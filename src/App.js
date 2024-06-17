
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './ui-pages/home';

import { UserSignIn } from './ui-pages/auth/signIn';
import { UserSignUp } from './ui-pages/auth/signUp';
import { GetPassword } from './ui-pages/auth/getPassword';
import { useRecoilState } from 'recoil';
import { userInfoState } from './store/auth/share-state';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getToken, getUser, saveTokenToStore, saveUserToStore } from './app-helper';
import { Profile } from './ui-pages/profile';
import { useProfile } from './store/auth/use-my-profile';
import { Select } from 'antd';
import { REQUEST_STATE } from './app-config/constants';
import { WorkflowDetail } from './ui-pages/admin/workflow/workflow-definition/detail';
import { Workflow } from './ui-pages/admin/workflow';
import { CreateWorkflow } from './ui-pages/admin/workflow/workflow-definition/create';
import { Document } from './ui-pages/admin/document';
import { Identity } from './ui-pages/admin/identity';
import { ListDocument } from './ui-pages/admin/document/list';
import { ListApprove } from './ui-pages/admin/document/approve';
import { History } from './ui-pages/admin/document/list/history';
import { ListWorkflowDefinition } from './ui-pages/admin/workflow/workflow-definition';
import { ListUsers } from './ui-pages/admin/identity/user';
import { ListRole } from './ui-pages/admin/identity/role';
import { DashBoard } from './ui-pages/admin/dashboard';
import { useCountUnreadNotification } from './store/notification/use-get-count-unread-noti';
import { getCoutUnreadNotificationState } from './store/notification/share-state';
import useWebSocket, { ReadyState } from "react-use-websocket"
import AuthService from './helpers/oidcHepler';

const { Option } = Select;


function App() {
  const token = getToken();
  const [userLoginData, setUserLoginData] = useRecoilState(userInfoState);
  const [myProfile, requestMyProfile] = useProfile();
  const [isVerify, setIsVerify] = useState(false);
  const [countUnreadNotificationData, setCountUnreadNotificationData] = useRecoilState(getCoutUnreadNotificationState);

  useEffect(() => {
    AuthService.init({
      stsAuthority: "https://localhost:5001",
      clientId: "mvc",
      clientRoot: "http://localhost:3000/",
      clientLogoutURL: "http://localhost:3000/login",
      clientScope: "openid profile"
    });

    AuthService.eventAddUserLoaded()
    let userInfo = getToken();
    if (userInfo !== null)
      requestMyProfile();
  }, [])
  const connection = useRef(null)

  useEffect(() => {

  }, [])

  useEffect(() => {
    if (userLoginData.data) {
      saveTokenToStore(userLoginData.data)
      setIsVerify(true);
    }
  }, [userLoginData])

  useEffect(() => {

    if (myProfile.state === REQUEST_STATE.SUCCESS) {
      setIsVerify(true);
      saveUserToStore(myProfile.data)

    }

  }, [myProfile])
  const PrivateRouter = ({ element, ...rest }) => {
    return (
      <Routes>
        <Route {...rest} element={
          !token ? (
            <Navigate to="/login"></Navigate>
          ) : (
            element
          )
        }></Route>
      </Routes>
    )
  }

  return (
    <>
      <Routes>

        <Route path="/login" element={<UserSignIn></UserSignIn>}></Route>
        {/* <Route path="/logout" element={<UserSignUp></UserSignUp>}></Route>
        <Route path="/user/getpassword" element={<GetPassword></GetPassword>}></Route> */}
        {/* {listTypeProduct.state === REQUEST_STATE.SUCCESS && listTypeProduct.data.map((type) => {
          return (
            <>
              <Route path={`/${type.nameSlug}`} element={<PageProduct></PageProduct>}></Route>
              <Route path={`/${type.nameSlug}/:productDetail`} element={<ProductDetail></ProductDetail>}></Route>
            </>
          )
        })} */}
      </Routes>
      <PrivateRouter path="/admin/dashboard" element={<DashBoard></DashBoard>}></PrivateRouter>
      <PrivateRouter path="/" element={<HomePage></HomePage>}></PrivateRouter>
      <PrivateRouter path="/admin/workflows" element={<ListWorkflowDefinition></ListWorkflowDefinition>}></PrivateRouter>
      {/* <PrivateRouter path="/admin/workflow/create" element={<CreateWorkflow></CreateWorkflow>}></PrivateRouter> */}
      <PrivateRouter path="/admin/workflow-definition/:id" element={<WorkflowDetail></WorkflowDetail>}></PrivateRouter>
      <PrivateRouter path="/admin/users" element={<ListUsers></ListUsers>}></PrivateRouter>
      <PrivateRouter path="/admin/roles" element={<ListRole></ListRole>}></PrivateRouter>
      <PrivateRouter path="/admin/documents" element={<ListDocument></ListDocument>}></PrivateRouter>
      <PrivateRouter path="/admin/history/:id" element={<History></History>}></PrivateRouter>
      <PrivateRouter path="/admin/approve" element={<ListApprove></ListApprove>}></PrivateRouter>
      <PrivateRouter path="/profile" element={<Profile></Profile>}></PrivateRouter>


    </>

  );
}

export default App;
