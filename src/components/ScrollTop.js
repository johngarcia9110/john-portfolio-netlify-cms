import React, { Component } from 'react';

class ScrollTop extends Component {
    state = {
        isHidden : true
    }
    handleButtonDisplay = () => {
        window.scrollY > 800 ?
            this.setState({isHidden : true}) :
            this.setState({isHidden : false});
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
                { this.state.isHidden && (
                    <button className="toTop" onClick={()=>{this.props.scrollTo('hero')}}>To Top</button>
                    )
                }
            </div>

        )
    }
}
export default ScrollTop;