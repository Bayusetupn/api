import InputField from "components/fields/InputField";
import Checkbox from "components/checkbox";
import React, { useState } from "react";
import api from '../../api/axios.js';
import { useSignIn } from "react-auth-kit";
import { redirect, useNavigate } from "react-router-dom";


export default function SignIn() {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [errMsg, setErrMsg] = useState();
  const login = useSignIn();


  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setErrMsg("Username dan Password tidak boleh kosong!")
      return;
    } else if (formData.password.length < 8) {
      setErrMsg("Password minimal 8 karakter !")
      return;
    }
    try {
      await api.post('/login', formData).then(res => {
        switch (res.data.role) {
          case 'admin':
            login({
              token: res.data.token,
              expiresIn: 360000,
              tokenType: "Bearer",
              authState: res.data.role
            })
            redirect('/admin/dashboard')
            break;
          case 'agen':
            login({
              token: res.data.token,
              expiresIn: 360000,
              tokenType: "Bearer",
              authState: res.data.role
            })
            redirect('/agen/dashboard')
            break;
          case 'ustad':
            login({
              token: res.data.token,
              expiresIn: 360000,
              tokenType: "Bearer",
              authState: res.data.role
            })
            redirect('/ustad/dashboard')
            break;
        }
      })
    } catch (error) {
      setErrMsg(error.response.data.message)
      return
    }

  }

  return (
    <div className="mt-5 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Login
        </h4>
        <p className="ml-1 text-base text-gray-600">
          Masukkan Username dan Password untuk Login !
        </p>
        <p className="mt-3 mb-3 text-base text-red-500">
          {errMsg}
        </p>
        <form onSubmit={onSubmit}>
          {/* Username */}
          <InputField
            onChange={e => {
              setFormData({ ...formData, username: e.target.value })
              setErrMsg('')
            }}
            variant="auth"
            extra="mb-3"
            label="Username"
            placeholder="Username Anda"
            id="username"
            type="text"
          />

          {/* Password */}
          <InputField
            onChange={e => {
              setFormData({ ...formData, password: e.target.value })
              setErrMsg('')
            }}
            variant="auth"
            extra="mb-3"
            label="Password"
            placeholder="Minimal 8 Karakter"
            id="password"
            type="password"
          />
          {/* Checkbox */}
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Tetap Login
              </p>
            </div>
          </div>
          <button type="submit" className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
