"use client"
import React from 'react';
import { Button, ButtonProps } from '@material-tailwind/react';

const ButtonTailwind = (props: ButtonProps | any) => {
    return (
        <Button {...props}>
            {props.children}
        </Button>
    );
}

export default ButtonTailwind;
