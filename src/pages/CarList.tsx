import { useEffect, useState } from "react";
import type { Car } from "../type";
import { deleteCar, getCars } from "../api/CarApi";
import { DataGrid } from "@mui/x-data-grid";
import type { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Button, IconButton, Snackbar, Tooltip } from "@mui/material";
import AddCar from "../components/AddCar";
import EditCar from "../components/EditCar";
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuthStore } from "../store";


export default function CarList (){
    const {logout} = useAuthStore();
    const [ data, setData ] = useState<Car[]>([]);
    const [toastVal, setToastVal] = useState({
        open: false, msg: '',
    })

    const columns: GridColDef[] = [//화면에 나올 컬럼 순서, DataGrid에 표시될 각 컬럼의 정보 정의

        {field: 'brand', headerName: '브랜드', width: 200},
        {field: 'model', headerName: '모델', width: 200},
        {field: 'color', headerName: '색상', width: 200},
        {field: 'registrationNumber', headerName: '등록넘버', width: 150},
        {field: 'modelYear', headerName: '연식', width: 150},
        {field: 'price', headerName: '가격', width: 150},
        {
            field: 'edit',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <EditCar carData={params.row} loadCarData={loadCarData}/>
            )
        },//수정버튼
        {
            field: 'delete',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <Tooltip title="삭제">
                    <IconButton  onClick={() => deleteCarData(params.row.id)}>
                    <DeleteIcon />
                    </IconButton>
                </Tooltip>
                
            )
        }//삭제 버튼
    ];
    
    const loadCarData = () => {
        getCars()
        .then(res => setData(res))
        .catch(err => console.log(err));
    }//서버에서 자동차 데이터를 불러와서 data(상태변수)에 저장


    const deleteCarData = (id: number) => {
        if(confirm(`${id}번 데이터를 삭제하겠습니까?`)){
            deleteCar(id)
        .then(res => {
            loadCarData();
            setToastVal({open: true, msg: `${res}번 데이터가 삭제되었습니다.`})
        })
        .catch(err => console.log(err));
        }
    }//사용자에게 삭제 확인을 받고, 삭제 후 Snackbar 메시지를 띄움

    const handleLogout = () => {
        sessionStorage.setItem("jwt", "");
        logout();
    }

    useEffect(() => {
        loadCarData();

    }, []);// 컴포넌트가 처음 렌더링될 때 loadCarData를 실행


    return (
        <>
            <AddCar loadCarData={loadCarData}/>
            <Button onClick={handleLogout}>로그아웃</Button>
            <DataGrid 
                rows={data}
                columns={columns}
                getRowId={row => row.id}
                showToolbar
            />
            <Snackbar
                open={toastVal.open}
                onClose={() => setToastVal({open: false, msg: ''})}
                message={toastVal.msg}
                autoHideDuration={2000}

            />
        </>
    )
}