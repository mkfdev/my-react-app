# 목차

[1. version정보](#list-1)

[2. 라우터 구성](#list-2)

[3. 라이브러리](#list-3)

[4. API](#list-4)

[5. 컴포넌트 스타일링](#list-5)

# 프로젝트 소개

- 사용자 로그인 / 로그아웃,
  펫 정보 등록 및 조회,
  펫 사진/동영상 조회 및 검색 기능을 구현한 리액트 프로젝트

### 1. version 정보 <a id="list-1"></a>

node v.14.18.1

npm v.6.14.15

node-sass v.4.14.0

#### node와 node-sass 호환성 오류

- 호환 버전 확인 후 버전 맞춰줌

  호환 버전 확인: https://juntcom.tistory.com/167

- npm downgrade

  ```
  npm install -g npm@버전
  ```

- nvm 노드 버전 관리

  nvm설치(다운그레이드 진행 중 오류로 v1.1.7으로 설치)

  https://github.com/coreybutler/nvm-windows/releases/tag/1.1.7

  ```
  $ nvm version
  $ nvm ls
  $ nvm use [버전]
  ```

### 2. 라우터 구성 <a id="list-2"></a>

$ yarn add react-router-dom

| path      | component | role                                         |
| --------- | --------- | -------------------------------------------- |
| /         | Home      | 포트폴리오 메인 - 프로젝트 소개              |
| /login    | Login     | 펫 프로젝트 로그인 페이지                    |
| /register | Register  | 펫 프로젝트 회원가입 페이지                  |
| /petInfo  | PetInfo   | 펫 프로젝트 메인 페이지 (Pet 조회,등록,수정) |
| /search   | PetSearch | 펫 이미지 동영상 조회 (api 데이터 연동)      |

### 3. 라이브러리 <a id="list-3"></a>

raect-hook-form(v7), ANTD, Firebase(v9), axios, redux, react-icons, sass-loader, moment, redux, redux-thunk, redux-promise

### 4. API <a id="list-4"></a>

REST API

#### Dog API Service

| HTTP Method | URL            | 목적            |
| ----------- | -------------- | --------------- |
| get         | /images/search | Dog 이미지      |
| get         | /breeds        | Dog breeds data |

- query
  - limit: 이미지 개수
  - breed_ids: Dog breeds에 따른 id값

#### Cloudinary - image uploader

| HTTP Method | URL                       | 목적         |
| ----------- | ------------------------- | ------------ |
| post        | /[cloud_name]/imageupload | image upload |

### 5. 스타일링(SCSS) <a id="list-5"></a>

#### SCSS 또는 postCSS 사용

### 구조

src

ㄴ components (각 컴포넌트 폴더 별 스타일 파일 생성)

ㄴ styles (믹스인, 공통 scss 파일 생성)

### 커스터마이징

1. 모든 scss 파일에서 styles/\_variables.scss를 로드하도록 설정

2. styles폴더 내의 scss파일을 절대 경로로 접근할 수 있도록 설정

   => styles 폴더 외부에서 @import 'form.scss'; 가능

### 설정 커스터마이징

$ yarn add node-sass@4.14.1

$ yarn eject

### yarn eject?

eject는.. 해당 프로젝트에 숨겨져 있는 모든 세부 설정을 밖으로 추출해주는 명령어.

sass-loader 커스터마이징할 때 사용, config 디렉터리가 생성됨

### styles 디렉토리 기준 절대 경로를 사용하여 스타일 불러오게 설정하기

test: sassRegex에서 concat을 통해 sass-loader 부분 수정

```javascript
{
  test: sassRegex,
  exclude: sassModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 3,
      sourceMap: isEnvProduction
        ? shouldUseSourceMap
        : isEnvDevelopment,
    }).concat({
      loader: require.resolve('sass-loader'),
      options: {
        sassOptions: {
          includePaths: [paths.appSrc + '/styles']
        },
        sourceMap: isEnvProduction
        ? shouldUseSourceMap
        : isEnvDevelopment,
      }
    }),
  sideEffects: true,
},
```

### scss파일을 불러올 때 마다 \_variables.scss 포함시키기

data옵션을 설정해준다

[Error 수정]

(버전) sass-loader": "^10.0.5

(해결) prependData -> additionalData로 적용

```javascript
additionalData: `@import '_variables'`;
```
