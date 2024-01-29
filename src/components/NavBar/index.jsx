import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tabbar } from "react-vant";
import { useNavigate, useLocation } from "react-router-dom";
import CustomIcon from "../CustomIcon";
import s from "./style.module.less";

const NavBar = ({ showNav }) => {
  const [activeKey, setActiveKey] = useState("/");
  const location = useLocation(); // 获取当前路由信息
  const navigate = useNavigate();

  const chnageTab = (path) => {
    setActiveKey(path);
    navigate(path);
  };
  // 监听路由变化
  useEffect(() => {
    setActiveKey(location.pathname);
  }, [location.pathname]);

  return showNav ? (
    <Tabbar
      visible={showNav}
      className={s.tab}
      value={activeKey}
      onChange={chnageTab}
    >
      <Tabbar.Item name="/" icon={<CustomIcon type="zhangdan" />}>
        账单
      </Tabbar.Item>
      <Tabbar.Item name="/data" icon={<CustomIcon type="tongji" />}>
        统计
      </Tabbar.Item>
      <Tabbar.Item name="/user" icon={<CustomIcon type="wode" />}>
        我的
      </Tabbar.Item>
    </Tabbar>
  ) : null;
};

NavBar.propTypes = {
  showNav: PropTypes.bool,
};

export default NavBar;
