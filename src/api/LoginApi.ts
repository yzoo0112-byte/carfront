import axios from "axios";
import type { User } from "../type";


const BASE_URL = import.meta.env.VITE_API_URL;//- .env 파일에 정의된 환경 변수 VITE_API_URL을 가져와서 API의 기본 URL로 설정


export const getAuthToken = async (user: User) => {//- user 객체를 받아 로그인 요청을 보내고 토큰을 받아오는 비동기 함수
    const response = await axios.post(`${BASE_URL}/login`, user);//axios.post(url: 요청을 보낼 API 주소, data: 서버에 전달할 데이터

    return response.headers.authorization;//- 응답 헤더에서 authorization 값을 꺼내 반환

}