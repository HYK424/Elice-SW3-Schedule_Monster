import React from 'react';
import { ItemButton, ItemBox } from './StoreStyle';

export default function StoreItem() {
    return (
        <ItemBox>
            <div style={{display:'flex', justifyContent:'space-around', padding:'0.3rem'}}>

            <span>๐ฐ 100</span>
            <ItemButton onClick={() => confirm('์์ดํ๋ช์ ๊ตฌ๋งคํ์๊ฒ ์ต๋๊น?')}>
                ๊ตฌ๋งคํ๊ธฐ
            </ItemButton>
            </div>

        </ItemBox>
    );
}

