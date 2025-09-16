import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import CarDialogContents from "./CarDialogContents";
import type { Car } from "../type";
import { updateCar } from "../api/CarApi";
import EditIcon from '@mui/icons-material/Edit';



type EditCarProps = {
    carData: Car;
    loadCarData: () => void;
}

export default function EditCar({carData, loadCarData}: EditCarProps){
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState<Car>({
        id: 0,
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0
        });

    const handleOpen = () => {
        setCar({
            id: carData.id,
            brand: carData.brand,
            model: carData.model,
            color: carData.color,
            registrationNumber: carData.registrationNumber,
            modelYear: carData.modelYear,
            price: carData.price,
        });//carData 즉 Car에 든걸 car에 복사함.(모달? 열기 전에 값 저장해두는거)
        setOpen(true);//오픈~~
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = async () => {
        
        //수정 API 요청
        await updateCar(car);//CarApi에 있는 값 수정해서 새로운 객체 만드는거에 car보냄
        setCar({
        id: 0,
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0
        });//상태 초기화해서

        loadCarData();
        handleClose();//닫음
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;//어떤 값을 넣었는지
        const name = e.target.name;//어떤 입력창에
        setCar({...car, [name]: value})//수정후 새객체
    }

    return(
        <>
        <Tooltip title="수정">
            <IconButton size="small" onClick={handleOpen}>
                <EditIcon />
            </IconButton>
        </Tooltip>
        
        
        <Button onClick={handleOpen}>New Car</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                Edit Car
            </DialogTitle>
            <DialogContent>
                <CarDialogContents 
                    car={car}
                    handleChange={handleChange}
                />
            </DialogContent>
            
            <DialogActions>
                <Button onClick={handleSave}>저장</Button>
                <Button onClick={handleClose}>닫기</Button>
            </DialogActions>
        </Dialog>
        
        </>
    )
    /*
    JSX 반환 시작
    수정 아이콘을 누르면 열림
    open={open} open은 초기값이 false였기때문에 true가 되는지 확이하는거
    car, handleChange를 CarDialogContent에 넘겨서 각 속성(brand, model, color 등)을 <TextField>에 표시

    CarDialogContent는 폼 UI만 담당
    실제 상태 업데이트는 EditCar가 처리 ==> controlled component
    */
}