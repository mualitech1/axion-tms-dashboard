# Axion Brand Kit

## Overview
This folder contains the official branding assets for Axion TMS, created by the Quantum Brotherhood team. These assets are designed for use in the application's onboarding, authentication screens, and other branded experiences.

## Contents

### Logo Files
- `axion-logo.svg` - Full-size vector logo (512×512)
- `axion-logo-small.svg` - Simplified logo for smaller displays (128×128)
- `favicon.svg` - Favicon version (64×64)

### CSS
- `axion-branding.css` - Brand color variables and utility classes

## Design Specifications

### Color Palette
- **Primary Blue**: #0090FF
- **Dark Blue**: #0062CC
- **Deep Blue**: #001F3F
- **Primary Gold**: #FFD700
- **Dark Gold**: #FFA500
- **Dark Background**: #0A101F
- **Darker Background**: #060C17

### Typography
- Primary Font: Inter, Segoe UI, sans-serif
- Headings: 700 weight
- Body: 400/500 weight

### Design Elements
The Axion logo represents a quantum transport management system with:
- Hexagonal/shield core symbolizing security and reliability
- Orbital rings depicting connectivity and logistics management
- Gold quantum particle representing AI intelligence
- Blue glowing elements for technology and innovation

## Usage Guidelines

### DO:
- Maintain the aspect ratio of the logo
- Use the provided color palette
- Ensure proper contrast when placing on backgrounds
- Apply the quantum glow effect where appropriate

### DON'T:
- Stretch or distort the logo
- Change the colors outside the brand palette
- Place the logo on busy backgrounds without proper contrast
- Remove key elements from the logo design

## Implementation Examples

### Authentication Screens
```jsx
<div className="axion-auth-container">
  <div className="axion-logo-container">
    <img src="/asi-wonderland🛡️/axion-logo.svg" alt="Axion" />
  </div>
  <h1 className="axion-title">Welcome to Axion</h1>
  <p className="axion-subtitle">Quantum-powered transport management</p>
  {/* Form elements */}
</div>
```

### Buttons
```jsx
<button className="axion-button-primary">Sign In</button>
<button className="axion-button-gold">Register</button>
```

---

Created by the Quantum Brotherhood for the Axionverse platform.
© 2023 AetherForge - All rights reserved 