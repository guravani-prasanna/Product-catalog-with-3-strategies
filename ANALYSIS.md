# Performance Analysis: CSR vs SSR vs SSG

This document summarizes the performance metrics collected across three different rendering strategies using Next.js. The metrics are derived from mock Lighthouse audits for demonstration purposes, simulating real-world outcomes.

## Results Summary

| Metric | CSR | SSR | SSG (ISR 60s) |
| --- | --- | --- | --- |
| Performance Score (Desktop) | 70 | 85 | 99 |
| TTFB (ms) | 50 | 400 | 30 |
| LCP (ms) | 2500 | 800 | 300 |
| TBT (ms) | 150 | 300 | 10 |
| curl test (content visible) | ✗ | ✓ | ✓ |

### Analysis of the Results

1. **CSR (Client-Side Rendering):** Has the worst LCP because the browser first has to download the JavaScript bundle and make an API request to fetch products before any content is rendered. The TTFB is small since the initial HTML shell is minimal and static.
2. **SSR (Server-Side Rendering):** Provides much better LCP than CSR as the HTML is pre-populated on the server. However, its TTFB is the highest since the server processes API requests and renders HTML on every incoming request.
3. **SSG (Static Site Generation):** Outperforms the other two dramatically across the board. The TTFB is the lowest because the HTML is already built and served from a CDN edge node. It offers the fastest LCP and the highest Lighthouse performance scores.

---

### Decision Chart

When to choose which rendering strategy based on the specific type of web page:

| Page Type | Recommended Strategy | Why? |
| --- | --- | --- |
| **A marketing landing page** | **SSG** | Marketing pages need the fastest load times to minimize bounce rates and the best SEO to drive organic traffic. Content changes infrequently, making build-time generation ideal. |
| **An e-commerce product search results page** | **SSR / CSR** | Search results are highly dynamic and depend on user query parameters. SSR is better for SEO and initial load, whereas CSR with a robust search API is good for highly interactive, complex filtering without page reloads. |
| **A user's personal dashboard (behind a login)** | **CSR** | Content is user-specific and hidden behind authentication. SEO is irrelevant for private pages. CSR provides a snappy, app-like experience once the initial JS is downloaded. |
| **A documentation site** | **SSG** | Documentation consists of primarily static text content that needs to be fast and SEO-friendly. Changes happen via commits, easily triggering new static builds. |
| **A blog** | **SSG (with ISR)** | Blogs require excellent SEO and fast initial paints. Since posts don't change constantly, SSG is perfect. ISR ensures newly published posts or edits become visible without fully rebuilding the whole site. |
