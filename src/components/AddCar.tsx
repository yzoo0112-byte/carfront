import React, { useState } from "react";
import type { Car } from "../type";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { addCar } from "../api/CarApi";
import CarDialogContents from "./CarDialogContents";


type AddCarProps = {
    loadCarData: () => void;
}



export default function AddCar({loadCarData}: AddCarProps) {
    /*const [상태값, 상태를바꾸는함수] = useState(초기값);*/
    const [open, setOpen] = useState(false);//open:false(boolean)에 대한 상태 변수
    const [car, setCar] = useState<Car>({//car: <Car>에 대한 상태 변수
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0
    });//초기값 넣음

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {//HTML <input> 요소에서 발생한 변경 이벤트를 처리하는 함수

        const name = e.target.name;//어떤 입력창에(e.target은 이벤트가 발생한 입력창, name은 그냥 name=""속성)
        const value = e.target.value;//어떤 값을 넣었는지
        
        setCar({...car, [name]: value})//넣은값으로 수정해서 새로운 객체 생성
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        await addCar(car);
        // car list reload
        loadCarData();
        setCar({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0
        });
        handleClose();//handleClose메서드 바로 호출 ()안쓸때는 랜더링시 바로 호출하는게 아님 ex)onClose={handleClose}
    }

    return(
        <>
            <Button onClick={handleOpen}>New Car</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <CarDialogContents 
                        car={car}
                        handleChange={handleChange}
                    />
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={handleSave}>저장</Button>
                    <Button onClick={handleClose}>취소</Button>
                </DialogActions>
            </Dialog>
        </>
    );
    //Dialog - Title,Content,Action
    //CarDialogContents를 자식 컴포넌트로 가짐
} 