
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './ui-pages/home';

import { UserSignIn } from './ui-pages/auth/signIn';
import { UserSignUp } from './ui-pages/auth/signUp';
import { GetPassword } from './ui-pages/auth/getPassword';
import { useRecoilState } from 'recoil';
import { userInfoState } from './store/auth/share-state';
import { useEffect, useState } from 'react';
import { getUserInfo, saveUserInfoToStore } from './app-helper';
import { Profile } from './ui-pages/profile';
import { useProfile } from './store/auth/use-my-profile';
import { Select } from 'antd';
import { REQUEST_STATE } from './app-config/constants';
import { WorkflowDetail } from './ui-pages/admin/workflow/workflow-definition/detail';
import { Workflow } from './ui-pages/admin/workflow';
import { CreateWorkflow } from './ui-pages/admin/workflow/workflow-definition/create';
import { Document } from './ui-pages/admin/document';
import { Identity } from './ui-pages/admin/identity';
const { Option } = Select;


function App() {
  const token = getUserInfo();
  const [userLoginData, setUserLoginData] = useRecoilState(userInfoState);
  const [myProfile, requestMyProfile] = useProfile();
  const [isVerify, setIsVerify] = useState(false);

  useEffect(() => {
    // requestMyProfile();
    // requestListTypeProduct();
  }, [])
 
  useEffect(() => {
    if (userLoginData.data) {
      saveUserInfoToStore(userLoginData.data)
      setIsVerify(true);
    }
  }, [userLoginData])

  useEffect(() => {

    if (myProfile.state === REQUEST_STATE.SUCCESS) {
      setIsVerify(true);
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
  const convertPath = (name) => {
    const path = name.replace(" ", "-");
    return path;
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
      <PrivateRouter path="/admin/" element={<HomePage></HomePage>}></PrivateRouter>
      <PrivateRouter path="/" element={<HomePage></HomePage>}></PrivateRouter>
      <PrivateRouter path="/admin/workflows" element={<Workflow></Workflow>}></PrivateRouter>
      {/* <PrivateRouter path="/admin/workflow/create" element={<CreateWorkflow></CreateWorkflow>}></PrivateRouter> */}
      <PrivateRouter path="/admin/workflow-definition/:id" element={<WorkflowDetail></WorkflowDetail>}></PrivateRouter>
      <PrivateRouter path="/admin/identity" element={<Identity></Identity>}></PrivateRouter>
      <PrivateRouter path="/admin/documents" element={<Document></Document>}></PrivateRouter>
      <PrivateRouter path="/profile" element={<Profile></Profile>}></PrivateRouter>


    </>

  );
}

export default App;
