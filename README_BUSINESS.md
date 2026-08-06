# Devi's Gym - Business Data Quick Reference

## 🚀 Quick Access

### Essential Info
- **Phone/WhatsApp:** 9806641537
- **Email:** devisgym@gmail.com
- **Hours:** 5 AM - 9 PM (Mon-Fri, Sun) | Closed Saturday
- **Currency:** NPR (₹)

### Pricing Summary
| Plan | Price | Popular |
|------|-------|---------|
| Admission | ₹500 | - |
| Per Day | ₹300 | - |
| 15 Days | ₹2,000 | - |
| 1 Month | ₹2,500 | ⭐ |
| 3 Months | ₹6,000 | - |
| 6 Months | ₹11,000 | - |
| 1 Year | ₹18,000 | - |

### Staff (5 Trainers)
- **Certified:** Anup Grg, Aditya Grg, Abhishek Mishra, Bijay Grg
- **Zumba:** Barsha Grg

### Classes
- **Cardio:** 6-7 AM (Daily except Sat)
- **Zumba:** 6-7 AM (Tue & Fri)
- **Gym Training:** All day (except Sat)

---

## 📁 File Locations

```
data/
├── membership.ts       → 7 membership plans with ₹ pricing
├── trainers.ts        → 5 trainers + class schedule
├── business.ts        → Hours, contact, location
├── business-config.ts → Complete business config
├── services.ts        → 4 programs/services
└── gym.ts            → Gym features & facilities
```

---

## 💻 Code Examples

### Display Price
```tsx
import { membershipPlans } from "@/data/membership";

{plan.currencySymbol}{plan.price.toLocaleString('en-IN')}
// Output: ₹18,000
```

### Get Operating Hours
```tsx
import { businessConfig } from "@/data/business-config";

{businessConfig.hours.display}
// Output: Mon-Fri, Sun: 5:00 AM - 9:00 PM | Sat: Closed
```

### List Trainers
```tsx
import { trainers } from "@/data/trainers";

{trainers.map(trainer => (
  <div key={trainer.id}>
    <h3>{trainer.name}</h3>
    <p>{trainer.role}</p>
  </div>
))}
```

---

## ✨ Key Features

### Membership Plans
✅ 7 different plans (admission to 1 year)  
✅ NPR currency with ₹ symbol  
✅ Detailed feature lists  
✅ "Most Popular" badge for 1-month plan  
✅ Progressive benefits for longer plans  

### Trainers & Classes
✅ 4 certified trainers  
✅ 1 specialized Zumba trainer  
✅ Daily cardio sessions  
✅ Twice-weekly Zumba classes  
✅ All-day gym training access  

### Business Info
✅ Established 2018  
✅ Saturday closed (weekly holiday)  
✅ 5 AM - 9 PM operating hours  
✅ Phone, WhatsApp, Email contact  
✅ Google Maps integration  

---

## 📝 Common Tasks

### Update Prices
**File:** `data/membership.ts`
```typescript
price: 18000,  // Change price here
```

### Add/Remove Trainer
**File:** `data/trainers.ts`
```typescript
trainers.push({
  id: "new-trainer",
  name: "New Trainer",
  role: "Certified Trainer",
  // ...
});
```

### Modify Hours
**File:** `data/business.ts`
```typescript
hours: verified({
  monday: "5:00 AM - 9:00 PM",
  // ...
})
```

### Update Contact
**File:** `data/business.ts` & `data/contact.ts`
```typescript
contact: {
  phone: verified("9806641537"),
  email: verified("devisgym@gmail.com"),
  whatsapp: verified("9806641537"),
}
```

---

## 🎯 Data Consistency

All business data is synchronized across:
- ✅ `data/membership.ts` - Membership pricing
- ✅ `data/trainers.ts` - Staff and schedule
- ✅ `data/business.ts` - Core business info
- ✅ `data/business-config.ts` - Central config
- ✅ `BUSINESS_INFO.md` - Human-readable docs

**When updating:** Change data files first, then update docs!

---

## 🔗 Related Files

- `BUSINESS_INFO.md` - Complete business information
- `DATA_STRUCTURE.md` - Technical data structure
- `components/sections/MembershipSection.tsx` - Pricing UI
- `components/sections/ContactSection.tsx` - Contact UI

---

*Quick reference for developers working on Devi's Gym website*  
*Last Updated: January 2025*
