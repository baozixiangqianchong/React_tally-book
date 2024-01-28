import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import routes from "../src/router";
import NavBar from "@/components/NavBar";
//引入zarm组件库，样式
import "zarm/dist/zarm.css";
// import "./.index.css";
function App() {
  const location = useLocation(); // 拿到 location 实例
  const { pathname } = location; // 获取当前路径
  const needNav = ["/", "/data", "/user"]; // 需要底部导航栏的路径
  const [showNav, setShowNav] = useState(false); // 是否展示 Nav
  useEffect(() => {
    setShowNav(needNav.includes(pathname));
  }, [pathname]); // [] 内的参数若是变化，便会执行上述回调函数=

  return (
    <>
      <Routes>
        {routes.map((route) => (
          <Route
            exact
            key={route.path}
            path={route.path}
            element={<route.component />}
          ></Route>
        ))}
      </Routes>
      <NavBar showNav={showNav} />
    </>
  );
}

export default App;
