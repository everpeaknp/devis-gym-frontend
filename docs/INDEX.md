# Devi's Gym - Documentation Index

Welcome to the Devi's Gym website documentation. This index helps you find the right information quickly.

## 📚 Documentation Files

### For Business Reference
- **[BUSINESS_INFO.md](../BUSINESS_INFO.md)** - Complete business information in readable format
  - General information (name, hours, contact)
  - Membership fees and plans
  - Trainers and staff
  - Programs and services
  - Class schedule
  - Location and social media

### For Developers
- **[README_BUSINESS.md](../README_BUSINESS.md)** - Quick developer reference
  - Quick access to essential info
  - File locations
  - Code examples
  - Common tasks
  
- **[DATA_STRUCTURE.md](../DATA_STRUCTURE.md)** - Technical data structure
  - File organization
  - Data models and types
  - Business rules
  - Component usage examples
  - Update checklist

- **[DATA_OVERVIEW.md](./DATA_OVERVIEW.md)** - Visual data overview
  - ASCII diagrams of data structure
  - File relationships
  - Verification checklist
  - Update workflow

## 🗂️ Data Files Location

All business data is stored in the `data/` directory:

```
data/
├── business.ts           # Core business information
├── business-config.ts    # Centralized configuration
├── membership.ts         # Pricing plans (7 plans)
├── trainers.ts          # Staff and class schedule
├── contact.ts           # Contact information
├── services.ts          # Programs and services
├── gym.ts              # Gym features
├── gallery.ts          # Photo gallery
├── testimonials.ts     # Customer reviews
├── about.ts            # About content
├── navigation.ts       # Navigation structure
└── social.ts           # Social media links
```

## 🎯 Quick Links

### Essential Information
- **Phone/WhatsApp:** 9806641537
- **Email:** devisgym@gmail.com
- **Hours:** Mon-Fri, Sun: 5 AM - 9 PM | Sat: Closed
- **Location:** Davidfall-17, Pokhara, Nepal

### Key Data
- **7 Membership Plans:** ₹500 to ₹18,000
- **5 Trainers:** 4 certified + 1 Zumba
- **3 Class Types:** Cardio, Zumba, Gym Training
- **4 Programs:** Weightlifting, Cardio, CrossFit, Aerobics

## 📖 How to Use This Documentation

### If you are a...

**Business Owner / Manager:**
→ Start with [BUSINESS_INFO.md](../BUSINESS_INFO.md)

**Developer (New to Project):**
→ Start with [README_BUSINESS.md](../README_BUSINESS.md)

**Developer (Working on Data):**
→ Use [DATA_STRUCTURE.md](../DATA_STRUCTURE.md)

**Designer / Content Creator:**
→ Reference [DATA_OVERVIEW.md](./DATA_OVERVIEW.md)

**Quality Assurance:**
→ Use verification checklists in all docs

## 🔍 Common Questions

### Where do I update prices?
→ `data/membership.ts`

### How do I add a new trainer?
→ `data/trainers.ts`

### Where are the operating hours?
→ `data/business.ts` and `data/contact.ts`

### How do I change contact info?
→ `data/business.ts` and `data/contact.ts`

### Where are class schedules?
→ `data/trainers.ts` (classSchedule array)

### How do I add a new service?
→ `data/services.ts`

## ✅ Data Verification Status

Last verified: January 2025

- ✅ All 7 membership plans verified
- ✅ All 5 trainers verified
- ✅ Class schedule verified
- ✅ Operating hours verified
- ✅ Contact information verified
- ✅ Location details verified
- ✅ Social media links verified
- ✅ Programs and services verified

## 🔄 Update History

| Date | Change | Files Updated |
|------|--------|---------------|
| Jan 2025 | Initial business data organization | All data files |
| Jan 2025 | Added ₹ currency symbol | membership.ts |
| Jan 2025 | Complete documentation created | All .md files |

## 📝 Contributing

When updating business information:

1. **Update the data files** in `data/` directory first
2. **Test in development** to verify changes display correctly
3. **Update documentation** to reflect changes
4. **Verify all related files** are synchronized

## 🆘 Need Help?

- Check the appropriate documentation file above
- Review code examples in `README_BUSINESS.md`
- Look at data structures in `DATA_STRUCTURE.md`
- Reference visual overview in `DATA_OVERVIEW.md`

---

*Devi's Gym Website Documentation*  
*All information organized and verified*  
*Last Updated: January 2025*
