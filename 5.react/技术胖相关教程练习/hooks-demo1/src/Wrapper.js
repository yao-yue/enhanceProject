import React from 'react';
import ShowArea from './ShowArea';
import Buttons from './Buttons';
import { Color } from './Color';   //引入Color组件

function Wrapper() {
    return (
        <div>
            <Color>
                <ShowArea />
                <Buttons />
            </Color>

        </div>
    )
}

export default Wrapper