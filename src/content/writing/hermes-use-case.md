---
title: "Hermes, I understand it now."
date: 2026-10-29
---

The past couple of blog posts, I've been talking a lot about how 2026 with AI is the year of tools. I have spent the past couple of months just building tools because AI has reduced the barrier of entry for me to start making my own tools.

I've built a personal finance dashboard. I've built an activity tracker for my workouts. I have built an app that lets me manage my AI agents.

But sometimes you just don't need an app. Sometimes, you just need a better way of managing things. And that's where Hermes has come in.

I set up Hermes a while ago, but so far all it's done is manage my emails and interface with the apps I have built.

There are two apps I was interested in building.

## TV shows, movies, and a taste profile

One app that's been on my mind for a while has been AI personalization for TV shows and movies. So I basically give it a list of my ratings and rankings, and it can suggest TV shows and movies for me to watch when I have nothing in my queue.

But it didn't really make sense for me to create an app for this because I already use Showly, and Showly connects to Trakt, which is the tracking service that I've used. I've been using Trakt since, I want to say, 2011, like back in high school. So it has all my data already.

And yeah, I could export it and build my own front end, but I really like the Showly front end. In fact, it's one of the few apps I will not stop paying for because I think the developers just did a fantastic job in making such a good app for Android, which a lot of people don't do.

And Trakt as a service does everything I want. All I needed was a layer on top of it that gives me recommendations based on my ratings and builds a taste profile for me. So that's what I've been using Hermes for.

One main use case now that I've figured out is Hermes can store a database. And that's actually very powerful, having Hermes store a database where it just has all of my Trakt rankings. It pulls it once every couple of days to see if I've rated anything or if I've changed any ratings. Then it constantly works on, improves, and builds my taste profile analysis and recommends TV shows and movies to me.

## Sometimes you just need a database

Figuring out that Hermes can store a database opened up a whole new world of opportunity for me because the entire idea around building apps for things has always just been about having a database, having a store of information.

And sometimes it makes sense for it to be an app, like my personal finance dashboard. That doesn't make sense for it to just be a database because I don't want to interface only over text each time. I want a visual interface that I can look at and a chat that I can do separately, and that's where the Hermes connection to the MCP server comes in.

But something like my taste profile analysis, I don't need another front end for that. I already have one.

And being able to use that information in a small SQLite database that takes up barely any memory or processing power and is just there as a running store for me was a big deal.

## Mise-en-Place, without another front end

And that brings me to my second major use case that I just discovered.

For the longest time, the thing that has bothered me about a shared kitchen in a household with a family is I always forget what I've bought, what ingredients I have, and things go bad in the fridge. Things go bad in the pantry.

And I had this idea for an app that I was going to call Mise-en-Place that was a way for me to track everything that I have stored in the kitchen.

But the more I think about it, that's another thing that doesn't need a front end. That is something that would work great via chat, and that's where the Hermes use case comes in.

So Hermes now has a database of everything that's stored in my kitchen, whether it's in the pantry, fridge, or freezer. I tag it with dates, so when I buy chicken, it knows when it was bought.

Daily, a cron job runs and suggests to me what I could cook with the ingredients that I have on hand.

When I see a recipe I like on Instagram Reels, I send the recipe to Hermes, and it just creates a recipe for me based on the ingredients I have, inspired by the recipe that I shared from Instagram.

When I don't know what I feel like cooking, I ask it what I have. When I go to the grocery store, I ask it what I'm running low on.

I can tell it, "I made this." Not every time, but I can tell it, "Hey, I'm out of soy sauce. I'm out of doubanjiang," which is chili bean paste.

And then it just keeps it there, and when I ask it what I'm running short on, it reminds me what I need to buy.

So, where does that leave me? Well, I guess you could say now I have introduced some decision fatigue because instead of just rushing to build an app, I actually have to think about what I want and see if it makes sense as a Hermes skill or whether it actually deserves an app being built.

But it also means I'm not just gonna be flooding my time with building a bunch of apps that I'm not going to maintain and not use anymore. And I think that's a worthy trade-off to have.
