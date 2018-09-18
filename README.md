# BootBot
[![Depfu](https://img.shields.io/depfu/bottza/bootbot.svg?style=flat-square)](https://depfu.com/repos/bottza/bootbot)
[![GitHub release](https://img.shields.io/github/release/bottza/bootbot.svg?style=flat-square)](https://github.com/bottza/bootbot/releases)
[![Discord](https://img.shields.io/discord/490867255144611850.svg?style=flat-square)](https://discord.io/bottza)

A flexible moderation bot for server admins who want free time.

## Installation

```
$ git clone https://github.com/bottza/bootbot.git
$ cd bootbot
$ npm install
```

## Running

One of the following:
```
$ npm start
$ cach node main.js
```

## Development

One of the following:
```
$ npm run watch
$ nodemon main.js
```

## Comparison to PM2

Cach:
```
$ cach
Running `npm start`...
```
Ok. How do I stop it? `Ctrl-C` is intuitive...
```
^C
$ 
```
It worked!!!!

PM2:
```
$ pm2 start node main.js
[PM2] Spawning PM2 daemon with pm2_home=C:\Users\archmaster\.pm2
[PM2] PM2 Successfully daemonized
[PM2] Starting D:\Documents\Programmimg\BootBot\main.js in fork_mode (1 instance)
[PM2] Done.
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────┬───────────┬───────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ cpu │ mem       │ user  │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────┼───────────┼───────┼──────────┤
│ main     │ 0  │ fork │ 24268 │ online │ 0       │ 0s     │ 0%  │ 29.0 MB   │ felix │ disabled │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────┴───────────┴───────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app
 ```
 Wait AAAAAAAHHH so confusing! How do I know what's happening? How do I even stop it? It's not running in my terminal so I can't do `Ctrl-C`! *Reads help.* Sooo...
 ```
 $ pm2 stop 0
[PM2] Applying action stopProcessId on app [0](ids: 0)
[PM2] [node](0) ✓
┌──────────┬────┬──────┬─────┬─────────┬─────────┬────────┬─────┬────────┬───────┬──────────┐
│ App name │ id │ mode │ pid │ status  │ restart │ uptime │ cpu │ mem    │ user  │ watching │
├──────────┼────┼──────┼─────┼─────────┼─────────┼────────┼─────┼────────┼───────┼──────────┤
│ node     │ 0  │ fork │ 0   │ stopped │ 0       │ 0      │ 0%  │ 0 B    │ felix │ disabled │
└──────────┴────┴──────┴─────┴─────────┴─────────┴────────┴─────┴────────┴───────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app
 ```
 Well... it's stopped... but it's still showing up! Imma install `cach`.