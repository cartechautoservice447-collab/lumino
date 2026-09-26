import { Collection, Note, UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  name: 'Raw Throne',
  email: 'rawthrone1@gmail.com',
  avatarLetter: 'R',
};

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'col-lecture-0',
    name: 'LECTURE 0',
    tag: 'GENERAL',
    lastEditedText: 'Last edited 4d ago',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
  },
  {
    id: 'col-kmw',
    name: 'kmw',
    tag: 'GENERAL',
    lastEditedText: 'Last edited Aug 17, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 20,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
  },
  {
    id: 'col-ww',
    name: 'ww',
    tag: 'GENERAL',
    lastEditedText: 'No notes yet',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
  },
];

export const INITIAL_NOTES: Note[] = [
  // LECTURE 0 Notes (8 notes total)
  {
    id: 'note-arguments',
    collectionId: 'col-lecture-0',
    title: 'ARGUMENTS',
    body: `# INTEGER

>An integer (or int) is a whole number—no decimal or fractional part. Examples: -3, 0, 42.

**code:**
\`\`\`python
x = int(input("What's x? ")) # here the string
                              # changed to integer or int
y = int(input("What's y? ")) # Same here have also done

print(x + y)
\`\`\`

## OUTPUT:

what's x  ⟶   5

what's y  ⟶   6

11`,
    favorited: false,
    metaDateText: '4D AGO',
    savedStatus: 'SAVED 4D AGO',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
  },
  {
    id: 'note-untitled-1',
    collectionId: 'col-lecture-0',
    title: 'Untitled note',
    body: '',
    favorited: false,
    metaDateText: 'AUG 15, 2026',
    savedStatus: 'SAVED AUG 15, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
  },
  {
    id: 'note-untitled-2',
    collectionId: 'col-lecture-0',
    title: 'Untitled note',
    body: '',
    favorited: false,
    metaDateText: 'AUG 15, 2026',
    savedStatus: 'SAVED AUG 15, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
  },
  {
    id: 'note-untitled-3',
    collectionId: 'col-lecture-0',
    title: 'Untitled note',
    body: '',
    favorited: false,
    metaDateText: 'AUG 15, 2026',
    savedStatus: 'SAVED AUG 15, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
  },
  {
    id: 'note-function',
    collectionId: 'col-lecture-0',
    title: 'FUNCTION',
    body: `A function is a reusable block of code that performs a task. For example, print() : is a built-in function that writes the given arguments to standard output.

\`\`\`python
def hello(to="world"):
    print("hello,", to)

name = input("What's your name? ")
hello(name)
\`\`\`

## Parameter vs Argument:
- A **parameter** is the variable listed inside parentheses in the function definition.
- An **argument** is the actual value sent to the function when it is called.`,
    favorited: false,
    metaDateText: 'AUG 14, 2026',
    savedStatus: 'SAVED AUG 14, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 8,
  },
  {
    id: 'note-strings-and-methods',
    collectionId: 'col-lecture-0',
    title: 'STRINGS & METHODS',
    body: `# Strings & Methods

Strings in Python come with built-in methods:
- \`.strip()\`: removes leading and trailing whitespaces
- \`.capitalize()\`: capitalizes the first letter
- \`.title()\`: capitalizes the first letter of each word

\`\`\`python
name = input("What's your name? ").strip().title()
print(f"hello, {name}")
\`\`\``,
    favorited: false,
    metaDateText: 'AUG 12, 2026',
    savedStatus: 'SAVED AUG 12, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
  {
    id: 'note-conditionals-intro',
    collectionId: 'col-lecture-0',
    title: 'CONDITIONALS',
    body: `# Conditionals

Python conditions evaluate to True or False:
- \`if\`
- \`elif\`
- \`else\`

\`\`\`python
x = int(input("What's x? "))
y = int(input("What's y? "))

if x < y:
    print("x is less than y")
elif x > y:
    print("x is greater than y")
else:
    print("x is equal to y")
\`\`\``,
    favorited: false,
    metaDateText: 'AUG 10, 2026',
    savedStatus: 'SAVED AUG 10, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
  },
  {
    id: 'note-loops-basics',
    collectionId: 'col-lecture-0',
    title: 'LOOPS',
    body: `# Loops in Python

### While Loop
\`\`\`python
i = 0
while i < 3:
    print("meow")
    i += 1
\`\`\`

### For Loop with range
\`\`\`python
for _ in range(3):
    print("meow")
\`\`\``,
    favorited: false,
    metaDateText: 'AUG 08, 2026',
    savedStatus: 'SAVED AUG 08, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
  },

  // kmw Notes (7 notes total, 1 favorited)
  {
    id: 'note-kmw-1',
    collectionId: 'col-kmw',
    title: 'Architecture Overview',
    body: `# Architecture Overview

Modular microservices with client-side reactive components.
Data state flow is synchronized via unified context hooks and localized storage.`,
    favorited: true, // Exactly 1 favorite note in initial state!
    metaDateText: 'AUG 17, 2026',
    savedStatus: 'SAVED AUG 17, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
  },
  {
    id: 'note-kmw-2',
    collectionId: 'col-kmw',
    title: 'API Endpoints & Routing',
    body: `# API Endpoints

- \`GET /api/notes\`: fetch all user notes
- \`POST /api/notes\`: persist new note
- \`DELETE /api/notes/:id\`: remove existing note`,
    favorited: false,
    metaDateText: 'AUG 16, 2026',
    savedStatus: 'SAVED AUG 16, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
  },
  {
    id: 'note-kmw-3',
    collectionId: 'col-kmw',
    title: 'Database Schema Designs',
    body: `# Schema Specs

Relational models for notes, collections, users, and tags.`,
    favorited: false,
    metaDateText: 'AUG 14, 2026',
    savedStatus: 'SAVED AUG 14, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 9,
  },
  {
    id: 'note-kmw-4',
    collectionId: 'col-kmw',
    title: 'UI Design System & Tokens',
    body: `# UI Tokens

Colors:
- Background: \`#0c0d0f\`
- Surface: \`#1a1c1f\`
- Elevated: \`#292a2d\`
- Green accent: \`#3bb360\``,
    favorited: false,
    metaDateText: 'AUG 13, 2026',
    savedStatus: 'SAVED AUG 13, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
  {
    id: 'note-kmw-5',
    collectionId: 'col-kmw',
    title: 'State Sync Pipeline',
    body: `# State Synchronization

Ensures cross-tab updates and offline persistence are preserved seamlessly.`,
    favorited: false,
    metaDateText: 'AUG 11, 2026',
    savedStatus: 'SAVED AUG 11, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
  },
  {
    id: 'note-kmw-6',
    collectionId: 'col-kmw',
    title: 'Performance Benchmarks',
    body: `# Performance

Target 60fps interaction and zero layout thrash across all glass panels.`,
    favorited: false,
    metaDateText: 'AUG 09, 2026',
    savedStatus: 'SAVED AUG 09, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
  },
  {
    id: 'note-kmw-7',
    collectionId: 'col-kmw',
    title: 'Release Checklist',
    body: `# Release Checklist

- [x] Responsive layout verification
- [x] Code block syntax highlighting
- [x] Local storage resilience`,
    favorited: false,
    metaDateText: 'AUG 07, 2026',
    savedStatus: 'SAVED AUG 07, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 16,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 16,
  },

  // 11 Archive/General notes to reach exactly 26 notes total across the app
  {
    id: 'note-gen-1',
    collectionId: 'unassigned',
    title: 'Python Quick Reference',
    body: 'Standard library utilities and common idioms for fast scripting.',
    favorited: false,
    metaDateText: 'AUG 05, 2026',
    savedStatus: 'SAVED AUG 05, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 18,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 18,
  },
  {
    id: 'note-gen-2',
    collectionId: 'unassigned',
    title: 'Git Version Control Notes',
    body: 'Branching strategies, interactive rebase, and staging workflows.',
    favorited: false,
    metaDateText: 'AUG 04, 2026',
    savedStatus: 'SAVED AUG 04, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 19,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 19,
  },
  {
    id: 'note-gen-3',
    collectionId: 'unassigned',
    title: 'Terminal Shortcuts',
    body: 'Useful keybindings: Ctrl+A, Ctrl+E, Ctrl+R reverse history search.',
    favorited: false,
    metaDateText: 'AUG 03, 2026',
    savedStatus: 'SAVED AUG 03, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 20,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 20,
  },
  {
    id: 'note-gen-4',
    collectionId: 'unassigned',
    title: 'Regular Expressions Guide',
    body: 'Pattern matching syntax and regex grouping examples.',
    favorited: false,
    metaDateText: 'AUG 02, 2026',
    savedStatus: 'SAVED AUG 02, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 21,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 21,
  },
  {
    id: 'note-gen-5',
    collectionId: 'unassigned',
    title: 'Algorithm Complexity (Big-O)',
    body: 'Time and space complexity classification chart for search and sorting.',
    favorited: false,
    metaDateText: 'AUG 01, 2026',
    savedStatus: 'SAVED AUG 01, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 22,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 22,
  },
  {
    id: 'note-gen-6',
    collectionId: 'unassigned',
    title: 'Binary Search Implementation',
    body: 'Divide and conquer strategy on sorted arrays with O(log n) efficiency.',
    favorited: false,
    metaDateText: 'JUL 30, 2026',
    savedStatus: 'SAVED JUL 30, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 24,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 24,
  },
  {
    id: 'note-gen-7',
    collectionId: 'unassigned',
    title: 'HTTP Status Code Reference',
    body: '200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error.',
    favorited: false,
    metaDateText: 'JUL 28, 2026',
    savedStatus: 'SAVED JUL 28, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 26,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 26,
  },
  {
    id: 'note-gen-8',
    collectionId: 'unassigned',
    title: 'Markdown Syntax Cheatsheet',
    body: 'Headers, blockquotes, code fences, lists, tables, and links.',
    favorited: false,
    metaDateText: 'JUL 25, 2026',
    savedStatus: 'SAVED JUL 25, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 29,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 29,
  },
  {
    id: 'note-gen-9',
    collectionId: 'unassigned',
    title: 'Object-Oriented Programming Principles',
    body: 'Encapsulation, Abstraction, Inheritance, and Polymorphism in practice.',
    favorited: false,
    metaDateText: 'JUL 22, 2026',
    savedStatus: 'SAVED JUL 22, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 32,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 32,
  },
  {
    id: 'note-gen-10',
    collectionId: 'unassigned',
    title: 'Recursion Patterns',
    body: 'Base cases and recursive step definitions for tree traversal.',
    favorited: false,
    metaDateText: 'JUL 20, 2026',
    savedStatus: 'SAVED JUL 20, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 34,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 34,
  },
  {
    id: 'note-gen-11',
    collectionId: 'unassigned',
    title: 'Unit Testing Guidelines',
    body: 'Arrange, Act, Assert pattern with pytest and jest test runners.',
    favorited: false,
    metaDateText: 'JUL 18, 2026',
    savedStatus: 'SAVED JUL 18, 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 36,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 36,
  },
];
