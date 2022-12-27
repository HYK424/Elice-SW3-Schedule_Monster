import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import filterCategory from '../../util/filterCategory';
import { createFuzzyMatcher } from '../../util/filterHangul';
import { ItemBox, ItemButton, QuanButton, Tooltip } from './../characters/StoreStyle';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { buyItem, applyItem } from 'pages/characters/statusReducer';
import { useDispatch } from 'react-redux';

function Item({ setItem, item, purpose }: any) {
  const dispatch = useDispatch<any>();
  const currentCoin = useSelector((state: any) => state.statusReducer.coin);
  const [count, setCount] = useState(1);

  return (
    <ItemBox
      onClick={(): void => {
        setItem(item);
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '0.3rem',
        }}
      >
        {purpose === '구매' ? (
          <span style={{ fontSize: '15px' }}>💰 {item.price}</span>
        ) : null}
        {/* <span style={{fontSize:'15px'}}>+ ❤️{item.exp}</span> */}
      </div>

      <div style={{alignSelf:'center'}}>{item.itemName}</div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {purpose === '구매' ? (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '0.3rem',
              }}
            >
              <QuanButton
                onClick={(e) => {
                  count >= 2
                    ? setCount((cur) => cur - 1)
                    : setCount((cur) => cur);
                }}
              >
                <AiOutlineMinus />
              </QuanButton>
              <span style={{ margin: '0 1.5rem' }}>{count}</span>
              <QuanButton onClick={() => setCount((cur) => cur + 1)}>
                <AiOutlinePlus />
              </QuanButton>
            </div>

            <ItemButton
              onClick={() => {
                const isPurchase = window.confirm(
                  `'${item.itemName}' 아이템을 구매하시겠습니까?`,
                );
                if (isPurchase && currentCoin >= item.price * count) {
                  dispatch(buyItem(item.price * count));
                } else if (isPurchase && currentCoin < item.price * count) {
                  alert('보유 코인이 부족해요😭');
                }
              }}
            >
              {`${purpose}`}
            </ItemButton>
            <Tooltip>{item.itemInfo}</Tooltip>


          </>
        ) : null}
      </div>
    </ItemBox>
  );
}

function ItemList({ category, inputValue, purpose, setItem }: any) {
  const reducerData = useSelector((state: any) => state.itemListReducer);
  const data = reducerData.itemList;
  const itemList =
    inputValue === ''
      ? filterCategory(category, data)
      : data.filter((val: any) => {
          return createFuzzyMatcher(inputValue, val.itemName);
        });
  return (
    <>
      {itemList.map((item: any): JSX.Element => {
        return (
          <Item
            item={item}
            setItem={setItem}
            purpose={purpose}
            key={item._id}
          ></Item>
        );
      })}
    </>
  );
}
export default ItemList;
