---
title: "I built a native Android app. I've never written a line of Kotlin in my life."
date: "2026-06-07"
description: "My thoughts on the state of AI after building a native Android app."
seoTitle: "Building a Native Android App, and thoughts on the state of AI."
image: "./building-logbook/cover.png"
---
## And some of my thoughts on the state of the application development world.

If you've read anything on this blog before, you probably know that I consider myself a bit of a tech guy. I've been a web developer for about 15 years now. I've built terminal tools, internal web apps, dabbled with React Native. I know my way around a codebase. But there was always one thing that I just... never did. Native Android development. It sat there in the back of my head like an unsolved problem I'd accepted I was never going to solve. Too much to learn, too foreign, too far from what I already knew. I hadn't touched Java since university, which at this point is almost solid decade ago, and the whole ecosystem felt like moving to a country where I didn't speak the language. I knew it all existed; Kotlin, Gradle, etc. I just never even thought about what a development setup for that looked like before.

With AI getting to where it is today, I knew it was theoretically possible. But there's a big gap between knowing something is possible and actually sitting down and doing it. I'd used AI to build plenty of things before, but always in domains I understood. That gave me the confidence to know when the output was good, when it was wrong, and when I needed to push back. Native Android felt different. I was essentially flying blind.

This is the story of how a very specific hardware problem forced my hand.

## The problem with my workout setup

I have three modes of working out. Bike rides, walks, and the gym. For a while I had different apps handling each, which worked fine until it didn't. For the gym I was using Fitbod (shoutout Connected). Good app, but I started to resent the fact that I needed to be logged in and online for it to work properly, that and I was paying a subscription for AI features I never even used. I switched to RepCount because it was offline-first, Android native, no account required. That ticked most of my boxes.

For walks and bike rides I was using Google Fit, which is fine. But I was missing heart rate. I used to have a Xiaomi Mi Band for that, but I'm a watch guy. I wear a mechanical watch, I'm not putting a fitness band on the other wrist. So I started digging into alternatives and eventually found out that there are Bluetooth chest heart rate straps with open protocols. The kind you can just tap into. That opened up a door I hadn't expected.

Here's where things went sideways in the best possible way. I got excited about the idea of building an app around this, something that would pull from the chest strap, track my gym sessions, and handle cardio all in one place. No logins. No cloud sync to some server I don't control. Fully offline. I figured React Native would be the obvious path given my background.

Turns out the BLE API I needed isn't available in React Native. Full stop.

So my fallback - the thing that was supposed to make this approachable - was off the table before I even started. Which left me with one option. Go native.

## Opening Claude and figuring it out

I want to be clear about what "using AI to build this" actually looked like in practice, because I think there's a version of this story that gets told in a misleading way. It wasn't "I typed what I wanted and it just appeared." There was still a lot of thinking, a lot of decision-making, and more than a few moments where I had to figure out what I even wanted before I could ask for it.

The first thing I did was use Claude to do the research. Not to write code, just to help me understand what I was getting into. What does a native Android project actually look like? What's Gradle? What do I need to know about BLE on Android? What's a foreground service and why does everyone seem annoyed about it? That research phase was genuinely one of the more useful things I've done with an LLM. It's not that it's smarter than a Google search, it's that I could follow up. "Okay but what does that mean when I'm on Linux with no Android Studio?" Follow-up questions are where LLMs actually shine.

I wrote more about the actual process in the [case study](https://snazzyham.com/logbook), so I won't go too much into detail here.

I found myself constantly describing things in web development terms and asking "how do I do this equivalent on Android?" For example, I think of data in terms of a database and an API. On Android, that's Room and Retrofit, more or less. Getting fluent in that translation layer was probably the biggest learning curve of the whole thing.

The design phase I ran through Claude's design tool, which spat out HTML mockups that I used as a brief, I then let Qwen 3.7 (Plus for the most part, Max for some bug fixing) handle the building.

## Actually using it

I built the app in under a weekend.

I've been using it every single day since then. And here's the thing about building something and then actually using it yourself: you find bugs that no QA process would ever catch, because they only surface in the specific, weird way that you personally use a thing. The tech industry likes to call this dogfooding, which is a terrible name for it, as most names in the tech industry. I found out the hard way that my indoor walk mode wasn't handling step counting correctly when you reboot your phone mid-walk. I found out that the rest timer was slightly in the wrong place on my specific screen size. Stuff like that.

The iteration loop has been fast though. Notice something broken in the morning, fix it that afternoon. That part feels new. That part feels like something genuinely different about where we are right now.

## The part I can't stop thinking about, or as I like to call it, the enshitifaction of apps.

Here's where I want to be honest about something, because I think the enthusiasm around "anyone can build apps now" is a bit one-sided.

Yes, the programming language is no longer a barrier. I am proof of that. I didn't need to know Kotlin. I didn't need to understand every part of the Android component structure. I just needed to be able to describe what I wanted clearly enough, recognise when the output was wrong, and iterate. That's a real shift. The barrier to going from idea to working app has been compressed dramatically.

But the filter that barrier provided wasn't just friction, it was selection. The people who built native apps before had to care enough to spend months learning the ecosystem. That investment meant that when they shipped something, there was a reasonable chance it was something they'd thought hard about. Not always, obviously. There's always been garbage in the app stores. But the signal-to-noise ratio is about to get a lot worse.

The number of people who are going to build an app, realise it technically works, and immediately think "I can monetisee this" is going to be staggering. And a lot of those apps are going to be half-baked, under-tested, and abandoned the second the creator gets bored or doesn't see immediate returns. That's not a knock on those people specifically, it's just what happens when you remove friction from a system that relied on friction as a filter.

I built Logbook because I needed it to exist and nothing else did exactly what I wanted. I've used it every day since. I genuinely think that's the right reason to build something. Could I monetise this? Potentially. That's an internal battle at the moment. I'm trying to be as unbiased as I can when I say I would genuinely pay for an app like this (it's the same reason I pay monthly for [Showly](https://www.showlyapp.com/), one of the best Android apps I've ever used). However, I also don't really want the overhead of supporting an app at the moment, that's kind of why I made it offline-first in the first place.

I'm less sure about what happens when the barrier is low enough that you don't need a reason that good.

I don't have a clean resolution to that. I just think it's worth sitting with rather than glossing over in the excitement of what's now possible.

For now, the app works great and the process has already led to a 15-item long list of other apps I want to build that would make my life easier, which is hella dangerous if I do say so myself. If anything, this is an indicator of the future of the SaaS landscape. You're going to have less instances of "Tool that does X for everyone" and more "Tool that can be customized to your needs easily".
