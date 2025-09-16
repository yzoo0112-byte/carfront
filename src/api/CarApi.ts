import axios, { type AxiosRequestConfig } from "axios"
import type { Car } from "../type"

const BASE_URL = import.meta.env.VITE_API_URL;//.env 파일에 정의된 API 기본 URL을 가져옵

//Axios 요청에 사용할 설정 객체를 반환하는 함수
const getAxtiosConfig = (): AxiosRequestConfig => {
    const token = sessionStorage.getItem('jwt');//브라우저의 세션 스토리지에서 JWT 토큰을 가져옴
    return {
        headers: {
            'Authorization': token
        }
    };//가져온 토큰을 Authorization 헤더에 담아 반환 ==> 인증이 필요한 API 요청에 사용

}

//자동차 목록 조회
export const  getCars = async (): Promise<Car[]> => {//async(비동기) 함수라서 Car[]배열타입을 받겠다는 약속을 받음
   const response = await axios.get(`${BASE_URL}/cars`, getAxtiosConfig());//await:응답이 올때까지 기다림 axios.get("") 서버에 요청 보냄(GET요청)
   return response.data;//서어베서 받은 데이터만 꺼내서 반환
}


export const deleteCar = async(id: number): Promise<number> => {//삭제할 자동차의 id 
   const response = await axios.delete(`${BASE_URL}/cars/${id}`, getAxtiosConfig());
    return response.data;//삭제 결과(예: 삭제된 ID)를 반환
}

export const addCar = async (car: Car): Promise<Car> => {
    const response = await axios.post(`${BASE_URL}/cars`, car, getAxtiosConfig());
    return response.data;//- 서버에서 반환된 추가된 자동차 정보를 반환

}

export const updateCar = async (car: Car): Promise<Car> => {
    const response = await axios.put(`${BASE_URL}/cars`, car, getAxtiosConfig());
    return response.data;//서버에서 반환된 수정된 자동차 정보를 반환

}