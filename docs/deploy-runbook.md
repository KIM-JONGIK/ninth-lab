# GitHub Actions + Netlify deploy runbook

## Current target

`9회말 연구소` is a static site. The source root is the repository root. The public deploy output is generated into `dist/`, and `netlify.toml` sets `publish = "dist"`.

Current Netlify beta URL:

```text
https://ninth-lab-jkim0428.netlify.app
```

GitHub repository:

```text
https://github.com/KIM-JONGIK/ninth-lab
```

Production deploys run from `.github/workflows/netlify-deploy.yml` whenever `main` receives a push.

## Check readiness

```powershell
node tools/verify-static-launch.mjs
node tools/check-deploy-readiness.mjs
```

## Required GitHub Actions secrets

Store these in `KIM-JONGIK/ninth-lab` under `Settings > Secrets and variables > Actions`.

- `NETLIFY_AUTH_TOKEN`: Netlify personal access token for the deploy account.
- `NETLIFY_SITE_ID`: `dfcd6703-76fe-4463-9c75-7d09cee47926`

CLI setup without printing token values:

```powershell
gh secret set NETLIFY_SITE_ID --repo KIM-JONGIK/ninth-lab --body "dfcd6703-76fe-4463-9c75-7d09cee47926"
gh secret set NETLIFY_AUTH_TOKEN --repo KIM-JONGIK/ninth-lab
```

## GitHub push

```powershell
git remote add origin https://github.com/KIM-JONGIK/ninth-lab.git
git push -u origin main
```

If the remote already exists:

```powershell
git push -u origin main
```

## Automatic Netlify deploy

The workflow checks out the repo, verifies source files, builds the public `dist/` directory, verifies that only public files are present, then deploys to Netlify with:

```text
npx --yes netlify-cli deploy --prod --dir dist
```

The token and site ID come only from GitHub Actions Secrets.

Watch the latest run:

```powershell
gh run list --repo KIM-JONGIK/ninth-lab --limit 5
gh run watch --repo KIM-JONGIK/ninth-lab <run-id> --exit-status
```

## Local-only files

`.netlify/`, `.env*`, `node_modules/`, logs, docs, tools, repository docs, and GitHub workflow files are not copied into `dist/`. Keep deploy tokens in GitHub Secrets only, not in repository files.

## Known blocker

Automatic deploy is not ready until both GitHub Actions Secrets exist and the first workflow run on `main` passes.
