import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

// components
import Remove from "../components/Remove";
import Edit from "../components/Edit";
import Button from "../components/Button";
import "./MyPage.scss";

interface Props {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  mobile?: string;
  adoptModifiedInfo: (data: any) => void;
  signOut: () => void;
}

const MyPage: React.FC<Props> = (props) => {

  console.log("myProps", props)

  const [mypageInfo, setMypageInfo] = useState({
    email?: props.email,
    password: props.password,
    name?: props.name,
    mobile?: props.mobile
  })
  const makeChange(data: any): any => {
    if (data.password !== "") setMypageInfo({ password: data.password });
    if (data.name !== "") setMypageInfo({ name: data.name });
    props.adoptModifiedInfo(data);
  }

  useEffect(() => {
    mypageInfo
  })

  return (
    <>
    </>
  )
}

export default MyPage;
