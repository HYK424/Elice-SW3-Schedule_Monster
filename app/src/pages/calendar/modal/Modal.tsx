import { ModalBtn } from 'components/button/buttons';
import { useEffect, useRef, useState } from 'react';
import Schedule from '../Schedule';
import Todo from '../Todo';
import { ModalContainer, Tab, ContentBox, TabBox, BtnBox } from './ModalStyle';
import { useNavigate, useParams } from 'react-router-dom';

const Modal = ({ setModal }: { setModal: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const onClick = (tab: number) => {
    setValue(tab);
  };

  const { dates } = useParams();
  const tabs = [
    {
      name: '할 일',
      content: <Todo dates={dates} />,
    },
    {
      name: '일정',
      content: <Schedule dates={dates}/>,
    },
  ];

  useEffect(() => {
    const clickOutside = (e: React.BaseSyntheticEvent | MouseEvent) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        //current.contains(e.targt)은 이벤트를 실행한 e.target이 포함되어 있다면 true/아니면 false
        //여기서는 modalRef 바깥에서 event가 발생하면 ~ 으로 조건 걸었다
        setModal();
        navigate('/calendar');
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  return (
    <ModalContainer ref={modalRef}>
      <TabBox>
        {tabs.map((tab, i) => {
          return (
            <Tab
              key={`${tab.name}-${i}`}
              onClick={() => {
                onClick(i);
              }}
              active={i === value}
            >
              <p>{tab.name}</p>
            </Tab>
          );
        })}
      </TabBox>
      <ContentBox>{tabs[value].content}</ContentBox>
      <BtnBox>
        <ModalBtn onClick={()=>{setModal(); navigate('/calendar')}}>취소</ModalBtn>
        <ModalBtn onClick={()=>{setModal(); navigate('/calendar')}}>저장</ModalBtn>
      </BtnBox>
    </ModalContainer>
  );
};

export { Modal };