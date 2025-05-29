# Elegance Restaurant Web Application

Elegance is a modern, production-ready restaurant website built with React, TypeScript, and Tailwind CSS. It provides an elegant online presence for fine dining establishments, featuring interactive menus, online ordering, location details, customer feedback, and more.

## Features

- **Homepage:** Hero section, restaurant story, featured dishes slider, latest news, Instagram feed, newsletter, and reservation form.
- **Menu:** Interactive menu with categories, dietary labels, seasonal/featured items, and PDF download option.
- **Order Online:** Search, filter, add to cart, cart summary, order tracking, and delivery/pickup info.
- **Locations:** List and detail view of restaurant locations, virtual tour, and private event info.
- **Feedback:** Customer review form, testimonials, and contact info.
- **Navigation:** Responsive navbar and footer with quick links, contact, and newsletter.
- **Error Handling:** Custom 404 page.

## Tech Stack

- **Frontend:** [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Linting:** ESLint

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd elegant-dining-experience
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Open in your browser:**
   ```
   http://localhost:5173
   ```

### Build for Production

```sh
npm run build
# or
yarn build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```sh
npm run preview
# or
yarn preview
```

## Project Structure

```
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── components/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   └── types/
├── public/
├── index.html
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

- **components/**: Reusable UI components (home, menu, order, feedback, locations, common)
- **data/**: Static data for menu, locations, reviews, news
- **layouts/**: Layout components (e.g., MainLayout)
- **pages/**: Route-level components (Home, Menu, OrderOnline, Locations, Feedback, NotFound)
- **types/**: TypeScript interfaces and types

## Customization

- **Branding:** Update colors and fonts in [`tailwind.config.js`](tailwind.config.js).
- **Menu & Locations:** Edit data in [`src/data/menuItems.ts`](src/data/menuItems.ts) and [`src/data/locations.ts`](src/data/locations.ts).
- **Images:** Replace image URLs in data files or components as needed.
- **Newsletter:** Integrate with your email marketing provider in [`src/components/home/Newsletter.tsx`](src/components/home/Newsletter.tsx).

## Accessibility & Responsiveness

- Fully responsive design for mobile, tablet, and desktop.
- Accessible forms and navigation.
- Keyboard navigation supported.


## License

[MIT](LICENSE)

---

**Developed by Elvis Baidoo**

For questions or support, contact [info@elegance.com](mailto:info@elegance.com).
