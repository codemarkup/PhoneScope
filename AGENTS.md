# PhoneScope — AI Agent Context File

## What This Project Is
PhoneScope is a **Next.js 15 research website** for a university project on **Smartphone Usage Among Students**.
It is a final project for the course **Probability & Statistics (Spring 2026)** at **Lahore Garrison University**, BSCS program, under instructor **Ms. Shumaila Nisar**.

The website presents a complete statistical study based on **100 real survey responses** collected via Google Forms in April 2026.

---

## Project Structure

```
phonescope/
├── app/
│   ├── globals.css          ← All CSS variables, fonts, animations, cursor, reveal system
│   ├── layout.tsx           ← Root layout, metadata
│   └── page.tsx             ← Main page — imports and assembles all sections
├── components/
│   ├── Cursor.tsx           ← Custom dot + ring cursor (client component)
│   ├── Navbar.tsx           ← Fixed top nav with smooth scroll (no external links)
│   ├── Hero.tsx             ← Hero section with animated donut chart + floating stat cards
│   ├── MethodBand.tsx       ← Teal band showing survey methodology details
│   ├── Overview.tsx         ← 4 stat cards: mean hours, sleep, addiction %, social media %
│   ├── Charts.tsx           ← 6 Chart.js charts: histogram, donuts, bar chart, demographics, sleep
│   ├── Analysis.tsx         ← 3 post-midterm analysis cards: CI, Hypothesis Test, Regression mini
│   ├── Insights.tsx         ← 6 key findings on dark background
│   ├── Regression.tsx       ← Full scatter plot with all 100 data points + regression line
│   ├── Team.tsx             ← Team member cards
│   └── Footer.tsx           ← Footer with course/institution info
```

---

## Design System

All design tokens are CSS variables in `app/globals.css`:

| Variable | Value | Use |
|---|---|---|
| `--bg` | #F7F5F0 | Main page background (warm white) |
| `--bg2` | #EEEAE2 | Alternate section background |
| `--bg3` | #E5E0D5 | Deeper background tint |
| `--surface` | #FFFFFF | Card backgrounds |
| `--border` | #D8D2C8 | Card/section borders |
| `--text` | #1C1A17 | Primary text |
| `--text2` | #4B4640 | Secondary text |
| `--text3` | #8A8278 | Muted/label text |
| `--teal` | #1A6B5C | Primary accent color |
| `--teal-lt` | #E8F3F1 | Teal light background |
| `--amber` | #A85C1A | Secondary accent (regression) |
| `--amber-lt` | #F5EDE4 | Amber light background |
| `--slate` | #2C4A6E | Third accent (CI, hypothesis) |
| `--slate-lt` | #E4EBF5 | Slate light background |
| `--sage` | #4A6741 | Fourth accent (social media) |
| `--rule` | #D0C9BC | Horizontal rule/divider color |

**Fonts:**
- `Instrument Serif` → headings, big numbers, `.serif` class
- `Geist` → body text, descriptions
- `Geist Mono` → labels, tags, stats, `.mono` class

**Scroll reveal system:** Add class `reveal` to any element. It starts hidden (opacity 0, translateY 22px). When it enters the viewport via IntersectionObserver, add class `in` to animate it in. Delay classes: `d1`, `d2`, `d3`, `d4`.

---

## Data Source

All data comes from a Google Forms survey of **100 university students** about smartphone usage.

### Raw Data (hardcoded in components)

**Daily Phone Hours** (used in Charts.tsx, Analysis.tsx, Regression.tsx):
```
[3,7,2,3,4,6,8,9,8,6,2,5,4,8,6,2,3,6,6,9,6,3,9,7,10,7,2,4,4,7,3,2,7,8,9,7,8,2,7,1,11,8,2,6,7,11,5,3,6,9,11,3,9,7,1,1,5,5,6,4,6,7,8,9,5,6,7,6,6,8,5,9,8,8,5,4,8,4,3,3,5,7,1,5,8,5,5,3,8,7,7,4,3,5,8,3,5,6,3,4]
```

