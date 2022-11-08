# cloudflare-worker-github-to-slack

> Cloudflare Worker to handle Github Webhook and post to Slack Channel

I have an issue about notification when someone post a new discussion (via Giscus.app) but I don't received any notification, so I decided to send a notification via github webhook by using cloudflare worker as a server and passing the response to my slack channel.

#### There are 2 options

1. Use Github App in Slack channel and subscribe a repo.
2. Use Github Webhook API (Cloudflare Worker)


## Method 1 : Cloudflare Worker Github Webhook to Slack

#### Prerequisites

Add 2 environment variables in workers (Workers -> Settings -> Variables)

- `GITHUB_SECRET` is a secret for your github webhook
- `SLACK_WEBHOOK_URL` is your slack incoming webhook

---

## Method 2 : Github App in Slack

#### TLDR

```
/github subscribe owner/repo discussions
```

Install Github and add Slack App to your github user/organization

```
# invite Github to slack channel
/invite @Github

# subscribe to your repo's discussions
/github subscribe owner/repo discussions
```


## References

- [Sign requests](https://developers.cloudflare.com/workers/examples/signing-requests/)
- [Function to verify X-Slack-Signature header in a Cloudflare Worker](https://gist.github.com/phistrom/3d691a2b4845f9ec9421faaebddc0904)
- [Get notifications of Discussions in slack (or equivalent)](https://github.com/community/community/discussions/2844)
