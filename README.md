# ADmyBRAND Insights - Analytics Dashboard

A modern, visually stunning analytics dashboard for digital marketing agencies built with Next.js 15, React 19, and shadcn/ui.

![Dashboard Preview](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=ADmyBRAND+Insights+Dashboard)

## ✨ Features

### 📊 Dashboard Features

- **Overview Page** with key metrics cards (Revenue, Users, Conversions, Growth %)
- **Interactive Charts** - Line charts, bar charts, and pie/donut charts with hover effects
- **Advanced Data Table** with sorting, filtering, pagination, and search
- **Real-time Data** simulation with live updates
- **Responsive Design** - Perfect on desktop, tablet, and mobile

### 🎨 UI/UX Features

- **Modern Design System** with consistent colors, typography, and spacing
- **Beautiful Visual Hierarchy** with clear information architecture
- **Smooth Animations** using Framer Motion for micro-interactions and transitions
- **Dark/Light Mode Toggle** with smooth theme transitions
- **Loading Skeletons** for better perceived performance
- **Hover Effects** and interactive elements throughout

### ⚡ Technical Features

- **Next.js 15** with App Router and Turbopack
- **React 19** with latest features
- **shadcn/ui** components with custom styling
- **Tailwind CSS v4** for styling
- **Recharts** for beautiful, responsive charts
- **@tanstack/react-table** for advanced table functionality
- **Framer Motion** for smooth animations
- **TypeScript** for type safety
- **Mock Data** with realistic sample analytics data

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ad-my-brand-insights
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Dashboard overview page
│   └── globals.css        # Global styles and CSS variables
├── components/
│   ├── charts/            # Chart components (Line, Bar, Pie)
│   ├── layout/            # Layout components (Header, Sidebar, Dashboard)
│   ├── tables/            # Table components (Campaigns table)
│   └── ui/                # Reusable UI components
├── lib/
│   ├── mock-data.ts       # Sample analytics data
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## 🎯 Key Components

### Metrics Cards

- Revenue, Users, Conversions, Growth Rate
- Animated counters and trend indicators
- Color-coded change indicators

### Interactive Charts

- **Line Chart**: Revenue trends with area fill
- **Multi-Line Chart**: User analytics (new vs returning)
- **Bar Chart**: Performance metrics with hover effects
- **Donut Chart**: Conversion distribution by channel

### Advanced Data Table

- Campaign performance data
- Sortable columns with visual indicators
- Global search and column-specific filters
- Pagination with customizable page sizes
- Row actions (view, edit, pause/resume, delete)
- Export functionality

### Theme System

- Light and dark mode support
- Smooth transitions between themes
- Consistent color variables
- System preference detection

## 🎨 Design System

### Colors

- Primary: Blue-based palette for main actions
- Chart Colors: 5-color palette for data visualization
- Status Colors: Green (success), Yellow (warning), Red (error)
- Neutral Colors: Comprehensive grayscale for text and backgrounds

### Typography

- DM Sans for headings and body text
- Menlo for monospace (numbers, code)
- Responsive font sizes with proper line heights

### Spacing

- 4px base unit with consistent spacing scale
- Responsive padding and margins
- Proper component spacing

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Layouts**: CSS Grid and Flexbox for responsive layouts
- **Touch Friendly**: Proper touch targets and interactions

## 🔧 Customization

### Adding New Charts

1. Create chart component in `src/components/charts/`
2. Use the `ChartWrapper` for consistent styling
3. Implement responsive design and animations

### Adding New Metrics

1. Update `mock-data.ts` with new metric data
2. Add metric card to the dashboard
3. Ensure proper formatting and animations

### Theming

- Modify CSS variables in `globals.css`
- Update color palette in Tailwind config
- Ensure both light and dark modes work

## 🚀 Deployment

### Vercel (Recommended)

```bash
pnpm build
```

Deploy to Vercel with automatic deployments from Git.

### Other Platforms

```bash
pnpm build
pnpm start
```

## 📊 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Bundle Size**: Optimized with tree shaking
- **Loading**: Skeleton screens for perceived performance
- **Animations**: 60fps smooth animations with Framer Motion

## 🛠️ Development

### Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues

### Code Quality

- ESLint with Next.js and React rules
- TypeScript for type safety
- Consistent code formatting
- Component-based architecture

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support, please open an issue in the repository.
