/* eslint-disable */
import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25em;
  .modalButton {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10001;
  padding: 12px 24px;
}
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 120em;
  height: 120em;
  z-index: 10000;
}

.modalContainer {
  max-width: 600px;
  width: 20em;
  position: fixed;
  top: 39.4%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  background-color: #ffffff;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
  border-radius: 8px;
}
.closeBtn{
  margin-left: 18.5em;
  cursor: pointer;
  color: black;
  margin-top: 0.3em;
}
`;

const InputInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 262px;
  color: black;
  margin-left: 2em;
`;


const DisplayText = styled.div`
  font-size: 17px;
  font-weight: 600;
  text-align: left;
  color: red;
  margin-bottom: 0.2em;
  
`;

const Input = styled.input`
  width: 200px;
  height: 28px;
  border: 1px solid #babfc4;
  border-radius: 5px 0px 0px 5px;
  &:focus {
    border: 1px solid #0995fd;
    box-shadow: 0 0 0 3.3px #ddeaf7;
  }
`;

const MyPageButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7em;
  height: 2em;
  padding:12px;
  font-size: 12px;
  border: 0.01px solid #43549f;
  color: white;
  :hover {
    background-color: #4C53BF;
    border: 2px solid #3C53BF;
  }
  background-color: #747BF2;
  border: 2px solid #737BF2;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1em;
  margin-bottom: 1em;
`;

const SecessionModal = ({ open, onClose }) => {
  if (!open) return null;
 
  const byeRef = useRef();
  const navigate = useNavigate();

    const handleOnClick = (event) => {
      event.preventDefault();
      const byedata = byeRef.current.value;
      if(!(byedata === "회원탈퇴")){
        alert('정확한 "회원탈퇴" 글자가 입력되지 않았습니다.')
      }else{
      axios
      .delete("http://13.209.190.35:8080/users",{
        headers: { Authorization : `${localStorage.getItem('login-refresh')}` },
      })
      .then(() => {
        localStorage.removeItem('login-token');
        navigate("/");
      });
        };
      };
    


  return (
    <Container>
    <div onClick={onClose} className='overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
        <div className='modalRight'>
          <p className='closeBtn' onClick={onClose}>
            X
          </p>
          <InputInfo>
          <DisplayText>정말로 탈퇴하시겠습니까?</DisplayText>
          <Input type="text"  ref={byeRef}  placeholder='"회원탈퇴" 를 입력해주세요.' />
          <MyPageButton className='btnContainer' onClick={handleOnClick}>회원탈퇴</MyPageButton>
          </InputInfo>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SecessionModal;