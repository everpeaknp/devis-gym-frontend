# Devi's Gym - Complete Data Overview

## 📊 Business Logic Organization

```
┌─────────────────────────────────────────────────────────────┐
│                    DEVI'S GYM DATA LAYER                    │
│                     Established: 2018                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  MEMBERSHIP PLANS (₹ NPR)                                   │
├─────────────────────────────────────────────────────────────┤
│  1. Admission Fee      ₹500      one-time                   │
│  2. Per Day            ₹300      /day                       │
│  3. 15 Days            ₹2,000    /15 days                   │
│  4. 1 Month ⭐         ₹2,500    /month (Most Popular)      │
│  5. 3 Months           ₹6,000    /3 months                  │
│  6. 6 Months           ₹11,000   /6 months                  │
│  7. 1 Year             ₹18,000   /year (Best Value)         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  TRAINERS & STAFF                                           │
├─────────────────────────────────────────────────────────────┤
│  Certified Trainers (4):                                    │
│    • Anup Grg          → Strength Training, CrossFit        │
│    • Aditya Grg        → Weightlifting, Cardio             │
│    • Abhishek Mishra   → General Fitness, Aerobics         │
│    • Bijay Grg         → Strength Training, Cardio         │
│                                                             │
│  Zumba Trainer (1):                                         │
│    • Barsha Grg        → Zumba, Aerobics, Dance Fitness    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  CLASS SCHEDULE                                             │
├─────────────────────────────────────────────────────────────┤
│  Activity          Time              Days                   │
│  ─────────────────────────────────────────────────────────  │
│  Cardio            6:00 AM - 7:00 AM Daily (except Sat)     │
│  Zumba             6:00 AM - 7:00 AM Tuesday & Friday       │
│  Gym Training      All Day           Daily (except Sat)     │
│  CLOSED            ───                Saturday              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  PROGRAMS & SERVICES                                        │
├─────────────────────────────────────────────────────────────┤
│  Gym Training:                                              │
│    ✓ Weightlifting                                          │
│    ✓ Cardio                                                 │
│    ✓ CrossFit                                               │
│    ✓ Aerobics                                               │
│                                                             │
│  Group Classes:                                             │
│    ✓ Zumba                                                  │
│    ✓ Aerobics                                               │
│                                                             │
│  Other:                                                     │
│    ✓ Outdoor Activities                                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  OPERATING HOURS                                            │
├─────────────────────────────────────────────────────────────┤
│  Monday    → 5:00 AM - 9:00 PM                              │
│  Tuesday   → 5:00 AM - 9:00 PM                              │
│  Wednesday → 5:00 AM - 9:00 PM                              │
│  Thursday  → 5:00 AM - 9:00 PM                              │
│  Friday    → 5:00 AM - 9:00 PM                              │
│  Saturday  → CLOSED (Weekly Holiday)                        │
│  Sunday    → 5:00 AM - 9:00 PM                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  CONTACT INFORMATION                                        │
├─────────────────────────────────────────────────────────────┤
│  Phone:     9806641537                                      │
│  WhatsApp:  9806641537                                      │
│  Email:     devisgym@gmail.com                              │
│                                                             │
│  Address:                                                   │
│  Near Davidfall, Street No: 18                              │
│  Davidfall-17, Pokhara                                      │
│  Gandaki Province, Nepal 33700                              │
│                                                             │
│  Maps: https://maps.app.goo.gl/X1WJEYrXmdEHGc4K7           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  SOCIAL MEDIA                                               │
├─────────────────────────────────────────────────────────────┤
│  Facebook:  /DevisGym                                       │
│  Instagram: @devisgym_pokhara                               │
│  TikTok:    @devisgymcafepokhara                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  BRAND IDENTITY                                             │
├─────────────────────────────────────────────────────────────┤
│  Colors:     Gray, Black, White                             │
│  Highlight:  Neon Yellow (rgb(225, 255, 0))                │
│  Tagline:    "TRAIN. FUEL. REPEAT."                        │
└─────────────────────────────────────────────────────────────┘
```

## 📁 File Structure

```
devis-gym-frontend/
│
├── data/
│   ├── membership.ts          ✅ All 7 pricing plans
│   ├── trainers.ts           ✅ 5 trainers + schedule
│   ├── business.ts           ✅ Core business info
│   ├── business-config.ts    ✅ Central config
│   ├── contact.ts            ✅ Contact & social
│   ├── services.ts           ✅ 4 programs
│   ├── gym.ts                ✅ Gym features
│   └── ...
│
├── components/sections/
│   ├── MembershipSection.tsx  → Displays pricing
│   ├── ContactSection.tsx     → Displays contact
│   └── ...
│
└── docs/
    ├── BUSINESS_INFO.md       → Human-readable reference
    ├── DATA_STRUCTURE.md      → Technical documentation
    ├── README_BUSINESS.md     → Quick developer guide
    └── DATA_OVERVIEW.md       → This file
```

## 🎯 Data Relationships

```
businessConfig
    │
    ├─→ contact → phone, email, whatsapp
    ├─→ location → address, maps
    ├─→ hours → operating schedule
    ├─→ membership → pricing plans
    ├─→ staff → trainers
    ├─→ programs → services
    └─→ schedule → classes

membershipPlans (Array)
    │
    ├─→ [0] Admission Fee (₹500)
    ├─→ [1] Per Day (₹300)
    ├─→ [2] 15 Days (₹2,000)
    ├─→ [3] 1 Month (₹2,500) ⭐
    ├─→ [4] 3 Months (₹6,000)
    ├─→ [5] 6 Months (₹11,000)
    └─→ [6] 1 Year (₹18,000)

trainers (Array)
    │
    ├─→ [0] Anup Grg (Certified)
    ├─→ [1] Aditya Grg (Certified)
    ├─→ [2] Abhishek Mishra (Certified)
    ├─→ [3] Bijay Grg (Certified)
    └─→ [4] Barsha Grg (Zumba)

classSchedule (Array)
    │
    ├─→ [0] Cardio (6-7 AM Daily)
    ├─→ [1] Zumba (6-7 AM Tue/Fri)
    └─→ [2] Gym Training (All Day)
```

## ✅ Verification Checklist

### Membership Data
- [x] 7 plans defined (Admission to 1 Year)
- [x] All prices in NPR with ₹ symbol
- [x] Features progressively increase
- [x] 1 Month marked as "Most Popular"
- [x] Durations clearly labeled
- [x] Order property (1-7) set

### Trainer Data
- [x] 4 certified trainers listed
- [x] 1 Zumba trainer listed
- [x] Specializations defined
- [x] All marked as certified: true

### Schedule Data
- [x] Cardio daily (except Saturday)
- [x] Zumba twice weekly
- [x] Gym training all day
- [x] Saturday marked as closed

### Business Data
- [x] Hours: 5 AM - 9 PM (Mon-Fri, Sun)
- [x] Saturday: Closed
- [x] Phone: 9806641537
- [x] Email: devisgym@gmail.com
- [x] WhatsApp: 9806641537
- [x] Established: 2018

### Display Logic
- [x] Currency symbol displays as ₹
- [x] Numbers formatted with commas
- [x] Durations show with slash (e.g., /year)
- [x] Popular badge shows on 1 Month
- [x] Features listed as bullet points

---

## 🔄 Update Workflow

```
1. Update Data Files
   ↓
2. Verify in Browser
   ↓
3. Update Documentation
   ↓
4. Commit Changes
```

---

*Complete visual overview of Devi's Gym business logic*  
*All data organized and ready for development*  
*Last Updated: January 2025*
