# 🔐 Supabase Authentication Configuration Guide

## ✅ Current Configuration Status

Your Axion TMS project is now configured with:
- **Project URL**: `https://pykpcnwfbqlkngdulyuk.supabase.co`
- **Schema**: ✅ ULID-based with 18 tables created
- **Authentication**: Ready for configuration

## 🌐 Required Supabase URL Configuration

### 1. Access Supabase Dashboard
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `pykpcnwfbqlkngdulyuk`
3. Navigate to **Authentication** → **URL Configuration**

### 2. Configure Site URL
Set the **Site URL** to your production domain:
```
https://your-production-domain.com
```

For development, you can temporarily use:
```
http://localhost:3000
```

### 3. Configure Redirect URLs
Add these **Additional Redirect URLs**:

```
http://localhost:3000/**
http://localhost:5173/**
http://localhost:8080/**
https://your-production-domain.com/**
https://*.vercel.app/**
https://*.netlify.app/**
```

## 🔧 Local Development Setup

### Option 1: Development-First (Recommended)
- **Site URL**: `http://localhost:3000`
- **Redirect URLs**: Add your production URLs

### Option 2: Production-First
- **Site URL**: `https://your-production-domain.com`
- **Redirect URLs**: Add `http://localhost:3000/**`

## 📧 Email Template Configuration

If using email authentication, update your email templates:

1. Go to **Authentication** → **Email Templates**
2. Replace `{{ .SiteURL }}` with `{{ .RedirectTo }}` in confirmation emails

Example:
```html
<!-- OLD -->
<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">
  Confirm your email
</a>

<!-- NEW -->
<a href="{{ .RedirectTo }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">
  Confirm your email
</a>
```

## 🧪 Testing Authentication

### 1. Test User Registration
```bash
# Use the test script
node scripts/create-test-user.js
```

### 2. Manual Testing
1. Start your development server: `npm run dev`
2. Navigate to `/auth`
3. Try registering with a new email
4. Check for proper redirects

### 3. Test Accounts
```
Email: master@muali.tech
Password: AxionMaster2024!
Role: admin

Email: kamal@ikbtransport.com  
Password: IKBTransport2024!
Role: admin

Email: test@axion.com
Password: TestUser2024!
Role: operations
```

## 🚨 Common Issues & Solutions

### Issue: "Invalid redirect URL"
**Solution**: Ensure the exact URL is added to Redirect URLs list

### Issue: Redirecting to wrong URL
**Solution**: Check that your `redirectTo` parameter matches an allowed URL

### Issue: "Failed to fetch" errors
**Solution**: Verify your Supabase URL and anon key are correct

### Issue: Authentication works locally but not in production
**Solution**: Update Site URL to production domain and add production URLs to redirect list

## 🔍 Verification Checklist

- [ ] Schema executed successfully (18 tables created)
- [ ] Site URL configured in Supabase dashboard
- [ ] Redirect URLs added for all environments
- [ ] `.env` file has correct VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
- [ ] Email templates updated (if using email auth)
- [ ] Test registration works
- [ ] Test login works
- [ ] Redirects work correctly

## 🎯 Next Steps

1. **Configure URLs in Supabase Dashboard** (most important!)
2. **Test registration** with a new email
3. **Verify role selection** works after login
4. **Test all authentication flows**

## 🆘 Need Help?

If you encounter issues:
1. Check browser console for errors
2. Verify Supabase dashboard configuration
3. Ensure all URLs match exactly
4. Test with different browsers/incognito mode

---

**Ready to build your Axion TMS empire! 🚀** 