# ADmyBRAND Insights 📊

A modern, AI-powered analytics dashboard for digital marketing agencies. Built with Next.js 15, React 19, and a beautiful design system featuring smooth animations and comprehensive data visualization.

## ✨ Features

### 📈 Dashboard Analytics

- **Real-time Metrics**: Revenue, Users, Conversions, and Growth tracking
- **Interactive Charts**: Line charts, bar charts, and pie/donut charts with smooth animations
- **Data Tables**: Advanced sorting, filtering, and pagination for campaign data
- **Date Range Filtering**: Preset ranges (7D, 30D, 90D) and custom date selection
- **Export Functionality**: PDF and CSV export with comprehensive data

### 🎨 Modern UI/UX

- **Beautiful Design System**: Consistent colors, typography, and spacing
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Responsive Design**: Perfect experience across desktop, tablet, and mobile
- **Smooth Animations**: Micro-interactions, hover effects, and loading states
- **Loading Skeletons**: Beautiful placeholder content during data loading

### ⚡ Technical Highlights

- **Next.js 15** with App Router and Turbopack for lightning-fast development
- **React 19** with latest features and optimizations
- **shadcn/ui** component library with custom animations
- **Tailwind CSS 4** for modern styling
- **TypeScript** for type safety and better developer experience
- **Recharts** for interactive data visualizations
- **Framer Motion** for smooth animations and transitions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended package manager)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/PPRAMANIK62/ad-my-brand-insights.git
   cd ad-my-brand-insights
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues automatically

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard home page
├── components/
│   ├── charts/            # Chart components (Line, Bar, Pie)
│   ├── dashboard/         # Dashboard-specific components
│   ├── export/            # Export functionality
│   ├── layout/            # Layout components (Header, Sidebar)
│   ├── tables/            # Data table components
│   └── ui/                # Reusable UI components (shadcn/ui)
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and types
└── env.ts                 # Environment configuration
```

## 🎯 Key Components

### Dashboard Metrics

- Revenue tracking with growth indicators
- User acquisition and engagement metrics
- Conversion rate optimization data
- Performance trend analysis

### Interactive Charts

- **Line Chart**: Revenue and user trends over time
- **Bar Chart**: Campaign performance comparison
- **Pie Chart**: Conversion source distribution
- All charts feature smooth animations and responsive design

### Data Management

- Mock data generation for realistic analytics
- Date range filtering with preset and custom options
- Real-time data updates simulation
- Comprehensive export capabilities

## 🛠️ Technology Stack

| Category          | Technology                       |
| ----------------- | -------------------------------- |
| **Framework**     | Next.js 15 with App Router       |
| **Frontend**      | React 19, TypeScript             |
| **Styling**       | Tailwind CSS 4, shadcn/ui        |
| **Charts**        | Recharts                         |
| **Animations**    | Framer Motion                    |
| **Icons**         | Lucide React, Radix Icons        |
| **Data Tables**   | TanStack Table                   |
| **Date Handling** | date-fns, React Day Picker       |
| **Export**        | jsPDF, html2canvas, PapaParse    |
| **Linting**       | ESLint with @antfu/eslint-config |

## 🎨 Design System

The project uses a comprehensive design system built on top of shadcn/ui:

- **Colors**: Carefully crafted color palette with dark/light mode support
- **Typography**: Consistent font hierarchy and spacing
- **Components**: Reusable, accessible components with smooth animations
- **Responsive**: Mobile-first design approach
- **Animations**: Subtle micro-interactions for enhanced UX

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:

- **Desktop**: Full-featured dashboard experience
- **Tablet**: Optimized layout with touch-friendly interactions
- **Mobile**: Streamlined interface with essential metrics

## 🔧 Customization

### Adding New Charts

1. Create a new chart component in `src/components/charts/`
2. Integrate with the dashboard data hooks
3. Add to the dashboard charts section

### Extending Metrics

1. Update the metrics calculation hook
2. Add new metric cards to the dashboard
3. Include in export functionality

### Theme Customization

- Modify `src/app/globals.css` for global styles
- Update Tailwind configuration for custom colors
- Customize component variants in the UI folder

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Recharts](https://recharts.org/) for powerful chart components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Next.js](https://nextjs.org/) for the amazing React framework
