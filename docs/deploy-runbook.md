# GPT Sites primary + GitHub Pages backup deploy runbook

## Current target

`9회말 연구소`는 저장소 루트의 정적 사이트입니다. GPT Sites를 대표 주소로 운영하고, 공개 파일은 `tools/build-public.mjs`가 `dist/`에 만든 뒤 GitHub Pages 전용 워크플로가 백업 주소에 자동 배포합니다.

GPT Sites 대표 URL:

```text
https://ninth-lab.kji940428.chatgpt.site/
```

GitHub Pages 백업 URL:

```text
https://kim-jongik.github.io/ninth-lab/
```

GitHub repository:

```text
https://github.com/KIM-JONGIK/ninth-lab
```

GitHub Pages 백업 배포는 `.github/workflows/github-pages-deploy.yml`이 `main` 푸시마다 실행합니다. GPT Sites는 같은 검증된 커밋으로 별도 버전을 저장해 대표 주소에 게시합니다.

## Token policy

GitHub Pages 배포에는 Netlify 토큰이나 별도 서비스 키를 사용하지 않습니다. 워크플로에 선언된 `pages: write`와 `id-token: write` 권한 및 GitHub가 발급하는 일회성 `GITHUB_TOKEN`만 사용합니다.

`.github/workflows/netlify-deploy.yml`은 `workflow_dispatch`만 남긴 수동 비상용입니다. `main` 푸시로는 실행되지 않습니다.

## One-time Pages setup

저장소가 public인지 확인하고 Pages의 배포 소스를 GitHub Actions로 설정합니다.

```powershell
gh repo view KIM-JONGIK/ninth-lab --json visibility
gh api --method POST repos/KIM-JONGIK/ninth-lab/pages -f build_type=workflow
```

이미 Pages 사이트가 만들어져 있다면 두 번째 명령은 생략합니다. 웹 화면에서는 `Settings > Pages > Build and deployment > Source > GitHub Actions`와 같은 설정입니다.

## Check readiness

```powershell
node tools/verify-static-launch.mjs
node tools/verify-content-safety.mjs
node tools/verify-phrase-deck.mjs
node tools/verify-time-scene.mjs
node tools/verify-asset-provenance.mjs
node tools/build-public.mjs
node tools/verify-public-build.mjs
node tools/check-deploy-readiness.mjs
```

## Deploy

```powershell
git push origin main
gh run list --workflow github-pages-deploy.yml --branch main --limit 5
gh run watch <run-id> --exit-status
```

워크플로는 소스·콘텐츠·문구 덱·자산 출처를 검사하고 `dist/`를 만든 뒤 `actions/upload-pages-artifact`와 `actions/deploy-pages`로 배포합니다.

## Public artifact

`dist/`에는 HTML, CSS, JavaScript, PWA 파일, 공개 자산, 법적 안내, `.nojekyll`만 포함합니다. `docs/`, `tools/`, `README.md`, `.github/`, `.env*`, `.netlify/`, 저장소 설정 파일은 공개 산출물에 포함하지 않습니다.

GitHub Pages는 `_headers` 규칙을 적용하지 않습니다. 이 파일은 향후 Cloudflare Pages 전환과 수동 Netlify 비상 배포를 위해 공개 산출물에 유지합니다.
