# 9회말 연구소 무료 웹 베타 출시 가이드

이 앱은 서버 없는 정적 HTML/CSS/JavaScript 웹앱입니다. 로그인, 업로드, 결제, 실시간 데이터가 없으므로 유료 기능을 붙이기 전까지 GitHub Pages 무료 정적 호스팅으로 공개 베타를 운영합니다.

## 현재 배포 순서

1. GitHub Pages
   - 현재 주 배포처입니다.
   - public 저장소와 GitHub Actions 내장 권한만 사용하며 외부 배포 토큰이 필요 없습니다.
   - 공개 URL은 `https://kim-jongik.github.io/ninth-lab/`입니다.

2. Cloudflare Pages
   - 광고, 업체 홍보, 거래 중개 같은 수익 기능을 붙이기 전에 이전을 검토합니다.
   - 현재 `dist/`와 `_headers` 구조를 그대로 사용할 수 있습니다.

3. Netlify
   - 자동 배포는 중지했습니다.
   - `.github/workflows/netlify-deploy.yml`의 수동 실행만 비상용으로 유지합니다.

## 출시 전 체크리스트

- `index.html`, `styles.css`, `app.js`, `manifest.webmanifest`, `service-worker.js`, `assets/`, `legal/`, `404.html`, `robots.txt`이 배포 결과에 있어야 합니다.
- 공개 배포물은 `tools/build-public.mjs`가 만드는 `dist/`만 사용합니다.
- GitHub Pages용 `.nojekyll` 파일이 `dist/`에 생성돼야 합니다.
- `docs/`, `tools/`, `README.md`, `.github/`, 환경 파일은 공개 산출물에 포함하지 않습니다.
- `legal/privacy.html`과 `legal/terms.html` 링크가 `/ninth-lab/` 하위 경로에서 열려야 합니다.
- 서비스 워커 캐시 이름과 HTML의 `?v=` 버전이 함께 올라가야 합니다.
- GitHub Pages는 `_headers`를 적용하지 않습니다. 이 파일은 향후 Cloudflare Pages 전환용으로 유지합니다.
- `#card=`와 `#ask=` 공유 링크가 Pages 하위 경로에서 유지되는지 확인합니다.
- 첫 공개 문구에는 `비공식 팬메이드`, `중계자료 없음`, `공식 기록 아님`을 유지합니다.
- 광고, 업체 홍보, 중고거래 탭은 공개 베타에는 숨깁니다.
- 공개 후 문의를 받을 최소 채널을 정하기 전에는 자동 신고 접수처럼 보이는 문구를 쓰지 않습니다.

## 작은 베타 운영 기준

- 첫 공개는 지인과 소규모 커뮤니티의 테스트 링크 공유 수준으로 제한합니다.
- 실제 선수명, 구단명, 로고, 중계 캡처를 유도하는 피드백이 나오면 기능을 늘리기 전에 필터와 문구를 먼저 보강합니다.
- 카드 생성 수, 체류 시간, 공유 횟수 같은 서버 지표는 현재 수집하지 않습니다.
- GitHub Pages 방문 과정에서 GitHub가 처리하는 기술 정보와 앱 자체의 로컬 저장을 개인정보 안내에서 구분합니다.
- 광고·중개 등 수익 기능을 도입하기 전 Cloudflare Pages 또는 유료 상업 호스팅으로 이전하고 고지를 다시 검토합니다.
