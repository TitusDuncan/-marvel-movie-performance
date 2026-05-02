# Marvel Movie Success Visualization

## Project Overview

This project is an interactive D3.js visualization that explores the question:

**Which Marvel movie is the most successful?**

Instead of treating success as one single measurement, this visualization allows users to compare Marvel movies across several different success categories, including audience ratings, critic ratings, production budget, domestic gross, and worldwide gross.

The visualization uses an interactive bar chart. Each button changes the metric being compared and displays the top 10 Marvel movies for that selected category.

---

## Research Question

**How does the answer to “Which Marvel movie is the most successful?” change depending on how success is measured?**

This question is useful because movie success can be understood in several ways. A movie may be financially successful but not critically loved. Another movie may have strong audience ratings but lower worldwide gross. The purpose of this visualization is to let users explore those differences.

---

## Dataset

The dataset used for this project is `Marvel_Movies_Dataset.csv`.

The dataset includes Marvel movies and several related attributes, including:

- Title
- Director
- Release date
- IMDb rating
- IMDb Metascore
- Rotten Tomatoes Critics score
- Rotten Tomatoes Audience score
- Letterboxd score
- Budget
- Domestic Gross
- Worldwide Gross

CinemaScore was removed from the comparison because it uses letter grades instead of a numeric scale. This project focuses on numeric categories that can be sorted and compared more directly.

---

## Comparable Metrics

The interactive buttons compare the top 10 movies for each of the following metrics:

1. IMDb rating
2. IMDb Metascore
3. Rotten Tomatoes Critics score
4. Rotten Tomatoes Audience score
5. Letterboxd score
6. Budget
7. Domestic Gross
8. Worldwide Gross

Each button sorts the full dataset by the selected metric and displays the top 10 movies for that category.

---

## Visualization Design

### Chart Type

The main visualization is a bar chart.

A bar chart was chosen because the project compares individual movies across a selected numeric value. Bar charts make it easy to compare ranked values and quickly see which movie leads in each category.

### Interaction

The visualization uses buttons to switch between success metrics. When a user clicks a button, the chart updates to show the top 10 movies for that metric.

This interaction supports the main question by allowing users to define “success” in different ways.

### Visual Encoding

- **X-axis:** Movie titles
- **Y-axis:** Selected metric value
- **Bar height:** Numeric value for the selected success metric
- **Tooltip:** Exact movie title and metric value

---

## Design Process

The initial idea was to compare Marvel movies using a single success measure, such as worldwide gross. However, that approach was too limited because movie success can be measured in many ways.

The design was revised to allow users to switch between multiple comparison categories. This makes the visualization more exploratory and better aligned with the assignment goal of using D3 for interactive visualization.

Early sketch ideas should be added here:

- Sketch 1: Basic bar chart layout
- Sketch 2: Button controls above the chart
- Sketch 3: Tooltip interaction for exact values

Add scanned or photographed sketches to the `images` folder and reference them here.

---

## Expected Findings

This project will likely show that the “most successful” Marvel movie changes depending on the metric selected.

Possible findings may include:

- The highest-grossing movie may not have the highest IMDb or Rotten Tomatoes score.
- Audience ratings and critic ratings may rank movies differently.
- Higher budgets do not always guarantee higher ratings.
- Worldwide gross may tell a different story than domestic gross.

Screenshots from the completed visualization should be added to the documentation page as evidence.

---

## Project Structure

```text
marvel-d3-final-project/
├── index.html              # Live interactive visualization
├── documentation.html      # Project documentation page
├── README.md               # GitHub design document
├── data/
│   └── marvel_movies.csv
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── sketches and screenshots
└── vendor/
    └── optional local D3 file
```

---

## How to Run Locally

Because this project loads a CSV file, it should be run through a local web server rather than opened directly from the file system.

### Option 1: Python local server

From the project folder, run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### Option 2: MAMP

1. Move the project folder into the MAMP `htdocs` folder.
2. Start the MAMP servers.
3. Open the project in Chrome using the local MAMP URL.

---

## D3 Setup

The project currently uses D3 from a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
```

This is the simplest setup for development.

If a local/offline version is needed, download `d3.v7.min.js` and place it inside the `vendor` folder. Then update `index.html` to reference:

```html
<script src="vendor/d3.v7.min.js"></script>
```

---

## Final Deliverables

The final project will include:

1. A live interactive visualization page
2. A documentation page explaining the design process and findings
3. A 2–4 minute narrated YouTube video embedded in the documentation page

