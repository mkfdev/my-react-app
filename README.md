#### version

node v.14.18.1

npm v.6.14.15

node-sass v.4.14.0

---

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
