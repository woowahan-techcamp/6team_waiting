# 6team_waiting

#### 의사결정 방법
 * 어떠한 의견에 팀원의 의견이 동일하게 나눠질 경우 제비뽑기로 결정(제비뽑는 사람은 가위바위보로 정한다.)
 * 의견이 제시될 경우, 모든 팀원은 의견에 대한 본인의 의견을 발언할 의무


#### 회의 방식과 시간
 1. 부스트 미팅(주간 계획) 매주 월요일 - 월요일 주간 미팅(오전 13:00 ~ 14:00)
    - 월요일 오후 미팅에 주간 계획을 얘기하면서 Sprint 시작을 위한 backLog를 작성한다.
    - 월요일에 해당 backLog를 기반으로 스크럼 보드의 포스트잇을 작성한다. 
    - 월요일에 Github 프로젝트 보드를 업데이트한다.
 2. 데일리 미팅 - 매일 오전 미팅(30분 내외), 코드리뷰 30분
 3. 포스트잇 활용(todo List 관리) 
![포스트잇 예제](https://dl.dropboxusercontent.com/s/04kxbac26x669aa/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202017-08-01%20%EC%98%A4%ED%9B%84%205.39.45.png)
 4. 회의 시작할 때는 알람을 맞추고 시작!
 5. 코딩 중 막히는 부분에 대한 질문은 가능한 오후 5시 이후로
 6. 브랜치 생성은 회의를 통해 결정


#### Todo List 관리
 * 우선순위로 설정된 유저스토리를 기능구현 단위로 나누어 이슈를 만든다
    > [User Story] 1km 이내 주변 식당을 지도로 볼 수 있다.
    >> [Issue] 자기위치를 지도에서 찍기, 1km내에 식당 표시 등
 * 스크럼 보드는 주 단위로 해결해야할 User Story와 그에 해당하는 backLog를 포스트잇으로 작성
 * 프로젝트 보드도 주단위로 스크럼 보드와 동일한 방식을 써서 만든다
    


#### 집중업무시간
 * 점심 이후 부터 다섯시 전!!


#### 코딩스타일
 * 커밋 메세지는 한글로
 > ex) [이슈#3] 로그아웃 기능 구현
 * 커밋 메세지 빈도는 자주 작은 기능 기준으로 작성
 * PullRequest를 통한 이슈관리
    - Web : https://github.com/airbnb/javascript
    - iOS : https://github.com/raywenderlich/swift-style-guide
 

 #### 짝프로그래밍
 * 오후 5시 이후 멘붕이 온 팀원을 도와줄 때 활용
 * 한 명이 기능 구현을 하는 것이 좋을 경우 서로 협의해서 활용


 #### 협업툴

 * Github(코드관리)
 * 코드 관련 이슈는 gitter에서
 * 일반적인 이슈는 slack에서


 #### 기획서 초안(작성중)
[기획서 ppt](https://docs.google.com/presentation/d/1tO2MAt91zLZ4XJ8BjgEq69rn6emBIgcHJ56IK1axbRg/edit?usp=sharing)

[기획서 문서](https://docs.google.com/document/d/1TcUyQYjvQZ4czte1YkAl4l8rGsATRYmtd5_T4IUlcrc/edit?usp=sharing)

[백로그](https://docs.google.com/spreadsheets/d/1sA4d282j67KcqoBuMlROVYIhCIuDnVJyANbYvu1r9-4/edit?usp=sharing)

[RestAPI 설계](https://github.com/haeungun/WoowaTechRestApi)


 #### 식당데이터 관리 툴
 
 [RestaurantsCrawler](https://github.com/buk4130/RestaurantsCrawler)
