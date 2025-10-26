# hansschenker.github.io — RxJS Project Index

A simple static index that lists and links to your RxJS project pages hosted under `hansschenker.github.io/<repo>/`.

## Add projects
Edit `projects.json` and append entries like:
```json
{
  "name": "RxJS Operator Finder",
  "repo": "hansschenker/rxjs-operator-finder",
  "url": "https://hansschenker.github.io/rxjs-operator-finder/",
  "tags": ["rxjs", "operators", "tooling"],
  "description": "Find RxJS operators by order, time/value, and intent ('further')."
}
```

## Local preview
Just open `index.html` in a browser.

## Deploy to GitHub Pages (User Site)
1. Create a repo named `hansschenker/hansschenker.github.io` (public).
2. Push these files to `main`.
3. In the repo, go to **Settings → Pages** and choose **Source: GitHub Actions**.
4. The included workflow will build and publish automatically.
