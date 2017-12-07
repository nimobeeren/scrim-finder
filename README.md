# CSGO Scrim Finder

## General
A scrim, derived from the word skirmish, is when two teams play a practice match in a competitive environment. This web app provides a platform to organize and participate in these matches, specifically for the game Counter-Strike: Global Offensive (CSGO).

The aim is to provide players with a quick and easy way to find an opponent at fitting skill level, who wants to play the same map (game environments) and may or may not provide their own server to play on. Currently, this is usually done by posting text messages on Facebook groups or IRC channels. This app provides the advantages of easy filtering through posts, simplified communication and removal of useless clutter.

As the back-end is implemented, features such as messaging, adding friends and scheduling matches will be made available. Most of all, I hope this app can unify existing platforms and groups, allowing teams to find great opponents without the hassle.

## Design
The front-end was built using React, which helped create a well-structured HTML hierarchy, with modular components that can easily be reused. To manage the application’s state, Redux was used. This made it easier to pass data around, for example between the filters and the post list. Although it made the app more complex, Redux helps to avoid a big mess when the project grows.

The app was styled from scratch, using Sass. This allowed variables to be used in CSS, which helped create a uniform style. To make the app responsive to different screen sizes, I used media queries in CSS. I am not completely satisfied with the method of styling components. In particular, sharing styles between components and avoiding conflicts proved to be more challenging than I originally thought.
