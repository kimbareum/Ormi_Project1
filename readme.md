## 이스트소프트 오르미 백엔드 부트캠프 프로젝트 1

### 주제 : ChatGPT를 이용해서 여행계획을 세워서 카드형태로 출력해주고, 하단에 여행관련 질문을 받는 챗봇을 만들어서 사용할 수 있도록 하기.

### 개인 목표

1. 바닐라 HTML, CSS, JS로 웹페이지의 기능을 구현하기.

2. 화면의 슬라이드나 챗봇을 숨기는 동작, 애니메이션 등도 바닐라 JS와 CSS만을 이용해서 구현하기.

3. JS 코드를 최대한 모듈화하고, 역할별로 파일을 분리해서 관리하기.

4. API 와의 통신을 통해 결과값을 주고받기.

5. 주고 받은 결과값에서 예외처리를 확실하게해서 견고한 코드 만들기.

6. CSS에서 flex를 활용해서 깔끔한 화면을 만들기.

7. chatGPT에서 원하는 결과값을 얻기위해 AI에게 입력값을 정확하게 주는 방법 알기.

### 폴더 구조

```shell
|   index.html
|
\---esset
    +---css
    |       style.css
    |
    +---font
    |
    +---img
    |
    \---js
        |   main.js
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
        |   |       HideButton.js
        |   |
        |   +---header
        |   |       SlideButton.js
        |   |
        |   \---slide
        |       |   PlanGenerator.js
        |       |   PlanViewer.js
        |       |
        |       +---PlanGenerator
        |       |   |   GeneratorApi.js
        |       |   |   GeneratorForm.js
        |       |   |   LoadingScreen.js
        |       |   |
        |       |   \---form
        |       |           EndDate.js
        |       |           Extra.js
        |       |           StartDate.js
        |       |           Target.js
        |       |
        |       \---PlanViewer
        |               CardBox.js
        |               PlanBox.js
        |
        +---data
        |       api_data.js
        |       img_data.js
        |
        \---utils
                data_record.js
                open_ai_api.js
```
