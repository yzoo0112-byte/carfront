import type React from "react";
import type { Car } from "../type";
import { Stack, TextField } from "@mui/material";


type CarDialogContentsProps = {
    car: Car;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
/*
CarDialogContentsProps가 받을 props의 타입 정의
Car 타입(브랜드, 모델, 색상 등)의 car 한개랑
handleChange 함수 한개
==> React.ChangeEvent<HTMLInputElement>타입의 e는 아무것도 반환하지 않음
==>실제 동작은 AddCar의 const handleChange가 할거임
==>handleChange가 실행되서 이벤트 객체가 AddCar의 const handleChange에 전달됨(AddCar가 CarDialogContents를 자식 컴포넌트로 가져서 가능)
*/

export default function CarDialogContents({car, handleChange}: CarDialogContentsProps) {//{car, handleChange}로 구조분해해서 사용한다(위에 쓴거 갖다쓸거임)
    return (
        <>
        <Stack spacing={2} mt={1}>
            <TextField 
                label="브랜드"
                name="brand"
                value={car.brand}
                onChange={handleChange}
            />
            <TextField 
                label="모델"
                name="model"
                value={car.model}
                onChange={handleChange}
            />
            <TextField 
                label="색상"
                name="color"
                value={car.color}
                onChange={handleChange}
            />
            <TextField 
                label="등록 넘버"
                name="registrationNumber"
                value={car.registrationNumber}
                onChange={handleChange}
            />
            <TextField 
                label="연식"
                name="modelYear"
                value={car.modelYear}
                onChange={handleChange}
            />
            <TextField 
                label="가격"
                name="price"
                value={car.price}
                onChange={handleChange}
            />
        </Stack>
        </>
    );

    /*
    <Stack(요소를 세로정렬해주는 레이아웃 컴포넌트) spacing={2}(요소 사이의 간격) mt={1}(margin-top위쪽 여백)>
        <TextField  
        label="브랜드"  입력창 위에 표시될 이름
        name="brand"    handleChange에서 사용될 이름
        value={car.brand}   현재 상태값을 입력창에 표시
        onChange={handleChange}  사용자가 입력하면 handleChange 함수 실행
        />
    */

   

}