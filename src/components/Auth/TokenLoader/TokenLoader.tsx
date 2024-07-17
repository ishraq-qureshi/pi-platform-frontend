"use client"

import { setToken, setUser } from "@/redux/slices/auth/auth.slice";
import { User } from "@/types/user.type";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const TokenLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tmp_user = localStorage.getItem('user');
    const user = tmp_user && JSON.parse(tmp_user) as User;
    if (token && user) {
      dispatch(setToken(token));
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default TokenLoader;