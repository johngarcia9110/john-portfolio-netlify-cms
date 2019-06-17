import React, { Component } from 'react';
import { FaArrowUp } from 'react-icons/fa';

class ScrollTop extends Component {
    state = {
        isHidden : true
    }
    handleButtonDisplay = () => {
        console.log(window.scrollY);
        if(window.scrollY > 800){
            this.setState({isHidden : false})
        }else{
            this.setState({isHidden : true})
        }
    }
    componentDidMount(){
        window.addEventListener('scroll', this.handleButtonDisplay);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleButtonDisplay);
    }
    render(){
        return (
            <div>
                <button className={this.state.isHidden ? "toTop" : "toTop active"} onClick={()=>{this.props.scrollTo('hero')}}>Top <FaArrowUp/></button>
            </div>

        )
    }
}
export default ScrollTop;