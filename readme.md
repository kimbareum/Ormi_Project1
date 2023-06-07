## 이스트소프트 오르미 백엔드 부트캠프 프로젝트 1 - HTML CSS JAVA와 chatGPT를 사용한 웹페이지 만들기

### 주제

부트캠프에서 제공된 openAI API(chatGPT)를 이용해서 할 수 있는 프로젝트에 무엇이 있을까 고민하던 중, chatGPT 본연의 기능에 가까운 챗봇 기능과, chatGPT의 답변을 가공해서 사용하는 응용 기능을 모두 구현하고 싶다는 생각이 들었다.
그런 방향의 고민끝에, 여행의 일정과 조건을 작성하면, 일정에 맞는 계획을 카드 형태로 보여주고, 화면 구석에 있는 채팅창 아이콘을 클릭하면 챗봇이 열려서, 여행의 일정이나 조건, 여행계획에 대한 질문들을 할 수 있는 서비스를 만들게 되었다.

### 프로젝트의 목표

1. 바닐라 HTML, CSS, JS로 SPA 웹페이지를 구현한다.
2. 클래스를 기반으로한 컴포넌트 구조로 웹페이지를 구현한다.
3. JS 코드들을 최대한 기능 단위로 모듈화 한다.
4. 웹 페이지의 요소들에 동적인 요소들을 추가해서 사용자에게 피드백을 준다.
5. API 와의 통신을 하고, 결과값에 대한 예외처리를 한다.
6. chatGPT AI에서 원하는 결과값을 얻기 위한, 입력값을 주는 방법을 확인한다.
7. CSS에서 flex를 활용해서 깔끔한 화면을 만든다.
8. 모바일 환경에서도 사용이 가능하도록 CSS를 조정한다.

### 배포주소

https://kimbareum.github.io/Ormi_Project1/

### 개발 환경 및 개발 기간

2023년 5월 30일 ~ 2023년 6월 10일

### 사용 예제

-   여행계획 생성 및 뷰어 기능

    -   여행계획 생성기에서 목표 여행지와, 여행지에 도착하는시간, 여행지에서 떠나는시간을 넣고 생성을 누르면, openAI API를 통해서 얻어진 여행계획이 뷰어 슬라이드에 카드 형식으로 나타난다.

    -   슬라이드간의 전환은 우측상단의 버튼이나 드래그, 스와이프로 가능하다.

-   여행 챗봇기능

    -   우측하단의 파란색 메세지 아이콘을 누르면 여행관련 질문에 응답하는 챗봇을 이용할 수 있다.

    -   질문을 하고 챗봇을 접어둔 채로 API의 응답이 오면, 챗봇아이콘에 시각적인 피드백을 줘서 사용자에게 알린다.

### 세부 구현 기능

-   슬라이드 기능

    -   메인스크린을 section 2개를 가진 슬라이드 형태로 구성.
    -   버튼, 드래그, 스와이프를 통해 슬라이드를 전환.

-   여행계획 생성 기능

    -   여행의 목적지, 시작시간, 종료시간, 그외 특이사항을 입력하면 chatGPT를 통해 여행계획을 생성.
    -   여행의 목적지와 시작시간, 종료시간은 필수 입력요소로서 입력되지 않으면 입력되지 않은 곳을 포커스하고, 시각적으로 피드백.
    -   시작시간이 현재시간보다 빠르거나, 여행종료시간이 시작시간보다 빠를경우에도 잘못된 곳을 포커스하고, 시각적으로 피드백.
    -   textarea에서도 enter키로 submit이 가능하고, shift + enter키로는 줄바꿈이 작동하게 설정.
    -   버튼에 hover와 click에 따른 box-shadow의 차이를 줘서 동적인 버튼을 구성.
    -   API 응답을 대기하고 있을때는 입력 창 위에 예상시간과 로딩바를 표기.
    -   API 응답의 결과가 올바르지 않을때는 모달로 만든 경고창을 띄워서 생성이 제대로 되지 않았음을 안내.
    -   정상적으로 생성된 여행 계획은 로컬 스토리지에 저장.
    -   반응형으로 화면크기가 줄어들면 외부 배경을 없애서 자연스러운 화면을 구성.

-   여행계획 뷰어 기능

    -   최초 접속시에는 로컬스토리지에 데이터가 있는지 확인하고, 없다면 초기 화면을 렌더링.
    -   로컬 스토리지에 저장된 여행 계획을 불러와서 화면에 카드 형태로 렌더링.
    -   반응형으로 화면의 폭에 따라서 한줄에 표기되는 카드의 갯수를 조절.

-   여행 챗봇 기능

    -   화면 구석에 fixed된 채팅 아이콘으로 챗봇을 토글하게 만듬.
    -   질문하기를 누르면 값이있는지, 응답이 대기중이지 않는지 확인하고 API 요청.
    -   enter키로 submit이 가능하고, shift + enter키로는 줄바꿈이 작동하게 설정.
    -   API 응답을 대기중일때는 스크린에 로딩바를 띄워서 동적으로 피드백.
    -   API 응답이 실패했을때는 모달로 만든 경고창을 띄워서 답변이 정상적으로 만들어지지 않았음을 안내.
    -   화면이 렌더링될 때 마다 챗봇의 화면이 가장 아래로 내려가게 설정.
    -   fixed된 채팅아이콘에 hover시 커지는 효과와, API응답이 왔을때 움직이는 애니메이션을 줘서 동적인 버튼을 구성.

### 폴더 구조

```shell
|   index.html
|
\---src
    |   main.js
    |
    +---api
    |       open_ai_api.js
    |
    +---components
    |   |   App.js
    |   |   ChatBot.js
    |   |   Header.js
    |   |   Slide.js
    |   |
    |   +---chat_bot
    |   |       ChatApi.js
    |   |       ChatForm.js
    |   |       ChatScreen.js
    |   |       ToggleChatBot.js
    |   |
    |   +---common
    |   |       AlertModal.js
    |   |       Button.js
    |   |       common_boxes.js
    |   |       Input.js
    |   |       LoadingScreen.js
    |   |
    |   +---header
    |   |       SlideButton.js
    |   |
    |   \---slide
    |       |   PlanGenerator.js
    |       |   PlanViewer.js
    |       |
    |       +---plan_generator
    |       |       Footer.js
    |       |       GeneratorApi.js
    |       |       GeneratorForm.js
    |       |
    |       \---plan_viewer
    |               CardBox.js
    |               PlanBox.js
    |
    +---data
    |       api_data.js
    |       img_data.js
    |
    +---img
    |       chatbot_icon.png
    |       exchange.png
    |       generator_label.png
    |       generator_label_dark.png
    |       github-mark-white.png
    |       github-mark.png
    |       logo.png
    |       main_img.jpg
    |       plan_label.png
    |       plan_label_dark.png
    |       robot_icon.png
    |
    +---style
    |   |   style.css
    |   |
    |   \---font
    |           Nanum_barun_gothic.ttf
    |           Nanum_barun_gothic_bold.ttf
    |           ohmyu_daibbm.ttf
    |
    \---utils
            data_record.js
```

### 개발 과정
