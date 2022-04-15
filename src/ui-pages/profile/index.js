import {useState} from "react";
import { Col, Row } from "antd";
import { useRecoilState } from "recoil";
import { saveUserInfoToStore } from "../../app-helper";
import { myProfileState } from "../../store/auth/share-state";
import { CommomLayout } from "../common/layout"
import { AccountProfile } from "./account";
import { InfoProfile } from "./info";
import "./styles.css";
import { HistoryProfile } from "./history";


export const Profile = () =>{

    const [myProfile,setMyprofile] = useRecoilState(myProfileState);
    const [type,setType] = useState({
        account:true,
        info:false,
        history:false,
    })
    const userLogout = () => {
        saveUserInfoToStore({});
        setTimeout(() => {
            window.location.href = window.location.origin;
        }, 100);
    };
    

    return (
        <CommomLayout>
           <Row gutter={[15,15]} className={'page-user'}>
               <Col span={4}>
                   <div className={`account slider ${type.account ? "blackk" :""} `} onClick={()=>{
                        setType({
                            account:true,
                            info:false,
                            history:false,
                        })    
                   }}>Tài khoản của tôi</div>
                   <div className={`info slider ${type.info ? "blackk" :"" } `} onClick={()=>{
                       setType({
                        account:false,
                        info:true,
                        history:false,
                    })
                   }}>Thông tin cá nhân</div>
                   <div className={`history slider ${type.history ? "blackk" :""} `} onClick={()=>{
                        setType({
                            account:false,
                            info:false,
                            history:true,
                        })
                   }}>Lịch sử đơn hàng</div>
                   <div className={`logout slider`} onClick={userLogout}>Đăng xuất</div>

               </Col>
               <Col span={20}>
                    {type.info && <InfoProfile></InfoProfile>}
                   {type.account && myProfile.data  && <AccountProfile myProfile={myProfile.data}></AccountProfile>}
                   {type.history  && <HistoryProfile></HistoryProfile>}
               </Col>
           </Row>
        </CommomLayout>
    )
}