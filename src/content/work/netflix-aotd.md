---
title: "A Safe Cracking Experience"
listingTitle: "Army of the Dead"
blurb: "-"
client: "Netflix"
order: 7
logo: "./netflix-aotd/logo.png"
awards:
  - title: "Citra Pariwara"
    url: "https://archive.citrapariwara.org/2021/media?id=785"
videos:
  - "https://snazzyham.cdn.prismic.io/snazzyham/afa73ab6-7433-4266-9aff-e2d3d1fa6a0f_bb.mp4"
photos:
  - "./netflix-aotd/photo-1.png"
  - "./netflix-aotd/photo-2.png"
  - "./netflix-aotd/photo-3.jpg"
  - "./netflix-aotd/photo-4.jpg"
  - "./netflix-aotd/photo-5.jpg"
  - "./netflix-aotd/photo-6.jpg"
external:
  - name: "Jombang Update"
    url: "https://jombangupdate.pikiran-rakyat.com/entertainment/pr-621933286/netflix-ajak-pecinta-film-pecahkan-kode-jelang-perilisan-army-of-the-dead-zack-snyder-fans-bts-salah-fokus?page=all"
  - name: "Kompas"
    url: "https://biz.kompas.com/read/2021/05/18/195959328/zack-snyder-rilis-army-of-the-dead-netflix-ajak-masyarakat-pecahkan-kode-bareng"
---
To launch Zack Snyder's Zombie Heist film Army of the Dead, we collaborated with Netflix to bring a virtual safe cracking experience to Indonesian viewers. A digital billboard in the heart of Jakarta displayed a code, with missing letters. User's could attempt to crack the code by tweeting @NetflixID with a specific hashtag. Failed attempts would cause the user's handle to show up live on the billboard. The right guess caused the safe to be cracked, and a 3D zombie tiger to break out onto the streets of Jakarta.

From a technical point of view, the heart of the billboard was the custom built backend. We leveraged the Twitter API to pull in tweets using the hashtag in real time, and update the messages on the board. Additionally, in order to not blind passing traffic, the backend calculated the position of the sun in that specific area, and switched the video content from light to dark automatically.
