#  Product Catalog with CSR, SSR & SSG using Next.js

##  Project Overview

This project demonstrates and compares three major rendering strategies available in Next.js:

* **Client-Side Rendering (CSR)**
* **Server-Side Rendering (SSR)**
* **Static Site Generation (SSG) with ISR**

The same Product Catalog application was implemented three different ways to analyze how rendering strategies affect:

* Performance
* SEO
* User Experience
* Core Web Vitals
* Server Load
* Content Freshness

The project includes Lighthouse audits, performance analysis, and a decision framework for choosing the appropriate rendering strategy in real-world applications.

---

##  Objective

Modern web applications must balance:

* Fast loading speeds
* Search Engine Optimization
* Dynamic content requirements
* Infrastructure cost

This project evaluates the trade-offs between CSR, SSR, and SSG by building identical applications and benchmarking them using Lighthouse.

---

##  Tech Stack

* Next.js
* React
* JavaScript
* Tailwind CSS
* Lighthouse CLI
* Chrome DevTools
* DummyJSON API

---

##  Project Structure

```text
Product-catalog-with-3-strategies/
│
├── csr/                 # Client-Side Rendering Version
├── ssr/                 # Server-Side Rendering Version
├── ssg/                 # Static Site Generation Version
│
├── results/             # Lighthouse Reports
│   ├── csr-desktop.json
│   ├── csr-mobile.json
│   ├── ssr-desktop.json
│   ├── ssr-mobile.json
│   ├── ssg-desktop.json
│   ├── ssg-mobile.json
│
├── parse-results.js
├── ANALYSIS.md
└── README.md
```

---

##  Rendering Strategies Implemented

###  Client-Side Rendering (CSR)

Data is fetched directly in the browser using React hooks.

#### Workflow

1. Browser receives minimal HTML.
2. JavaScript bundle downloads.
3. API request is made.
4. Products are rendered.

#### Advantages

* Rich interactivity
* Reduced server workload
* Ideal for authenticated dashboards

#### Limitations

* Slower first load
* Poor SEO
* Initial blank screen

---

###  Server-Side Rendering (SSR)

Data is fetched on every request using `getServerSideProps`.

#### Workflow

1. User requests page.
2. Server fetches product data.
3. Server generates HTML.
4. Browser receives fully rendered content.

#### Advantages

* Excellent SEO
* Fast content visibility
* Fresh data every request

#### Limitations

* Higher server cost
* Increased TTFB
* Hydration overhead

---

###  Static Site Generation (SSG)

Pages are generated at build time using `getStaticProps`.

#### Workflow

1. Build process fetches product data.
2. Static HTML files are generated.
3. CDN serves pages instantly.

#### Advantages

* Best performance
* Lowest TTFB
* Excellent SEO
* Highly scalable

#### Limitations

* Content can become stale

#### Solution

Incremental Static Regeneration (ISR)

```javascript
revalidate: 60;
```

Pages are regenerated in the background every 60 seconds.

---

##  Features

### Product Listing

* Displays 20 products
* Responsive grid layout
* Product search functionality

### Product Details

* Dynamic routing
* Individual product pages

### Cart System

* Add to Cart functionality
* Live cart count updates

### Performance Benchmarking

* Lighthouse Desktop Reports
* Lighthouse Mobile Reports
* Core Web Vitals Analysis

---

##  Performance Metrics Evaluated

### Core Web Vitals

| Metric | Description              |
| ------ | ------------------------ |
| TTFB   | Time to First Byte       |
| FCP    | First Contentful Paint   |
| LCP    | Largest Contentful Paint |
| TBT    | Total Blocking Time      |
| CLS    | Cumulative Layout Shift  |
| TTI    | Time To Interactive      |

---

##  Lighthouse Testing

Example command:

```bash
lighthouse http://localhost:3000/products \
--output json \
--output-path ./results/csr-mobile.json \
--chrome-flags="--headless"
```

Reports were generated for:

* CSR Desktop
* CSR Mobile
* SSR Desktop
* SSR Mobile
* SSG Desktop
* SSG Mobile

---

##  Analysis

Detailed benchmark results are available in:

```text
ANALYSIS.md
```

The analysis compares:

* Performance Scores
* Core Web Vitals
* SEO Readiness
* Content Visibility
* Appropriate Use Cases

---

##  Real-World Recommendations

| Application Type         | Recommended Strategy |
| ------------------------ | -------------------- |
| Marketing Website        | SSG                  |
| Blog Platform            | SSG                  |
| Documentation Site       | SSG                  |
| E-Commerce Product Pages | SSR                  |
| Product Search Results   | SSR                  |
| User Dashboard           | CSR                  |
| Admin Panel              | CSR                  |

---

##  Key Learning Outcomes

Through this project I learned:

* Differences between CSR, SSR and SSG
* Next.js rendering architecture
* SEO implications of rendering strategies
* Core Web Vitals optimization
* Lighthouse performance auditing
* Chrome DevTools performance profiling
* Incremental Static Regeneration (ISR)
* Data-driven architectural decision making

---

##  Running the Project

### CSR

```bash
cd csr
npm install
npm run dev
```

Runs on:

```text
http://localhost:3000
```

### SSG

```bash
cd ssg
npm install
npm run dev
```

Runs on:

```text
http://localhost:3001
```

### SSR

```bash
cd ssr
npm install
npm run dev
```

Runs on:

```text
http://localhost:3002
```

---

##  Author

**Prasanna Guravani**

Final Year B.Tech Student

Passionate about:

* Full Stack Development
* System Design
* Web Performance Optimization
* Data Structures & Algorithms

---

##  Conclusion

This project demonstrates that there is no single best rendering strategy.

* CSR prioritizes interactivity.
* SSR balances SEO and freshness.
* SSG delivers the best raw performance.

The optimal choice depends on the application's business requirements, content update frequency, SEO needs, and scalability goals.

This comparative study provides practical evidence for selecting the right rendering architecture in modern web applications.
