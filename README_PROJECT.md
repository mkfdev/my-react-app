### 컴포넌트 스타일링 (SCSS)

#### scss, styled-component, classNames 라이브러리 사용

### 설정

$ yarn add node-sass@4.14.1

$ yarn eject

$ yarn add classnames

### yarn eject?

eject는.. 해당 프로젝트에 숨겨져 있는 모든 설정을 밖으로 추출해주는 명령어.

sass-loader 커스터마이징할 때 사용, config 디렉터리 생성됨

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

### scss파일을 불러올 때 마다 특정코드(utils.scss등 반복되는 코드) 포함시키기

data옵션을 설정해준다

[Error 수정]

(버전) sass-loader": "^10.0.5

(해결) prependData -> additionalData로 적용

```javascript
additionalData: `@import 'utils'`;
```

### classNames 라이브러리?

컴포넌트에서 조건부로 클래스를 설정. 클래스명 여러개로 작성가능

classname={classNames('title', { theme }, {myCondition: true })}

### 라우터 구성

$ yarn add react-router-dom

| path     | component | role                                       |
| -------- | --------- | ------------------------------------------ |
| /        | Home      | 프로젝트 소개, 프로젝트 시작 페이지        |
| /login   | Login     | 펫 프로젝트 로그인 페이지                  |
| /join    | Join      | 펫 프로젝트 회원가입 페이지                |
| /petInfo | PetInfo   | 펫 프로젝트 메인 페이지 (My Pet 조회 가능) |
