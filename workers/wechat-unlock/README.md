# WeChat Unlock Worker

This Worker handles:

- `GET /wechat/callback`: WeChat developer mode verification
- `POST /wechat/callback`: reply with the current 10-minute unlock code
- `POST /api/unlock`: validate a code and return the article key

## Required bindings

- `PROTECTED_KEY_KV`

## Environment variables

- `WECHAT_TOKEN`
- `DYNAMIC_CODE_SECRET`
- `ALLOWED_ORIGIN`

## Optional environment variables

- `WECHAT_KEYWORD`
- `SITE_URL`

## KV format

- key: `article-key:<slug>`
- value: real article key from frontmatter `password`

Examples of supported slugs:

- `技术教程/示例文章`
- `技术教程/示例文章.md`
- `dao/掐指神通术（术）`
