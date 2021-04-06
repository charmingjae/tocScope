# TOC! (beta)
> 현재 베타 테스트를 진행 중 입니다. ( last update : April 4 )  

<br/>

## 👨🏻‍💻 Overview  
과거부터 진행 되어 온 'TOC 튀는 멘토링'은 학습법,  학업 능력 향상을 목표로 한 교내 프로그램이다.  
이 프로그램은 학기 말에 심사를 통해 우수 팀을 선정하는데, 심사 기준에 멘티들의 3-in 이수 현황도 포함된다.  
따라서 멘티들이 웹 페이지를 통해 본인들의 이수 현황을 기록하고 확인 할 수 있게 하고자 본 프로젝트를 기획하였다.  

<br/>

## 🔧 Tech

FE : 
```
React.js
```
BE & Server :
```
Node.js (v12.18.2)
```
DBMS :
```
MySQL (v8.0.19 for osx10.15 on x86_64 (Homebrew))
```  

<br/>


## 🏃‍♂️ Getting Started

~~~bash

when run server './toc'

$ npm run dev

when run client './toc/client'

$ npm start

~~~  

<br/> 


## 📖 Dependencies  

Server :   

~~~json

"dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "mysql": "^2.18.1",
    "mysql2": "^2.2.5",
    "nodemon": "^2.0.7",
    "sha256": "^0.2.0"
}

~~~

Client :  

~~~json
"dependencies": {
    "@testing-library/jest-dom": "^5.11.9",
    "@testing-library/react": "^11.2.5",
    "@testing-library/user-event": "^12.8.3",
    "axios": "^0.21.1",
    "cors": "^2.8.5",
    "gh-pages": "^3.1.0",
    "http-proxy-middleware": "^1.0.6",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-redux": "^7.2.3",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.3",
    "react-table": "^7.6.3",
    "redux": "^4.0.5",
    "redux-promise": "^0.6.0",
    "redux-thunk": "^2.3.0",
    "web-vitals": "^1.1.1"
}
~~~