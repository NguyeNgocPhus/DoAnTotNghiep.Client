
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './ui-pages/home';

import { PageAo } from './ui-pages/products/ao';
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
const {Option}  = Select;
function App() {
  const [userLoginData,setUserLoginData] = useRecoilState(userInfoState);
  const [myProfile,requestMyProfile]  = useProfile();
  const [isVerify, setIsVerify] = useState(false);
  useEffect(()=>{
    requestMyProfile();
  },[])
  // console.log(myProfile);
  useEffect(()=>{
    if(userLoginData.token){
      saveUserInfoToStore({
        token:userLoginData.token
      })
      requestMyProfile();
      setIsVerify(true);
    }
  },[userLoginData])
  
  useEffect(()=>{
    setIsVerify(true);
  },[myProfile])
  // console.log(userLoginData);
  const PrivateRouter = ({element,...rest})=>{
    return (
      <Routes>
        <Route {...rest} element={
          !isVerify ? (
            <Navigate to="/user/signin"></Navigate>
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
        <Route path="/" element={<HomePage></HomePage>}></Route>
        
        <Route path="/user/signin" element={<UserSignIn></UserSignIn>}></Route>
        <Route path="/user/signup" element={<UserSignUp></UserSignUp>}></Route>
        <Route path="/user/getpassword" element={<GetPassword></GetPassword>}></Route>
        
      </Routes>
      <PrivateRouter path="/ao" element={<PageAo></PageAo>}></PrivateRouter>
      <PrivateRouter path="/profile" element={<Profile></Profile>}></PrivateRouter>
  
      
    </>
    
  );
}

export default App;
