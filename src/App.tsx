import { AppBar, Container, CssBaseline, Toolbar, Typography } from "@mui/material"
import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import CarList from "./pages/CarList"
import type { JSX } from "react"
import { useAuthStore } from "./store"

type PrivateRouteProps ={
  children: JSX.Element;
}


function PrivateRoute({children}: PrivateRouteProps) {//children: 이 컴포넌트 안에 감싸진 JSX 요소들

  const {isAuthenticated} = useAuthStore();

  return isAuthenticated ? children : <Navigate to="/login" replace />;//replace: 브라우저 히스토리에서 현재 페이지를 로그인 페이지로 대체하므로, 뒤로 가기를 눌러도 다시 돌아오지 않음

}


function App() {

  return (
    <>
      <Container maxWidth='xl'>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              자동차 쇼핑몰
            </Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<PrivateRoute><CarList/></PrivateRoute>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Container>
    </>
  )
}

export default App
