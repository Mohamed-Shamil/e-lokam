# Install e-Lokam App on Mobile via USB Cable

## Prerequisites

### For Android:
1. **Android Studio** - Download from [developer.android.com/studio](https://developer.android.com/studio)
2. **Enable Developer Options** on your Android phone:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
   - Go back to Settings → Developer Options
   - Enable "USB Debugging"
3. **USB Cable** - Connect phone to computer

### For iOS (macOS only):
1. **Xcode** - Download from Mac App Store
2. **Apple Developer Account** (free account works for testing)
3. **USB Cable** - Connect iPhone to Mac

---

## Step-by-Step Instructions

### Step 1: Build the Web App
```bash
npm run build
```
This creates the `build` folder with your web app.

### Step 2: Initialize Capacitor (First Time Only)
```bash
npx cap init
```
When prompted:
- **App name**: `e-Lokam`
- **App ID**: `com.elokam.panchayat` (or press Enter to use default)
- **Web dir**: `build` (press Enter)

### Step 3: Add Android Platform
```bash
npx cap add android
```
This creates the `android` folder with native Android project.

### Step 4: Sync Web Assets to Android
```bash
npx cap sync
```
This copies your built web app into the Android project.

### Step 5: Connect Your Phone via USB

**Android:**
1. Connect your Android phone to computer via USB cable
2. On your phone, when prompted, tap "Allow USB Debugging" and check "Always allow from this computer"
3. Verify connection:
   ```bash
   adb devices
   ```
   You should see your device listed.

**iOS (macOS only):**
1. Connect iPhone to Mac via USB
2. Trust the computer on your iPhone if prompted
3. In Xcode, your device should appear in the device list

### Step 6: Open in Android Studio / Xcode

**Android:**
```bash
npx cap open android
```
This opens Android Studio.

**iOS (macOS only):**
```bash
npx cap open ios
```
This opens Xcode.

### Step 7: Run on Your Device

**In Android Studio:**
1. Wait for Gradle sync to complete (first time takes a few minutes)
2. At the top, you'll see a device selector dropdown
3. Select your connected phone from the list
4. Click the green "Run" button (▶️) or press `Shift + F10`
5. The app will build and install on your phone

**In Xcode (iOS):**
1. Select your iPhone from the device dropdown at the top
2. Click the "Run" button (▶️) or press `Cmd + R`
3. You may need to trust your developer certificate on the phone (Settings → General → Device Management)

---

## Quick Commands Summary

```bash
# 1. Build web app
npm run build

# 2. Initialize Capacitor (first time only)
npx cap init

# 3. Add Android platform (first time only)
npx cap add android

# 4. Sync web assets to native project
npx cap sync

# 5. Open in Android Studio
npx cap open android

# Then click Run button in Android Studio
```

---

## Troubleshooting

### Android Issues:

**Device not detected:**
```bash
# Check if device is connected
adb devices

# If no devices, try:
adb kill-server
adb start-server
adb devices
```

**USB Debugging not working:**
- Make sure USB Debugging is enabled in Developer Options
- Try a different USB cable
- Try a different USB port
- On phone: Settings → Developer Options → Revoke USB debugging authorizations, then reconnect

**Gradle build fails:**
- Make sure Android Studio is fully installed
- Open Android Studio and let it download SDK components
- File → Invalidate Caches → Invalidate and Restart

**App crashes on phone:**
- Check Android Studio Logcat for errors
- Make sure you ran `npm run build` before `npx cap sync`
- Try: `npx cap sync` again

### iOS Issues (macOS only):

**Device not trusted:**
- On iPhone: Settings → General → Device Management → Trust your developer account

**Code signing error:**
- In Xcode: Select project → Signing & Capabilities → Select your team
- Free Apple Developer account works for testing

---

## Alternative: Direct APK Installation (Android)

If you want to install without Android Studio:

1. Build the app in Android Studio (even without device connected)
2. APK will be generated at: `android/app/build/outputs/apk/debug/app-debug.apk`
3. Copy this APK to your phone
4. On phone: Settings → Security → Enable "Install from Unknown Sources"
5. Open the APK file on your phone to install

---

## Notes

- **First build takes time**: Android Studio downloads dependencies (5-10 minutes)
- **Internet required**: For downloading Android SDK components
- **Phone must stay connected**: During first build and installation
- **Subsequent builds**: Much faster (30 seconds to 2 minutes)

---

## After Installation

Once installed, the app works like any other app on your phone:
- ✅ All your mock data works
- ✅ All features functional
- ✅ Can be used offline (web assets are bundled)
- ✅ Native device features available (camera, filesystem, etc.)

