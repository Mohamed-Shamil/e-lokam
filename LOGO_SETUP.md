# Logo Setup Instructions

## Adding the e-Lokam Logo

To use the e-Lokam logo in the app, please follow these steps:

1. **Create a `public` folder** in the project root (if it doesn't exist):
   ```
   public/
   ```

2. **Add the logo image** to the `public` folder:
   - File name: `logo.png`
   - Location: `public/logo.png`
   - Recommended size: 200x200 pixels or higher (square format)
   - Format: PNG with transparent background (preferred)

3. **The logo will automatically appear** in:
   - Top navigation bar (header)
   - Sidebar header
   - Both locations have fallback icons if the logo is not found

## Logo Specifications

Based on the e-Lokam logo description:
- **Format**: PNG (with transparency)
- **Size**: 200x200px minimum (will be scaled down to 40x40px in UI)
- **Background**: Transparent or white
- **Content**: 
  - Circular design with light blue outer ring
  - Map-like shape in light blue
  - Three yellow human figures (community)
  - Dark green government building
  - Two green leaf shapes

## Current Implementation

The logo is referenced as `/logo.png` in the code, which Vite will serve from the `public` folder.

If the logo file is not found, the app will automatically fall back to a simple icon.

