# 경제의 원리 · 웹 학습실

**공개 사이트: https://emelmusekor.github.io/261031economy/**

「경제의 원리 — 그림·도식 전체개정판」 185쪽을 바탕으로 만든 자율학습 웹사이트입니다. 교재의 흑백 삽화와 편집 디자인을 유지하면서, 읽기·검색·조건 조작·해설을 연결했습니다.

## 구성

- 11개 주제, 본문 170개 읽기 항목. 표지·목차·구분·참고 페이지는 제외하고 원본 쪽수를 표시합니다.
- 핵심 질문 24개를 연결한 첫 읽기 경로.
- 12개 실험: 예산제약, 시장균형, 매출, 손익분기점, 복리·구매력, 레버리지, 은행 장부, 보험, 조세귀착, 물가, 고용, 비교우위.
- 개념·질문·본문·원본 쪽수 검색. `/` 또는 Ctrl/Cmd+K로 검색창을 엽니다.
- 선택 후 바로 해설을 읽는 생각해 보기. 점수와 선택은 저장하지 않습니다.
- 한국은행·ECOS·KOSIS·KDI·경제배움e+·DART·KRX 등 공식 자료 바로가기 12개.
- 모바일·키보드 조작·동작 줄이기·인쇄 스타일 지원.

## 자료와 가정

원문을 웹 읽기에 맞춰 요약·재구성한 자료입니다. 교재의 개념과 수치 예시를 유지하고 각 항목에 출처 쪽수를 붙였습니다. 실험의 조절 범위, 모형, 일부 보조 도식은 웹 학습용 확장이며 각 실험의 '가정과 범위'에서 별도로 설명합니다. 실제 경제 전망, 현행 규제 안내나 투자 권유가 아닙니다.

## 개인정보

회원가입, 서버 제출, 학습기록 저장, localStorage/sessionStorage, 광고, 분석용 추적 스크립트, 외부 웹폰트가 없습니다. 입력은 현재 브라우저 화면에서만 계산됩니다. GitHub Pages 및 연결된 외부 사이트의 일반적인 접속 기록·개인정보 처리는 해당 서비스 정책을 따릅니다.

## 파일 구조

- `index.html`, `styles.css`: 공통 화면과 반응형 편집 디자인
- `app.js`: 경로, 읽기 화면, 검색, 도식, 자료실
- `labs.js`: 순수 계산 함수와 실험 화면
- `content/part-1.js` ~ `part-3.js`: 원본 쪽수별 본문
- `content/catalogue.js`: 주제·표·질문·실험·공식 자료 연결
- `assets/`: 원본 삽화의 경량 웹 이미지와 아이콘
- `scripts/verify.cjs`: 원문 범위·연결·계산 회귀검사

## 실행과 검사

별도의 패키지 설치나 빌드 과정 없이 실행됩니다.

```sh
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000 열기
node scripts/verify.cjs
```

검사기는 170개 원문 항목의 누락·중복, 주제와 실험 연결, 12개 실험의 입력 범위 576개 조합, 대표 계산을 확인합니다. 최초 화면 검수에서는 Chromium의 1440·390·320px에서 597개 경로 검사를 수행했고 본문 가로 넘침과 JavaScript 오류가 없었습니다. 개별 넓은 도식과 표는 자체 영역에서 가로로 이동할 수 있습니다.

## 게시

`main`은 편집용 원본, `gh-pages`는 공개용 브랜치입니다. 현재 GitHub Pages는 `gh-pages`의 루트에서 게시합니다. `main`에 편집한 내용은 다음과 같이 공개 브랜치에 반영합니다.

```sh
git switch main
git pull --ff-only origin main
node scripts/verify.cjs
git switch gh-pages
git pull --ff-only origin gh-pages
git merge --ff-only main
git push origin gh-pages
git switch main
```

`Verify learning website`는 main의 변경을 검사합니다. `Verify published website`는 수동 실행하거나 해당 워크플로 파일 변경 시 공개 주소의 파일이 저장소와 같은지 검사합니다. GitHub Actions의 `pages build and deployment` 성공을 확인한 뒤 배포본을 사용합니다.
