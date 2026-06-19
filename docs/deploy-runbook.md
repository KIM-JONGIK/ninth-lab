# GitHub + Netlify deploy runbook

## Current target

`9회말 연구소` is a static site. The deploy root is the repository root, and `netlify.toml` sets `publish = "."`.

## Check readiness

```powershell
node tools/verify-static-launch.mjs
node tools/check-deploy-readiness.mjs
```

## Required logins

```powershell
gh auth login
npx netlify-cli login
```

## First GitHub push

```powershell
gh repo create ninth-lab --public --source=. --remote=origin --push
```

If the repo already exists:

```powershell
git remote add origin https://github.com/JKIM0428/ninth-lab.git
git push -u origin main
```

## Netlify deploy

After Netlify login, connect the GitHub repo in the Netlify dashboard or deploy from CLI:

```powershell
npx netlify-cli deploy --prod --dir .
```

## Known blocker

As of the last local check, GitHub CLI and Netlify CLI were not logged in. Anonymous Netlify deploy worked, but it produced a password-protected drop site rather than a normal public GitHub-connected deploy.
