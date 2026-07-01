Gym Session Tracker & Metrics Engine

I built this TypeScript tool to handle the logic behind a gym logging app. It takes user workout data, checks if their membership is valid, rates their daily stats against fitness goals, and automatically manages their workout streak.

## What It Actually Does

* **Locks down data types:** Uses strict TypeScript interfaces and union types so you can't accidentally pass weird data into a gym session (like tracking a workout on a day that isn't Legs, Back, or Rest).
* **Automated Streak Tracking:** Converts date strings into actual timestamps and calculates the math behind the scenes. If you miss a day, it catches the gap and resets your streak to 1. 
* **Prevents Double-Logging:** If you try to log a workout for a date that already has data, the code blocks the operation so you don't corrupt your history.
* **Smart Performance Feedback:** Compares stats like steps and calories against benchmarks to give personalized feedback (e.g., telling you exactly how many more steps you need to hit your daily goal).

---

- The Tech Stack & Logic Flow

* **Language:** TypeScript 
* **Concepts used:** Custom Union Types, Optional Properties (membership?), Ternary Operators, and JavaScript Date Manipulation.


[User Logs In] ──> Checks Membership ──> Checks If Date is Unique ──> Calculates Streak ──> Outputs Report


---

## How to Test It

To run this on your machine and see the console output:

1. **Install TypeScript globally:**

npm install -g typescript ts-node

2. Run the file:

ts-node gym_logic.ts

Example Output:

This is what prints out in the terminal when you run a demo log:

------- 

Logging new session...

--- DAILY PROGRESS REPORT ---

Steps: 9000. 
Performance: mid. 
Walk 1000 more steps to hit goal.

Energy Burned: 600 kcal (good). 
100 kcal over the average!

No active workout session found for tracking streak.

 --- END OF DAILY PROGRESS REPORT ---

------- 

```

```