**Daily Sleep Hours** (used in Charts.tsx, Analysis.tsx, Regression.tsx):
```
[8,6,2,6,4,8,4,5,9,6,4,7,8,5,4,7,8,6,6,7,9,9,7,5,4,9,9,9,5,5,4,5,9,4,4,4,4,7,4,9,8,5,8,8,6,5,4,4,7,5,6,6,7,7,6,6,9,5,5,9,4,4,8,8,7,6,7,8,8,7,9,7,8,8,8,9,4,9,6,5,5,8,6,6,8,4,8,5,8,5,5,9,6,3,8,3,4,8,6,4]
```

### Computed Statistics

| Variable | Mean | Median | Mode | SD |
|---|---|---|---|---|
| Phone Hours/Day | 5.67 | 6 | 7 | 2.46 |
| Sleep Hours/Day | 6.30 | 6 | 8 | 1.84 |

### Categorical Distributions

**Gender:** Male 61 · Female 38 · Prefer Not To Say 3
**Age:** 18-20: 57 · 21-23: 31 · 24-26: 6 · Above 26: 5
**Primary Use:** Social Media 50 · Education 21 · Communication 13 · Gaming 12 · Other 5
**Self-reported Addiction:** No 38 · Maybe 34 · Yes 28
**Phone During Study:** Often 30 · Sometimes 28 · Very Often 25 · Rarely 12 · Never 4

### Post-Midterm Analysis Results

**1. Confidence Interval (95% CI for mean phone hours):**
- x̄ = 5.67, s = 2.46, n = 100, t* = 1.984 (df=99)
- SE = 0.246, ME = 0.488
- **CI = [5.18, 6.16]**

**2. Hypothesis Testing (Male vs Female phone usage):**
- H₀: μ_male = μ_female | H₁: μ_male ≠ μ_female | α = 0.05
- x̄_male = 5.85 (n=59), x̄_female = 5.39 (n=38)
- t-calculated = 0.91, t-critical = ±1.985
- **Result: Fail to reject H₀ — no significant difference**

**3. Linear Regression (phone hours → sleep hours):**
- r = -0.020 (near zero), R² = 0.0004
- ŷ = 6.41 − 0.019x
- **Conclusion: No meaningful linear relationship**

---

## Survey Questions (14 total)
1. Age group
2. Gender
3. Approximate daily smartphone usage (hours)
4. Primary use of smartphone
5. Do you use phone during study sessions?
6. How often do you check phone while studying?
7. Do you feel addicted to your smartphone?
8. Daily sleep hours
9. Does phone usage affect your sleep?
10. Do you use phone before bed?
11. How often do you use social media?
12. Does phone usage affect your academic performance?
13. Have you tried to reduce phone usage?
14. How many hours would you like to reduce phone usage?

---

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** CSS variables + inline styles (no Tailwind used in components)
- **Charts:** Chart.js 4 + react-chartjs-2
- **Fonts:** Google Fonts (Instrument Serif, Geist, Geist Mono)
- **Deployment:** Vercel (drag and drop or `vercel deploy`)
- **No external APIs** — all data is hardcoded from the Google Sheets export

---

## How to Add New Data or Make Changes

### To update team member names:
Edit `components/Team.tsx` → change the `members` array (name, initial, role, gradient color).

### To add a new chart:
1. Create a new `<canvas>` ref in `Charts.tsx`
2. Add a new `Chart` instance in the `useEffect`
3. Wrap it in a `<ChartCard>` component

### To update statistical values:
- Raw arrays → `components/Analysis.tsx` (HOURS, SLEEP constants at top)
- Computed stats text → search for the number in the relevant component
- Hero donut percentages → `components/Hero.tsx` donut canvas draw function

### To change colors:
Only edit CSS variables in `app/globals.css` — all components reference variables, not hardcoded colors.

### To add a new section:
1. Create `components/NewSection.tsx`
2. Import it in `app/page.tsx`
3. Give it a unique `id` for navbar scroll targeting
4. Add a link in `components/Navbar.tsx` links array

### To deploy:
```bash
npm run build   # check for errors
vercel deploy   # deploy to Vercel (free)
```
Or drag the entire folder to vercel.com dashboard.

---

## Goals of This Project
- Show rigorous statistical analysis of smartphone usage data
- Apply post-midterm topics: Confidence Intervals, Hypothesis Testing, Linear Regression
- Present findings in a professional, research-grade visual format
- Differentiate from a competitor group's project (which built an addiction calculator)
- Demonstrate deep understanding of statistics through visual explanation, not AI tools
