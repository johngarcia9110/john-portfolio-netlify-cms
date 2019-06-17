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
        const about = document.getElementById('personInChair');
        const work = document.getElementById('laptop');
        const resume = document.getElementById('myPhoneIcon');
        const myButtons = [about, work, resume];

        for (let i = 0; i < myButtons.length; i++){
            myButtons[i].addEventListener('mouseenter', (e) => {
                switch(myButtons[i].id){
                    case "laptop":
                        document.getElementById('myWork').classList.add('myWorkIn');
                        return;
                    case "personInChair":
                        document.getElementById('myAbout').classList.add('myAboutIn');
                        return;
                    case "myPhoneIcon":
                        document.getElementById('myContact').classList.add('myContactIn');
                        return;
                    default:
                        return;
                }
            });
            myButtons[i].addEventListener('mouseleave', (e) => {
                switch(myButtons[i].id){
                    case "laptop":
                        console.log('mouse leave laptop')
                        document.getElementById('myWork').classList.remove('myWorkIn');
                        return;
                    case "personInChair":
                        document.getElementById('myAbout').classList.remove('myAboutIn');
                        return;
                    case "myPhoneIcon":
                        document.getElementById('myContact').classList.remove('myContactIn');
                        return;
                    default:
                        return;
                }
            });
            myButtons[i].addEventListener('click', (e) => {
                switch(myButtons[i].id){
                    case "laptop":
                        document.getElementById('work').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                        return;
                    case "myAbout":
                        document.getElementById('contact').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                        return;
                    default:
                        return;
                }
            });
            // myButtons[i].addEventListener('mouseover', (e)=>{
            //     myButtons[i].classList.remove('hint');
            // })
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