---
title: "Unlatching the Workshop Door"
date: 2026-09-07
archetype: "architect"
excerpt: "All of our venture work has lived in private repositories. Why we decided to make the source code for our house of projects completely public."
author: "Camwyn & Co"
---

For as long as we've been building things digitally, our project work has been tucked away in private repositories. 

There are sensible reasons for that. Client partnerships involve proprietary strategy. Nascent commercial experiments need quiet incubation before they meet the world. And nobody needs strangers peering over their shoulder while they're sketching the first clumsy lines of a business model.

Private by default is the standard setting of the modern software industry. It feels safe, neat, and uncomplicated.

So when we finished the foundational rebuild of this website, the default instinct was to keep the repository private too. But as we sat with that decision, it felt increasingly at odds with the spirit of the house we were trying to build.

## Scaffolding Versus Soul

The hesitation usually comes down to two quiet fears: *What if people see our imperfect commits?* and *What if someone copies what we made?*

The first fear is just ego. Craft is rarely tidy in progress. Woodshops have sawdust on the floor, off-cuts in the corner, and pencil marks on the underside of tables. A git history that shows refactorings, corrected mistakes, and incremental experiments is not an embarrassment; it is evidence of work being done by real people.

The second fear misunderstands what makes a house worthwhile in the first place.

In traditional carpentry, a master woodworker doesn't hide their chisels, guard their workbench design, or patent their dovetail jig. The tools and the joinery techniques are shared openly with anyone willing to learn. What makes a custom cabinet extraordinary isn't the saw—it is the woodworker's eye, the choice of timber, the patience of the fit, and the care brought to the finished piece.

The software behind this site is scaffolding:
* An Eleventy static compilation pipeline that builds pages in milliseconds without runtime servers.
* A Pure OCSS design system written with custom properties instead of utility framework bloat.
* An architectural discipline that enforces a strict 0px border radius across every element.
* An automated test suite that mathematically validates color contrast and WCAG 2.1 AA accessibility across every route.

None of that scaffolding needs to be hidden. In fact, if we believe that web craft should be durable, accessible, and unhurried, keeping those solutions locked in a vault is the opposite of hospitality.

## Drawing the Line: The Dual License

Opening the workbench, however, does not mean surrendering our identity.

We wanted to share our engineering without giving away our family table. That is why we settled on an explicit dual-licensing model:

1. **The Code Is Open (MIT License):** Anyone is welcome to inspect, fork, learn from, or borrow our layout templates, CSS architecture, Alpine stores, and accessibility test harnesses. If our work helps someone else build a fast, accessible, tracker-free website, that is a win for the open web.
2. **The Content Is Ours (All Rights Reserved):** The brand names, the photography, the Field Notes essays, the family recipes from Mema's Inclination, and the narrative framework of our 6 Archetypes remain strictly proprietary. 

You can borrow the blueprints of our workshop table, but the stories told around it belong to our family and collaborators.

## An Invitation to Inspect

We claim on our home page that **smart can be warm** and that **serious work can still be fun**. 

Those are pleasant phrases, but claims mean very little without proof. By unlatching the workshop door and making [our repository public](https://github.com/Camwyn/camwyn-and-co), we are giving visitors a way to hold us to our word.

You can inspect the joints. You can see how the tokens flow into components. You can read our Architectural Decision Records to understand why we said no to heavy JavaScript frameworks.

The door is unlatched. Pull up a chair, look around the bench, and take whatever helps you build something good.
