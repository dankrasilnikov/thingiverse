'use client';

import React from "react";
import ButtonWrapperCircle from "@/components/common/ButtonWrapperCircle/ButtonWrapperCircle";

const ButtonThreeDots: React.FC<{}> = () => {

    const openOptions = () => {
        console.log('Options open')
    };

    return <ButtonWrapperCircle src={'/icons/three_dots.svg'} alt={'Options'} onClick={openOptions}/>;
}

export default ButtonThreeDots;
