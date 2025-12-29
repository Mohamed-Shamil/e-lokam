# Quick Start: Install on Phone via USB

## ✅ Setup Complete!
Your Android project is ready. Follow these steps:

## Step 1: Enable USB Debugging on Your Phone

1. Go to **Settings** → **About Phone**
2. Find **Build Number** and tap it **7 times**
3. Go back to **Settings** → **Developer Options**
4. Enable **USB Debugging**
5. Connect phone to computer via USB cable
6. On phone, when prompted, tap **"Allow USB Debugging"** and check **"Always allow"**

## Step 2: Open Android Studio

Run this command:
```bash
npx cap open android
```

Or manually:
- Open **Android Studio**
- Click **File** → **Open**
- Navigate to: `C:\Users\mohamed shamil\Desktop\e-lokam\New folder\android`
- Click **OK**

## Step 3: Wait for Gradle Sync

- Android Studio will automatically sync Gradle (first time takes 5-10 minutes)
- Wait for "Gradle sync finished" message at the bottom
- If prompted, click "Trust Project"

## Step 4: Connect Your Phone

1. Make sure phone is connected via USB
2. In Android Studio, look at the top toolbar
3. You'll see a device dropdown (may show "No devices")
4. Click the dropdown and select your phone
5. If phone doesn't appear:
   - On phone: Tap "Allow USB Debugging" again
   - In Android Studio: Click the device dropdown → **Troubleshoot Device Connections**

## Step 5: Run the App

1. Click the green **Run** button (▶️) in Android Studio toolbar
   - Or press **Shift + F10**
2. First build takes 2-5 minutes (downloading dependencies)
3. App will automatically install and launch on your phone!

## Troubleshooting

### Phone Not Detected:
```bash
# Check if device is connected
adb devices
```

If no devices:
1. Try different USB cable
2. Try different USB port
3. On phone: Settings → Developer Options → Revoke USB debugging → Reconnect

### Build Errors:
- Make sure you have internet connection (downloads dependencies)
- Wait for Gradle sync to complete
- File → Invalidate Caches → Invalidate and Restart

### App Crashes:
- Check Logcat in Android Studio (bottom panel)
- Make sure you ran `npm run build` before `npx cap sync`

## Next Time (Faster):

After first setup, it's much faster:
```bash
npm run build
npx cap sync
npx cap open android
# Click Run button
```

---

## Alternative: Generate APK File

If you want to install APK directly without Android Studio:

1. In Android Studio: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Wait for build to complete
3. Click **locate** in the notification
4. APK is at: `android/app/build/outputs/apk/debug/app-debug.apk`
5. Copy APK to phone
6. On phone: Enable "Install from Unknown Sources"
7. Open APK file to install

