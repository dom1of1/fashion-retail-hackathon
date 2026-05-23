# Fit-Check

Fit-Check is a virtual try-on web app and e-commerce platform for the Mensah luxury menswear brand. It allows users to see an AI-generated 3D preview of how an outfit looks on them.

## Features

- **Virtual Try-On**: Upload a selfie and a clothing image to see an AI-generated preview.
- **3D Viewer**: Interactive 3D visualization of the try-on result.
- **E-Commerce Integration**: API backend and integration with hackathon campaign/inventory endpoints.
- **WhatsApp Checkout**: Seamless checkout flow using WhatsApp integration.

## Technologies Used

- **Frontend**: React (Vite), Three.js
- **Backend**: Node.js + Express
- **AI Model**: Replicate API (VITON-HD)
- **Styling**: Vanilla CSS (CSS Modules) / Tailwind CSS

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file in the root directory and add your Replicate API token:
   ```env
   VITE_REPLICATE_API_TOKEN=your_token_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## License

MIT
