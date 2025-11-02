#!/usr/bin/env bash
set -euo pipefail
GITHUB_REMOTE="${GITHUB_REMOTE:-}"
COLLABS="${COLLABS:-}"
ROOT="$(pwd)"
if [ -f client/package.json ]; then
  node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('client/package.json'));p.scripts=p.scripts||{};p.scripts.dev=p.scripts.dev||'vite';p.scripts.build=p.scripts.build||'vite build';p.scripts.preview=p.scripts.preview||'vite preview';fs.writeFileSync('client/package.json',JSON.stringify(p,null,2))"
fi
if [ -d server ]; then
  (cd server && npm install)
  if [ -f server/seed.js ]; then
    (cd server && node seed.js) || true
  fi
fi
if [ -d client ]; then
  (cd client && npm install)
  (cd client && npm run build) || true
fi
ZIPNAME="google-calendar-clone-submission.zip"
rm -f "$ZIPNAME"
zip -r "$ZIPNAME" . -x "node_modules/*" "*/node_modules/*" ".git/*" "dist/*" >/dev/null 2>&1 || true
if [ -n "$GITHUB_REMOTE" ]; then
  if [ ! -d .git ]; then
    git init
    git add .
    git commit -m "Submission: Google Calendar Clone"
  else
    git add .
    git commit -m "Submission: Google Calendar Clone" || true
  fi
  git remote remove origin 2>/dev/null || true
  git remote add origin "$GITHUB_REMOTE"
  git branch -M main
  git push -u origin main --force
  if command -v gh >/dev/null 2>&1 && [ -n "$COLLABS" ]; then
    REPO_PATH="$(echo "$GITHUB_REMOTE" | sed -E 's#.*github.com[:/]+([^/]+/[^/.]+).*#\1#')"
    IFS=',' read -ra U <<< "$COLLABS"
    for u in "${U[@]}"; do
      gh repo add-collaborator "$REPO_PATH" --user "$u" || true
    done
  fi
fi
echo "$ZIPNAME created in $ROOT"
