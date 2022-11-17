import React, { useState, useRef, ChangeEvent, RefObject } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import { displayCenter, boxStyle } from '../../styles/mixin';
import COLORS from '../../styles/color';

type Response = {
  message: string;
  data: {};
};

async function signInAPI(inputId: string, inputPw: string): Promise<Response> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_FRONT_TEST_HOST}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ userId: inputId, password: inputPw }),
  });
  return response.json();
}

function changeBorderColor(inputRef: RefObject<HTMLInputElement>, color: string) {
  const { current } = inputRef;
  if (current !== null) {
    current.style.borderColor = color;
  }
}
export default function Login() {
  const [account, setAccount] = useState({
    id: '',
    pw: '',
  });
  const inputIdRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const inputPwRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const onChangeAccount = (e: ChangeEvent<HTMLInputElement>): void => {
    changeBorderColor(inputIdRef, COLORS.PRIMARY_LIGHT);
    changeBorderColor(inputPwRef, COLORS.PRIMARY_LIGHT);
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };
  const commonLogin = (): void => {
    if (!account.id) {
      changeBorderColor(inputIdRef, COLORS.RED);
      return;
    }
    if (!account.pw) {
      changeBorderColor(inputPwRef, COLORS.RED);
      return;
    }
    (async () => {
      const loginResponse = await signInAPI(account.id, account.pw);
      if (loginResponse.message !== 'success') {
        alert('아이디와 비밀번호 정보가 정확하지 않습니다.');
      } else {
        // user 데이터 상태로 저장하기 loginResponse.data
        Router.push({ pathname: '/main' });
      }
    })().catch((err) => {
      alert(`로그인 실패 ERROR message: ${err as string}`);
      Router.push({ pathname: '/login' });
    });
  };
  return (
    <Wrapper>
      <Box>
        <Title>로그인</Title>
        <input type="text" placeholder="아이디를 입력하세요" name="id" ref={inputIdRef} onChange={onChangeAccount} />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          name="pw"
          ref={inputPwRef}
          onChange={onChangeAccount}
        />
        <button type="submit" onClick={commonLogin}>
          로그인
        </button>
        <button type="button" style={{ backgroundColor: COLORS.BLACK }}>
          LOGIN WITH GITHUB
        </button>
        <FindAccount>
          <Link href="/idinquiry">아이디 찾기</Link>
          <div>|</div>

          <Link href="/pwinquiry">비밀번호 찾기</Link>
        </FindAccount>
      </Box>
      <SignUp>
        <div>계정이 없으신가요?</div>
        <Link href="/signup">회원가입</Link>
      </SignUp>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: left;
`;

const Box = styled.div`
  width: 90%;
  height: 337px;
  ${boxStyle}
  input {
    margin-bottom: 12px;
    width: 70.5%;
    height: 13%;
    font-size: 18px;
  }
  button {
    margin-bottom: 12px;
    width: 73%;
    height: 15%;
    font-size: 18px;
  }
`;

const Title = styled.div`
  font-size: 36px;
  margin-top: 8%;
  margin-bottom: 1%;
`;

const FindAccount = styled.div`
  ${displayCenter}
  margin-bottom: 5%;
  a {
    margin: 5px;
    text-decoration: none;
    color: ${COLORS.BLACK};
    &:focus-within {
      font-weight: bold;
    }
  }
`;

const SignUp = styled.div`
  width: 80%;
  margin: 5%;
  display: flex;
  justify-content: space-evenly;
  a {
    text-decoration: none;
    color: ${COLORS.BLACK};
    &:focus-within {
      font-weight: bold;
    }
  }
`;
