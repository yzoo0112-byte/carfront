
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(//- HTML 문서에서 id="root"인 요소를 찾아 React 앱을 그 위에 렌더링을 준비, !: null이 아님
  <BrowserRouter>
  <>
  <App />
  </>
  </BrowserRouter>
  

)//라우팅: URL을 기반으로 페이지를 전환할 수 있게 해주는 핵심 컴포넌트, controller의 @GetMapping("/")느낌
