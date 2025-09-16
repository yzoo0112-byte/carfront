import { Button, Snackbar, Stack, TextField } from "@mui/material";
import { useState } from "react";
import type { User } from "../type";
import { getAuthToken } from "../api/LoginApi";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";



export default function  Login(){

    const navigate = useNavigate();//페이지 이동 기능(react-router-dom의 useNavigate 훅을 사용)
    const {login} = useAuthStore();//useAuthStore(사용자 인증 상태를 관리하는 커스텀 훅 )에서 login 함수를 가져옵
    const [toastOpen, setToastOpen] = useState(false);//Snackbar(로그인 실패시 보여줌)의 열림 여부를 상태로 관리
    const [user, setUser] = useState<User>({//사용자 입력값(아이디와 비밀번호)을 저장하는 상태
        username: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value});
    }//입력 필드의 값이 변경될 때마다 user 상태를 업데이트


    const handleLogin = () => {
        getAuthToken(user)//getAuthToken 함수로 사용자 정보를 전달해 토큰을 요청

        .then((token) => {
            sessionStorage.setItem("jwt", token);//- 토큰을 받아오면 sessionStorage에 저장

            login();//인증 상태를 업데이트
            navigate("/");//- 로그인 성공 시 홈 페이지로 이동

        })
        .catch((err) => {
            console.log(err);
            setToastOpen(true);
        });//- 로그인 실패 시 콘솔에 에러를 출력하고 알림창을 띄움

    }


    return(
        <>
        <Stack spacing={2} mt={2} alignItems={"center"}>
            <TextField 
                label="ID"
                name="username"
                onChange={handleChange}
            />
            <TextField 
                label="PW"
                name="password"
                onChange={handleChange}
            />
            <Button
                color="primary"
                onClick={handleLogin}
            >
                로그인
            </Button>
            <Snackbar 
                open={toastOpen}
                autoHideDuration={3000}
                onClose={() => setToastOpen(false)}
                message="로그인 실패"
            />
        </Stack>
        </>
    );
}