import React from 'react';

function Card(props: {children: React.ReactNode, className?: string}) {
    const classes = [props?.className || '', 'min-h-[194px] inline-flex flex-col w-full bg-white light-shadow rounded-lg'].join(' ')
    return (
        <div className={classes}>
            {
            props.children
            }
        </div>
    );
}

export {Card};