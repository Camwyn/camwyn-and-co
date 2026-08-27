# Data Contracts & Schemas: Camwyn & Co

All structured data for quizzes, editorial dispatches, and global site metadata are maintained in `src/_data/*.json`.

---

## 1. Adventure Compass Matrix (`src/_data/compass.json`)

```json
{
  "archetypes": {
    "explorer": {
      "id": "explorer",
      "name": "The Explorer",
      "tagline": "Drawn to the untraveled road and open possibilities.",
      "description": "You thrive where plans give way to curiosity. In every project, you provide the momentum and the instinct to see what lies beyond the next turn.",
      "fieldPrompt": "Seek out uncharted notes and open-ended experiments."
    },
    "craftsman": {
      "id": "craftsman",
      "name": "The Craftsman",
      "tagline": "Driven by care, fine lines, and the patience of the workshop.",
      "description": "You know that beauty lives in the details. You take raw ideas and shape them into lasting, purposeful work.",
      "fieldPrompt": "Inspect our workbench dispatches and making-of notes."
    },
    "gatherer": {
      "id": "gatherer",
      "name": "The Gatherer",
      "tagline": "Rooted in hospitality, generous tables, and shared stories.",
      "description": "You understand that good things are made to be shared. You bring people together and turn solitary efforts into vibrant communities.",
      "fieldPrompt": "Pull up a chair to our table notes and family recipes."
    },
    "catalyst": {
      "id": "catalyst",
      "name": "The Catalyst",
      "tagline": "Sparking action, cross-pollinating ideas, and defying inertia.",
      "description": "You connect disparate dots and ignite momentum. You refuse to let worthwhile adventures gather dust on a shelf.",
      "fieldPrompt": "Explore active collaborations and in-progress ventures."
    }
  },
  "questions": [
    {
      "id": 1,
      "number": "01",
      "prompt": "A free Saturday appears. Where do you go?",
      "options": [
        {
          "text": "Toward a long table and a full kitchen",
          "archetype": "gatherer"
        },
        {
          "text": "Into the workshop with an unfinished idea",
          "archetype": "craftsman"
        },
        {
          "text": "Down a road I have never taken",
          "archetype": "explorer"
        },
        {
          "text": "Into the city to meet friends and start a project",
          "archetype": "catalyst"
        }
      ]
    },
    {
      "id": 2,
      "number": "02",
      "prompt": "The mark of a truly great project is:",
      "options": [
        {
          "text": "The feeling of welcome and warmth it creates for others",
          "archetype": "gatherer"
        },
        {
          "text": "The quiet precision and durability of its craft",
          "archetype": "craftsman"
        },
        {
          "text": "The unexpected territory it opened up along the way",
          "archetype": "explorer"
        },
        {
          "text": "The new collaborations and energy it sparked",
          "archetype": "catalyst"
        }
      ]
    },
    {
      "id": 3,
      "number": "03",
      "prompt": "When staring at a blank notebook, your instinct is to:",
      "options": [
        {
          "text": "Sketch a recipe or an outline for a gathering",
          "archetype": "gatherer"
        },
        {
          "text": "Draw precise diagrams and working mechanisms",
          "archetype": "craftsman"
        },
        {
          "text": "Map out an itinerary or list of wild questions",
          "archetype": "explorer"
        },
        {
          "text": "Draft a manifesto and send a note to a partner",
          "archetype": "catalyst"
        }
      ]
    },
    {
      "id": 4,
      "number": "04",
      "prompt": "In good company, you are most often the one who:",
      "options": [
        {
          "text": "Refills glasses and makes sure everyone has a seat",
          "archetype": "gatherer"
        },
        {
          "text": "Listens intently and ponders how the problem was solved",
          "archetype": "craftsman"
        },
        {
          "text": "Asks 'what if we went somewhere else right now?'",
          "archetype": "explorer"
        },
        {
          "text": "Connects two people who need to know each other",
          "archetype": "catalyst"
        }
      ]
    },
    {
      "id": 5,
      "number": "05",
      "prompt": "Choose a motto to hang above your workbench:",
      "options": [
        {
          "text": "Pull up a chair; there is always room for one more.",
          "archetype": "gatherer"
        },
        {
          "text": "Care over polish. Build things that last.",
          "archetype": "craftsman"
        },
        {
          "text": "Never leave a good question unexplored.",
          "archetype": "explorer"
        },
        {
          "text": "Small spark, steady fire, worthwhile adventure.",
          "archetype": "catalyst"
        }
      ]
    }
  ]
}
```

---

## 2. Notes from the Field Matrix (`src/_data/fieldNotes.json`)

```json
{
  "notes": [
    {
      "id": 1,
      "index": "01",
      "tag": "Table note",
      "title": "The case for staying a little longer",
      "excerpt": "On full glasses, unhurried meals, and why the best part of gathering usually begins after dinner.",
      "link": "#",
      "archetype": "gatherer"
    },
    {
      "id": 2,
      "index": "02",
      "tag": "Workbench",
      "title": "Currently making: room",
      "excerpt": "Not every good idea arrives with a plan. Here's what we're learning about protecting space for the unfinished.",
      "link": "#",
      "archetype": "craftsman"
    },
    {
      "id": 3,
      "index": "03",
      "tag": "Dispatch",
      "title": "Notes on taking the long road",
      "excerpt": "Efficiency is fine for errands, but terrible for discovery. Why our best ventures started as happy detours.",
      "link": "#",
      "archetype": "explorer"
    },
    {
      "id": 4,
      "index": "04",
      "tag": "Collaboration",
      "title": "The physics of good partnerships",
      "excerpt": "How complementary instincts turn fragile sparks into durable, exciting ventures.",
      "link": "#",
      "archetype": "catalyst"
    }
  ]
}
```

