
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './ui-pages/home';

import { PageProduct } from './ui-pages/products';
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
import { ProductDetail } from './ui-pages/products/productDetail';
import { useTypeProduct } from './store/type-product/use-type-product';
import  {WorkflowDetail} from './ui-pages/workflow';
const { Option } = Select;


function App() {
  const token = getUserInfo();
  const [userLoginData, setUserLoginData] = useRecoilState(userInfoState);
  const [listTypeProduct, requestListTypeProduct] = useTypeProduct();
  const [myProfile, requestMyProfile] = useProfile();
  const [isVerify, setIsVerify] = useState(false);

  useEffect(() => {
    requestMyProfile();
    requestListTypeProduct();
  }, [])
  // console.log(myProfile);
  useEffect(() => {
    if (userLoginData.token) {
      saveUserInfoToStore({
        token: userLoginData.token
      })
      requestMyProfile();
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
            <Navigate to="/user/signin"></Navigate>
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
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/admin/workflow" element={<WorkflowDetail></WorkflowDetail>}></Route>
        <Route path="/user/signin" element={<UserSignIn></UserSignIn>}></Route>
        <Route path="/user/signup" element={<UserSignUp></UserSignUp>}></Route>
        <Route path="/user/getpassword" element={<GetPassword></GetPassword>}></Route>
        {listTypeProduct.state === REQUEST_STATE.SUCCESS && listTypeProduct.data.map((type) => {
          return (
            <>
              <Route path={`/${type.nameSlug}`} element={<PageProduct></PageProduct>}></Route>
              <Route path={`/${type.nameSlug}/:productDetail`} element={<ProductDetail></ProductDetail>}></Route>
            </>
          )
        })}
      </Routes>

      <PrivateRouter path="/profile" element={<Profile></Profile>}></PrivateRouter>


    </>

  );
}

export default App;
