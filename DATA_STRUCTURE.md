# Devi's Gym - Data Structure Documentation

## 📂 File Organization

### Core Data Files

```
data/
├── business.ts              # Business information, hours, location
├── business-config.ts       # Centralized business configuration
├── contact.ts               # Contact information and social links
├── membership.ts            # Membership plans and pricing ✓
├── trainers.ts              # Trainer profiles and class schedule ✓
├── services.ts              # Programs and services offered ✓
├── gym.ts                   # Gym features and facilities ✓
├── gallery.ts               # Photo gallery data
├── testimonials.ts          # Customer testimonials
├── about.ts                 # About section content
├── navigation.ts            # Site navigation structure
└── social.ts                # Social media links
```

## 📊 Data Models

### Membership Plan Structure

```typescript
{
  id: string;              // Unique identifier
  name: string;            // Plan name (e.g., "1 Year")
  subtitle: string;        // Description (e.g., "Ultimate commitment")
  price: number;           // Price in NPR (e.g., 18000)
  currency: string;        // Currency code "NPR"
  currencySymbol: string;  // Display symbol "₹"
  duration: string;        // Duration display (e.g., "/year")
  order: number;           // Display order (1-7)
  features: string[];      // List of included features
  available: boolean;      // Availability status
  popular?: boolean;       // Mark as most popular
}
```

### Current Membership Plans (7 Total)

1. **Admission Fee** - ₹500 (one-time)
2. **Per Day** - ₹300 (/day)
3. **15 Days** - ₹2,000 (/15 days)
4. **1 Month** - ₹2,500 (/month) ⭐ Most Popular
5. **3 Months** - ₹6,000 (/3 months)
6. **6 Months** - ₹11,000 (/6 months)
7. **1 Year** - ₹18,000 (/year)

### Trainer Structure

```typescript
{
  id: string;              // Unique identifier
  name: string;            // Trainer name
  role: string;            // Role/title
  specialization: string[];// Areas of expertise
  certified: boolean;      // Certification status
  image?: string;          // Profile image path
}
```

### Current Trainers (5 Total)

**Certified Trainers:**
- Anup Grg
- Aditya Grg
- Abhishek Mishra
- Bijay Grg

**Zumba Trainer:**
- Barsha Grg

### Class Schedule Structure

```typescript
{
  id: string;              // Unique identifier
  activity: string;        // Class name
  time: string;            // Time slot
  days: string;            // Schedule days
  trainer?: string;        // Trainer name (optional)
  available: boolean;      // Availability status
}
```

### Current Schedule (3 Classes)

1. **Cardio** - 6:00 AM – 7:00 AM (Daily except Saturday)
2. **Zumba** - 6:00 AM – 7:00 AM (Tuesday & Friday) - Barsha Grg
3. **Gym Training** - Throughout the day (Daily except Saturday)

## 🎯 Key Business Rules

### Operating Hours
- **Open:** Monday-Friday, Sunday (5:00 AM - 9:00 PM)
- **Closed:** Saturday (Weekly holiday)

### Membership Features
- Admission fee is one-time only
- Per day option for trial visits
- Group classes included in 1-month+ plans
- Unlimited classes in 3-month+ plans
- Priority support in 6-month+ plans
- Best value per month in 1-year plan

### Programs Offered
1. **Gym Training**
   - Weightlifting
   - Cardio
   - CrossFit
   - Aerobics

2. **Group Classes**
   - Zumba (Tuesday & Friday)
   - Aerobics
   - Cardio sessions (Daily)

3. **Other**
   - Outdoor activities

## 🔧 Component Usage

### Using Membership Data

```typescript
import { membershipPlans } from "@/data/membership";

// Display price with currency symbol
{plan.currencySymbol}{plan.price.toLocaleString('en-IN')}

// Output: ₹18,000
```

### Using Trainer Data

```typescript
import { trainers, classSchedule } from "@/data/trainers";

// Get all certified trainers
const certifiedTrainers = trainers.filter(t => t.certified);

// Get Zumba classes
const zumbaClasses = classSchedule.filter(c => 
  c.activity.toLowerCase().includes('zumba')
);
```

### Using Business Config

```typescript
import { businessConfig } from "@/data/business-config";

// Get contact info
const phone = businessConfig.contact.phone; // "9806641537"
const email = businessConfig.contact.email; // "devisgym@gmail.com"

// Get operating hours
const hours = businessConfig.hours.display;
// "Mon-Fri, Sun: 5:00 AM - 9:00 PM | Sat: Closed"
```

## ✅ Data Verification Checklist

- [x] All membership plans have correct pricing
- [x] Currency symbol (₹) displays correctly
- [x] All 5 trainers are listed
- [x] Class schedule matches business hours
- [x] Contact information is up to date
- [x] Operating hours include Saturday closure
- [x] Social media links are active
- [x] Location coordinates are accurate
- [x] Established year is 2018
- [x] Brand colors are documented

## 🔄 Update Process

When updating business information:

1. **Primary Location:** Update `data/membership.ts` for pricing
2. **Trainers:** Update `data/trainers.ts` for staff changes
3. **Hours/Contact:** Update `data/business.ts` for basic info
4. **Documentation:** Update `BUSINESS_INFO.md` for reference
5. **Central Config:** Update `data/business-config.ts` for consistency

---

*Last Updated: January 2025*
*All data verified and synchronized across application*
