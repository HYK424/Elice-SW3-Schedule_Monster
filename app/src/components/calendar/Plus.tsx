import React, { useState } from 'react';
import * as API from '../../api';
import * as Style from '../modal/modal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/store';
import { postCalendarList } from 'pages/login/userSlice';

//캘린더추가만 하면 됨, 추가했을때 캘린더리스트 값이 바뀌는지 확인
type res = {
  calendarId: string;
  calendarName: string;
  createdAt: Date;
  email: string;
  share: boolean;
  updatedAt: Date;
  url: null;
  __v: number;
  _id: string;
};

export const Plus = ({
  setList,
}: {
  setList: React.Dispatch<React.SetStateAction<res[]>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const email = useSelector((state: RootState) => state.persistedReducer.email);
  const dispatch = useDispatch();
  const clickHandler = () => {
    setIsOpen(!isOpen);
  };

  const addHandler = async (name: string) => {
    //캘린더추가 api로 캘린더 추가하기
    const data = await API.post('/calendar', { email, calendarName: name });
    const list = await API.get(`/calendar/${email}`);
    window.alert(`${data.calendarName} 추가완료📣`);
    setList(list); //부모의 list state에 추가
    dispatch(postCalendarList(list));
    //전역 state에도 추가
  };
  const changeHandler = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };
  return (
    <Style.Wrapper>
      <Style.Button type="button" value="+" onClick={clickHandler} />
      {isOpen && <Modal onChange={changeHandler} onSave={addHandler} />}
    </Style.Wrapper>
  );
};
type modalType = {
  isOpen?: boolean;
  isClose?: boolean;
  onChange: (a: boolean) => void;
  onSave: (a: string) => void;
};

const Modal: React.FC<modalType> = ({ onChange, onSave }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const addClickHandler = () => {
    if (name === '') {
      setError(true);
      return;
    }
    // console.log('캘린더이름:', name);
    setError(false);
    onSave(name);
    onChange(false);
  };
  const cancelClickHandler = () => {
    setName('');
    onChange(false);
  };
  return (
    <Style.Container>
      <Style.Title>캘린더추가</Style.Title>
      <Style.Label>캘린더이름</Style.Label>
      <Style.Input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Style.Error>{error && '캘린더이름을 입력해주세요'}</Style.Error>
      <Style.ButtonCotainer>
        <Style.Button type="button" value="추가" onClick={addClickHandler} />
        <Style.Button type="button" value="취소" onClick={cancelClickHandler} />
      </Style.ButtonCotainer>
    </Style.Container>
  );
};
