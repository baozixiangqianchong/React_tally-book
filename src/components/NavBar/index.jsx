import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabbar } from "react-vant";
import { useNavigate } from "react-router-dom";
import CustomIcon from "../CustomIcon";
import s from "./style.module.less";

const NavBar = ({ showNav }) => {
  const [activeKey, setActiveKey] = useState("/");
  const navigate = useNavigate();
  const chnageTab = (path) => {
    setActiveKey(path);
    navigate(path);
  };

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
