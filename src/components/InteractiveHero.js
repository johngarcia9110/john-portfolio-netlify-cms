import React from 'react';
import Hero from '../img/hero.svg';

const InteractiveHero = class extends React.Component{
    listenForHover = () => {
        const about = document.getElementById('myAbout');
        console.log('about fired: ', about);
        about.addEventListener('click', () => {
            console.log('hovered');
        })
    }
    componentDidMount(){
        const about = document.getElementById('myAbout');
        const work = document.getElementById('myWork');
        const resume = document.getElementById('myResume');
        const myButtons = [about, work, resume];

        for (let i = 0; i < myButtons.length; i++){
            myButtons[i].addEventListener('click', (e) => {
                switch(myButtons[i].id){
                    case "myWork":
                        document.getElementById('work').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                        return;
                    case "myAbout":
                        document.getElementById('contact').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                        return;
                    default:
                        return;
                }
            });
            myButtons[i].addEventListener('mouseover', (e)=>{
                myButtons[i].classList.remove('hint');
            })
        }
    }
    componentWillUnmount(){
        document.getElementById('myAbout').removeEventListener('click',() => {
            console.log('hovered');
        });
    }
    render(){
        return(
            <Hero/>
        );
    }
};

export default InteractiveHero;