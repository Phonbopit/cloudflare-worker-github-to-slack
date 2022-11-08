# cloudflare-worker-github-to-slack

> Cloudflare Worker to handle Github Webhook and post to Slack Channel

I have an issue about notification when someone post a new discussion (via Giscus.app) but I don't received any notification, so I decided to send a notification via github webhook by using cloudflare worker as a server and passing the response to my slack channel.


## Prerequisites

Add 2 environment variables in workers (Workers -> Settings -> Variables)

- `GITHUB_SECRET` is a secret for your github webhook
- `SLACK_WEBHOOK_URL` is your slack incoming webhook

## References

- [Sign requests](https://developers.cloudflare.com/workers/examples/signing-requests/)
- [Function to verify X-Slack-Signature header in a Cloudflare Worker](https://gist.github.com/phistrom/3d691a2b4845f9ec9421faaebddc0904)
