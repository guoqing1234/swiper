import React, { Component } from 'react';
import "./index.scss"
//引入swiper的css样式
import "swiper/css/swiper.min.css"
//引入swiper的js
import Swiper from "swiper/js/swiper.min"

//使用axios请求数据
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.getSwiper()
    //使用axios请求数据
    axios.get('/data.json').then(res => {
      this.setState({
        data: res.data.dataInfo
      },()=>{
        //获取数据重新调用Swiper
        this.getSwiper()
      })
    })
  }
  //封装一个函数
  getSwiper() {
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        //下一张
        nextEl: '.swiper-button-next',
        //上一张
        prevEl: '.swiper-button-prev',
      },
    });
  }


  render() {
    return (

      <React.Fragment>
        {/* Loop模式 / 无限循环(200) */}
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {
              this.state.data != null ?
                this.state.data.map((item, index) => {
                  return (
                    <img key={index} className="swiper-slide" src={item.url} />
                  )
                })
                : "未获取数据"
            }
            {/* <div className="swiper-slide">Slide 1</div>
            <div className="swiper-slide">Slide 2</div>
            <div className="swiper-slide">Slide 3</div>
            <div className="swiper-slide">Slide 4</div>
            <div className="swiper-slide">Slide 5</div>
            <div className="swiper-slide">Slide 6</div> */}
          </div>
          {/* 轮播导航 */}
          <div className="swiper-pagination"></div>
          {/* 点击切换下一张 */}
          <div className="swiper-button-next"></div>
          {/* 点击切换上一张 */}
          <div className="swiper-button-prev"></div>
        </div>
        {/* 如果在react中使用map渲染的话要重新调用一下函数 */}
      </React.Fragment>
    );
  }
}

export default App;