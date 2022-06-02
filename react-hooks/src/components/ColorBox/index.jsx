import React, { useState } from 'react'
import './ColorBox.scss'

function randomColor() {
    const Color_list = ['deeppink', 'green', 'blue', 'red', 'yellow'];
    const randomIndex = Math.floor(Math.random() * 5);
    return Color_list[randomIndex];
}

function ColorBox() {

    const [color, setColor] = useState(() => {
        const initColor = localStorage.getItem('box_color') || 'deeppink';
        return initColor;
    })

    const handleBoxClick = () => {
        const newColor = randomColor();
        setColor(newColor);
        localStorage.setItem('box_color', newColor)
    }

    return (
        <div className='color-box' style={{ backgroundColor: color }} onClick={handleBoxClick}></div>
    )
}

export default ColorBox