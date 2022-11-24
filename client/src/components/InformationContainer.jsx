/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import Toggle from "./Toggle";

const Container = styled.div`
  width: 300px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 10px 24px 0px,
    rgba(0, 0, 0, 0.05) 0px 20px 48px 0px, rgba(0, 0, 0, 0.1) 0px 1px 4px 0px;
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
  padding: 20px 10px 10px 10px;
`;

const InputContainer = styled.div`
  margin: 0 0 5px 0;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const Errormsg = styled.p`
  color: #bf1650;
  margin: 3px;
  font-size: 13px;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 3px;
`;

const Input = styled.input`
  width: 260px;
  height: 35px;
  padding: 0;
  border: 2px solid rgb(88 101 242) ;

  // 화살표 제거
  // ::-webkit-outer-spin-button;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const SubmitBtn = styled.input`
  width: 260px;
  height: 35px;
  font-size: 13.6px;
  font-weight: 600;
  color: white;
  background-color: rgb(88 101 242);

  border: 0;
  border-radius: 3px;
  padding: 0;
  margin-bottom: 5px;
  &:hover {
    background-color: rgb(71 82 196);
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default function InformationContainer() {
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: onchange });
  
  // const onInformation = async (data) => {
  //   console.log(data);
  //   // 회원가입 api 자리
  //   // try {
  //   //   axios.post("#", { ...data });
  //   // } catch (err) {
  //   //   setError(err);
  //   // }
  // };

  // const [account, setAccount] = useState({
  //   height: "",
  //   // weight: "",
  //   // age: "",
  // });

  //input에 입력될 때마다 account state값 변경되게 하는 함수
  // const onChangeAccount = (e) => {
  //   setAccount({
  //     ...account,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  // // console.log(account);





  const onInformation = async (data) => {
    // console.log(data);
    // console.log(data.email+": 이메일");
    // console.log(data.password+": 이메일");

    try {
      // 응답 성공
      // const res = await axios.post("http://13.209.190.35:8080/users/login", {
      const res = await axios.post(`${url}/users/info`, {
        // 보내고자 하는 데이터
        height: data.height,
        age: data.age,
        // gender: ,
        weight: data.weight

      });

      // status가 200이면 세션스토리지에 jwt-token 저장
      if (res.status === 200) {

        // 토근 저장 후 메인 페이지로 이동 
        navigate("/");

        // console.log(res);
        // console.log("성공 로그인 ~~~~~~~~~~~~~~~~");

        // console.log("응답 전체",res)
        // console.log("응답.headers", res.headers.InitialLogin)
        // console.log("응답.headers", res.headers.initialLogin)
        // console.log("응답.headers", res.headers.initiallogin)
        
        // InitialLogin이 false면 처음 로그인으로
        // if(res.InitialLogin === false){
        //   navigate("/startinginformation");
        //   sessionStorage.setItem('jwt-token', res.headers.authorization);
        //   // InitialLogin이 true면 main 페이지로
        // } else if(res.InitialLogin === ture){
        //   navigate("/");
        // }
        
      } 
      
    } catch (err) {
      // 응답 실패
      console.log(err);
      // console.log("로그인 실패")

      // 로그인 실패시 
      alert("정보 입력에 실패하였습니다.");
    }
  };
  

  return (
    <MainContainer>
      <div>
        <Container>
          <Form onSubmit={handleSubmit(onInformation)} >
            {/* onChange={onChangeAccount} */}
            <InputContainer>
              <Label htmlFor="height">height(키)</Label>
              <Input
                type="number"
                id="height"              
                {...register("height", {
                  required: true,
                  min: 50,
                  max: 250,
                })}
              />
              {errors.height && errors.height.type === "required" && (
                <Errormsg>⚠ 키를 입력해주세요.</Errormsg>
              )}
              {errors.height && errors.height.type === "min" && (
                <Errormsg>⚠ 올바른 키를 입력하세요</Errormsg>
              )}
              {errors.height && errors.height.type === "max" && (
                <Errormsg>⚠ 올바른 키를 입력하세요</Errormsg>
              )}
            </InputContainer>
            <InputContainer>
              <Label htmlFor="weight">weight(몸무게)</Label>
              <Input
                type="number"
                id="weight"
                {...register("weight", {
                  required: true,
                  min: 1,
                  max: 700,
                })}
              />
              {errors.weight && errors.weight.type === "required" && (
                <Errormsg>⚠ 몸무게를 입력해주세요.</Errormsg>
              )}
              {errors.weight && errors.weight.type === "min" && (
                <Errormsg>⚠ 올바른 몸무게를 입력하세요</Errormsg>
              )}
              {errors.weight && errors.weight.type === "max" && (
                <Errormsg>⚠ 올바른 몸무게를 입력하세요</Errormsg>
              )}
            </InputContainer>
            <InputContainer>
              <Label htmlFor="age">age(생년월일)</Label>
              <Input
                type="text"
                id="age"
                placeholder= "2000-01-01"
                {...register("age", {
                  required: true,
                  // min: 1,
                  // max: 200,
                  pattern: /\d{4}-\d{2}-\d{2}/,
                })}
              />
              {errors.age && errors.age.type === "required" && (
                <Errormsg>⚠ 나이를 입력해주세요.</Errormsg>
              )}
              {errors.age && errors.age.type === "pattern" && (
                <Errormsg>⚠ 2000-01-01 형식을 맞춰주세요</Errormsg>
              )}
            </InputContainer>
            <Toggle />
            {/* 완료 버튼 */}
            {/* 완료 클릭 시 메인 페이지로 이동 */}
            <SubmitBtn 
            // onClick={() => navigate('/')} 
              type="submit" value="완료"                              
            />
            {error && <Errormsg>⚠ {error}</Errormsg>}
          </Form>
        </Container>
      </div>
    </MainContainer>
  );
}
