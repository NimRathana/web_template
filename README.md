khawin_web/
├── app/                           # Next.js App Router pages
│   ├── api/
│   │   └── auth/                  # NextAuth API route
│   │       └── [...nextauth]/route.ts
│   ├── dashboard/                  # Example dashboard page
│   │   └── page.tsx
│   ├── users/                      # Example users page
│   │   └── page.tsx
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Home page
│
├── components/                     # Reusable UI components
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Navbar.tsx
│   │   └── Layout.tsx
│   ├── charts/                     # Chart components
│   ├── tables/                     # Table components (MUI DataGrid)
│   └── ui/                         # Buttons, Cards, etc.
│
├── theme.ts                        # MUI theme
├── themeRegistry.tsx               # MUI + Emotion SSR wrapper
│
├── services/                       # API calls
│   └── userApi.ts                  # Example fetch users
│
├── hooks/                          # React hooks
│   └── useAuth.ts                  # Example auth hook
│
├── store/                          # Zustand or Redux store
│
├── utils/                          # Helper functions
│
├── public/                         # Static assets (images, icons)
│
├── styles/                         # Global styles (optional Tailwind / CSS)
│
├── package.json
└── next.config.js
