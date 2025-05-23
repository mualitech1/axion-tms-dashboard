# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/10d23370-e679-4cf9-a235-e975540069ac

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/10d23370-e679-4cf9-a235-e975540069ac) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## AetherForge-Specific Features

### ULID Generation System

This project implements Universally Unique Lexicographically Sortable Identifiers (ULIDs) for generating time-ordered, sortable, and URL-friendly identifiers throughout the system.

#### Key Benefits

- **Time-Ordered**: ULIDs naturally sort chronologically when sorted as strings
- **URL-Friendly**: Uses only alphanumeric characters (Crockford's Base32)
- **Unique**: Combines timestamp and randomness for distributed uniqueness
- **Human-Readable**: Easier to distinguish than traditional UUIDs

#### Usage

```typescript
import { generateULID, generatePrefixedId } from './utils/id-utils';

// Generate a standard ULID
const id = generateULID();  // e.g., 01H5ZXVBTPQFRF3AHMS9XPPT8E

// Generate a prefixed ULID
const jobId = generatePrefixedId('job');  // e.g., job_01h5zxvbtpqfrf3ahms9xppt8e
```

#### Documentation

For more details, see the [ID System Documentation](./docs/id-system.md).

### Modular Workflows

The system uses modular n8n workflows for agent creation and management, divided into logical components for better maintainability and error handling.

## Preparing for Production

Follow these steps to get the app ready for production and client testing:

### 1. Set up Environment Variables

Create a `.env.production` file with the following content (replacing with your actual values):

```
VITE_SUPABASE_URL=your-production-supabase-url
VITE_SUPABASE_ANON_KEY=your-production-supabase-anon-key
VITE_APP_ENV=production
```

### 2. Test Core Features

Run the core feature test script to verify that essential functionality works:

```sh
npm run test-core
```

This will test the connection to Supabase and validate Jobs, Customers, and Invoices functionality.

### 3. Build for Production

Build the application for production:

```sh
npm run build
```

This will generate optimized files in the `dist` folder.

### 4. Preview the Production Build Locally

```sh
npm run preview
```

This lets you verify the production build on your local machine before deployment.

### 5. Deploy the Application

Choose one of these deployment options:

#### Option 1: Deploy via Lovable (Recommended for Quick Testing)

1. Open [Lovable](https://lovable.dev/projects/10d23370-e679-4cf9-a235-e975540069ac)
2. Click on Share -> Publish
3. Share the provided URL with your client

#### Option 2: Deploy to Netlify, Vercel, or Firebase

Follow the steps for your preferred hosting service, but make sure to:
- Set the proper environment variables in the hosting platform
- Configure the build command as `npm run build`
- Set the publish directory as `dist`

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/10d23370-e679-4cf9-a235-e975540069ac) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Map Integration Guide

The driver map integration is currently implemented using placeholder visualization. To integrate a real mapping library, follow these steps:

### Option 1: Leaflet Integration

1. Install Leaflet dependencies:
   ```bash
   npm install leaflet react-leaflet @types/leaflet
   ```

2. Update the `DriversMap.tsx` component to use Leaflet:
   ```tsx
   import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
   import 'leaflet/dist/leaflet.css';
   import L from 'leaflet';

   // Fix for marker icons in React Leaflet
   import icon from 'leaflet/dist/images/marker-icon.png';
   import iconShadow from 'leaflet/dist/images/marker-shadow.png';

   let DefaultIcon = L.icon({
     iconUrl: icon,
     shadowUrl: iconShadow,
     iconSize: [25, 41],
     iconAnchor: [12, 41]
   });
   L.Marker.prototype.options.icon = DefaultIcon;
   ```

3. Replace the placeholder map container with Leaflet's MapContainer:
   ```tsx
   <MapContainer 
     center={[51.505, -0.09]} 
     zoom={13} 
     style={{ height: '400px', width: '100%' }}
   >
     <TileLayer
       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
     />
     {driverLocations.map((driver) => (
       <Marker 
         key={driver.id} 
         position={[driver.location.lat, driver.location.lng]}
       >
         <Popup>
           <div>
             <h3 className="font-semibold">{driver.name}</h3>
             <p>{driver.status}</p>
           </div>
         </Popup>
       </Marker>
     ))}
   </MapContainer>
   ```

### Option 2: Mapbox Integration

1. Create a Mapbox account and get an access token

2. Install dependencies:
   ```bash
   npm install mapbox-gl react-map-gl
   ```

3. Update the component to use Mapbox:
   ```tsx
   import Map, { Marker } from 'react-map-gl';
   import 'mapbox-gl/dist/mapbox-gl.css';

   // Set your access token
   const MAPBOX_TOKEN = 'your-token-here';
   ```

4. Replace the placeholder with Mapbox's Map component:
   ```tsx
   <Map
     mapboxAccessToken={MAPBOX_TOKEN}
     initialViewState={{
       longitude: -0.12,
       latitude: 51.5,
       zoom: 11
     }}
     style={{ width: '100%', height: 400 }}
     mapStyle="mapbox://styles/mapbox/dark-v10"
   >
     {driverLocations.map((driver) => (
       <Marker
         key={driver.id}
         longitude={driver.location.lng}
         latitude={driver.location.lat}
       />
     ))}
   </Map>
   ```

## Future Enhancements

For a production-ready map integration, consider these enhancements:

1. **Geocoding**: Convert driver addresses to coordinates using a geocoding API
2. **Clustering**: Group nearby markers at lower zoom levels
3. **Custom Markers**: Create custom markers that match the quantum design
4. **Route Optimization**: Visualize optimal routes between driver locations
5. **Real-time Updates**: Implement WebSocket updates for real-time driver positions
