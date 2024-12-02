import './Slider.css'
import img1 from '../../../assets/display/img1.jpg'
import img2 from '../../../assets/display/img2.jpg'
import img3 from '../../../assets/display/img3.jpg'
import img4 from '../../../assets/display/img4.jpg'
import img5 from '../../../assets/display/img5.jpg'
import img6 from '../../../assets/display/img6.jpg'
import img7 from '../../../assets/display/img7.jpg'
import img8 from '../../../assets/display/img8.jpg'
import img9 from '../../../assets/display/img9.jpg'

import React, { useState, useEffect } from 'react';

const Slider = () => {
    const [counter, setCounter] = useState(0);
    const [operacion, setOperacion] = useState(0);
    const sliderSection = 9; 
    const widthImg = 100 / sliderSection;

    const moveToRight = () => {
        const slider = document.querySelector('.slider');
        if (!slider) return;

        if (counter >= sliderSection - 1) {
            setCounter(0);
            setOperacion(0);
            slider.style.transform = `translate(0%)`;
            slider.style.transition = "none";
            return;
        }
        setCounter(prevCounter => prevCounter + 1);
        const newOperacion = (counter + 1) * widthImg;
        setOperacion(newOperacion);
        slider.style.transform = `translate(-${newOperacion}%)`;
        slider.style.transition = "all ease 1s";
    };

    const moveToLeft = () => {
        const slider = document.querySelector('.slider');
        if (!slider) return;

        if (counter <= 0) {
            setCounter(sliderSection - 1);
            const newOperacion = widthImg * (sliderSection - 1);
            setOperacion(newOperacion);
            slider.style.transform = `translate(-${newOperacion}%)`;
            slider.style.transition = "none";
            return;
        }
        setCounter(prevCounter => prevCounter - 1);
        const newOperacion = (counter - 1) * widthImg;
        setOperacion(newOperacion);
        slider.style.transform = `translate(-${newOperacion}%)`;
        slider.style.transition = "all ease 1s";
    };

    useEffect(() => {
        const interval = setInterval(() => {
            moveToRight();
        }, 7000);

        return () => clearInterval(interval);
    }, [counter]);

    return (
            <div className='slide-container'>
                <div className='slider'>
                    {[img1, img2, img3, img4, img5, img6, img7, img8, img9].map((img, index) => (
                        <section className='slide' key={index}>
                            <img src={img} alt={`slide-${index}`} />
                        </section>
                    ))}
                </div>
                <button className="boton-der" onClick={moveToRight}>{'>'}</button>
                <button className="boton-izq" onClick={moveToLeft}>{'<'}</button>
            </div>
    );
};

export default Slider;