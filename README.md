# Visa Intelligence Platform

> A modern, production-ready visa information and document management platform built with Next.js and Supabase.

![Visa Intelligence Platform](https://img.shields.io/badge/Status-Production_Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Supabase](https://img.shields.io/badge/Supabase-Integrated-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## ✨ Features

### For Users
- 🔐 **Secure Authentication** - OAuth integration with Google
- 📁 **Document Vault** - Secure file storage with categorization
- 🔍 **Visa Search** - Intelligent visa discovery and filtering
- 📊 **Processing Tracker** - Real-time visa processing times
- 💎 **Premium Content** - Unlock detailed visa guides

### For Lawyers
- 📝 **Marketing Hub** - Publish articles and updates
- ✅ **Verification Badges** - Lawyer-verified processing times
- 👥 **Client Management** - Track and manage clients
- 📈 **Analytics** - Track content performance

### For Administrators
- 🔍 **Lawyer Verification** - One-click approval workflow
- 📊 **Platform Analytics** - User and lawyer statistics
- ⚙️ **Global Settings** - Pricing and configuration
- 📦 **Content Management** - Manage visa categories

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage Buckets
- **Auth**: Supabase Auth (OAuth)
- **Styling**: Tailwind CSS + Custom Antigravity Design System
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## 📁 Project Structure

```
visa-app/
├── src/
│   ├── app/
│   │   ├── user/          # User dashboard and features
│   │   ├── lawyer/        # Lawyer portal
│   │   ├── admin/         # Admin panel
│   │   └── actions/       # Server Actions (API layer)
│   ├── components/        # Reusable components
│   ├── lib/              # Utilities (toast, errors)
│   └── utils/supabase/   # Supabase clients
├── .env.local            # Development environment variables
└── .env.production.example  # Production template
```

## 🎨 Design System

**"Antigravity" Aesthetic** - Futuristic glassmorphism with deep space theme:
- Mesh gradient backgrounds
- Glass UI components with blur effects
- Smooth animations and micro-interactions
- Dark mode optimized color palette
- Responsive design for all devices

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/visa-intelligence.git
cd visa-app
```

2. **Install dependencies**
```bash
# If PowerShell blocks npm, see INSTALLATION.md  
npm install
```

3. **Set up environment variables**
```bash
# Copy .env.local.example to .env.local
cp .env.local.example .env.local

# Add your Supabase credentials
```

4. **Run development server**
```bash
npm run dev
```

5. **Open browser**
```
http://localhost:3000
```

For detailed installation steps, see [INSTALLATION.md](../brain/8e2696d4-ffa2-4aca-9dd5-6ead0f453267/INSTALLATION.md)

## 🗄️ Database Setup

The platform uses 7 main tables:

| Table | Purpose |
|-------|---------|
| `profiles` | User accounts with role-based access |
| `visas` | Visa information and pricing |
| `user_documents` | Document metadata and status |
| `news` | Lawyer-published content |
| `trackers` | Processing time submissions |
| `lawyer_profiles` | Extended lawyer information |

**Storage Buckets**:
- `user_documents` (private) - Secure file storage
- `public_assets` (public) - Marketing assets

Migrations are already applied to project ID: `pkjkwxnuoliufvtdvmut`

## 🔧 Configuration

### Environment Variables

**Required**:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Optional**:
```env
NEXT_PUBLIC_PREMIUM_PRICE=49
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

See `.env.production.example` for production setup.

## 🚀 Deployment

Deploy to **Vercel** (recommended):

```bash
# 1. Push to GitHub
git push origin main

# 2. Import to Vercel
# - Go to vercel.com
# - Import repository
# - Add environment variables
# - Deploy!
```

For detailed deployment instructions, see [DEPLOYMENT.md](../brain/8e2696d4-ffa2-4aca-9dd5-6ead0f453267/DEPLOYMENT.md)

### Quick Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 📚 Documentation

- **[Quick Start Guide](../brain/8e2696d4-ffa2-4aca-9dd5-6ead0f453267/QUICKSTART.md)** - Testing and usage
- **[Deployment Guide](../brain/8e2696d4-ffa2-4aca-9dd5-6ead0f453267/DEPLOYMENT.md)** - Production deployment
- **[Installation Guide](../brain/8e2696d4-ffa2-4aca-9dd5-6ead0f453267/INSTALLATION.md)** - Setup troubleshooting
- **[Walkthrough](../brain/8e2696d4-ffa2-4aca-9dd5-6ead0f453267/walkthrough.md)** - Feature overview

## 🔐 Security

- ✅ Row Level Security (RLS) on all tables
- ✅ Middleware-protected routes
- ✅ OAuth authentication
- ✅ Secure file storage with access policies
- ✅ Role-based access control (User, Lawyer, Admin)

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Build verification
npm run build

# Start production server
npm start
```

## 🛠️ Development

### Project Utilities

**Toast Notifications**:
```typescript
import { toast } from '@/lib/toast';
toast.success('Document uploaded!');
toast.error('Upload failed');
```

**Loading States**:
```typescript
import { LoadingSpinner, PageLoader } from '@/components/LoadingSpinner';
<LoadingSpinner size="md" text="Loading..." />
```

**Error Handling**:
```typescript
import { handleError, withErrorHandling } from '@/lib/errors';
const result = await withErrorHandling(async () => await fetchData());
```

## 📊 Performance

- ⚡ Server-side rendering with Next.js 15
- 🎯 Optimized database queries
- 📦 Code splitting and lazy loading
- 🖼️ Image optimization
- 🚀 Edge runtime for auth middleware

## 🎯 Roadmap

- [ ] Email notifications for document status
- [ ] Lawyer-client messaging system
- [ ] Payment integration (Stripe)
- [ ] Real-time chat support
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)

## 📝 License

Private Project - All Rights Reserved

## 🙏 Acknowledgments

- Built with Next.js and Supabase
- Icons by Lucide
- Animations by Framer Motion
- Design inspiration from modern SaaS platforms

---

**Made with ❤️ for immigration professionals and visa applicants**
