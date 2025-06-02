# image-compat-checker

## How to use this

This checker script runs on a cron. To see the results just go [here](https://github.com/bnussman/image-compat-checker/actions/workflows/check.yaml) and view the output of the latest run.

I can also manually trigger the workflow run on request.

You can also run this locally, but you must supply a Linode API token in your env (`LINODE_TOKEN`). You can use a `.env` file or put it in your env some other way.

## To run / develop this locally

Install bun first, then....

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.15. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
