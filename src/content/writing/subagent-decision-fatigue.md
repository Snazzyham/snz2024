---
title: "Subagent Decision Fatigue"
date: "2026-10-24"
draft: false
---

If you're a reader of this blog, you'd know I've been spending a lot of time lately playing with AI, and delving into the world of agents. 

My first issue was tooling, big surprise. I've always defaulted to minimal tooling, stuff that just gets out of the way. That's why herdr appealed to me so much. Herdr + OMP ended up being the perfect combination for me. Well, almost perfect. 

After having used it for a while, I started to think that maybe I could build a skill to handle subagents for me, instead of manually running things in different tasks. This was maybe 2 months ago. I had heard of people using things like paperclip to basically build "teams of AI agents", and of course people who used hermes with kanban mode, but stuff like that didn't appeal to me due to the lack of control, and my usual hurdle of wanting to learn a whole new system when mine was mostly working great. 

20 minutes after having the idea it was set up and working. I could tell my main task to delegate plans to Sol, delegate reviews to Opus, delegate searches to DeepSeek. 

Eventually having agents wasn't the hurdle anymore, which agent to use was the big hurdle. That's when I developed [my benchmark](https://snazzyham.com/bench). I basically went through all of my chat histories and built out "roles" or "testing tracks". Basically I told my agent, read through all my old conversations, figure out the things I do the most. Took a couple of days of back and forth, discussing plans for the best kind of tests, that would get me results that mattered for my specific use cases. Eventually I got to a point where my benchmark was a clear indicator of which tool would be used for what. Need a plan, 6.1 Sol. Need a search? DeepSeek v4.1 flash. Problem solved. As always, that brought out a new problem. 

I had just built [pfin](https://pfin.snazzyham.com) and while I had a great time building it with this "agentic team", I didn't have a great way to manage them when I wasn't at my desk. I already had Hermes set up from the pfin and [logbook](https://logbook.snazzyham.com) work I had done, but it just felt a bit too clunky (and not to mention risky) to try and manage my omp sessions. The closest I could get was using Termux on my phone via Tailscale, which was ugly as hell. On my laptop it worked okay over SSH, although latency was quite bad, but the mobile UX really wasn't there. 

That's when the idea for [Whistle](https://whistle.snazzyham.com) was born. Whistle, cause herders use whistles to herd their sheep. Clever, thanks for that Opus 5.5. Anyway, the idea for Whistle started off simple - let me view my omp sessions as chats on the phone when I'm away from the house. It worked so well, that I just kept building on top of it,  and now I do most of my desktop work in whistle itself, even on the same machine that is running herdr and omp. They're just the invisible backends to the Whistle frontend. As I'm typing this blog post, Whistle is open on the split screen, with 5 new features being worked on for Whistle itself. Real meta.  

With that problem solved and out of the way, we looped back to the initial problem. While working on Whistle, I started getting decision fatigue. I had all these roles and agent names. **@lead** for my main agent, the orchestrator. **@plan, @digest, @smol, @scout, @patch, @build, @heavy**. All doing slightly different things, a lot of them with model overlap just at different thinking levels. _**@scout** and **@patch** were both GPT 6 Luna, one at low and one at high_. It was getting increasingly more difficult to decide who should do what. I know my orchestrator was supposed to be the one to figure it out, but he just kept defaulting to **@heavy**, blowing up my Claude 5-hour window each time. 

This is also around the time that I've been watching VisionQuest. Keen eyed readers among you will have noticed that I like naming things with pop culture references. My PC, Laptop and Macbook are named Caraxes, Syrax and Arrax _(iykyk)_. The Otterdev review bot is named **Stuart Minkus** while the monitoring bot is named **The Ancient One** and our documentation bot is **Clippy**. My work hermes bot is named **Roddy Ho**. So yeah, pretty obvious I watch a lot of TV and movies, and that finds its way into my life in more ways than one. So it only made sense to start naming my agents that way too. And, VisionQuest being a literal show about AI agents, how could I not? 

After a bit of deliberation and looking at previous tasks, I identified a few key roles and models that fit my flow the best. 

**@Vision:** Claude Opus 5.5 (low); the leader, the orchestrator. Good enough to do most tasks on his own, but that would take too much out of his synthezoid processing (my claude 5-hour window). 

**@Jarvis:** GPT 6.1 Sol (high); reliable and not too expensive. Almost as good as Vision, great at writing plans, security stuff, can do execution on his own for more intense tasks, but also good at delegating. 

**@Friday:** GPT 6 Luna; Basically a do-it-all like Jarvis, but much more available (way cheaper for me to run). Good at finding things, discovery, building, grunt-work. 

**@Edith:** DeepSeek v4.1 Flash; The Wildcard. On a good day, even more capable than vision himself. Also the one most likely to shit the bed and set the house on fire. 

So yeah, between these 4 roles, they cover all the other multiple roles I had before, and it also makes the conversation much more fun. I'll be working on the task and Vision will say "I've sent Friday out to build x and y, but z is more complex so I've asked Jarvis to take a look at that, and he'll be checking in with me for any major decision. I'll decide if it needs to get elevated to you." And me being untrusting when it comes to AI, I can still go into the individual tasks and check how it's going. 

Who knows if I end up changing agent names again, this is the third time since I made that herdr skill after all. However, with the amount of fun I'm having right now, these might just stick. 