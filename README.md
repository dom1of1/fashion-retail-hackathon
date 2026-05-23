# Fit-Check

Fit-Check is a virtual try-on web app and e-commerce platform for the Mensah luxury menswear brand. It allows users to see a preview of how an outfit looks on them.

Try here: [https://mr-mensah.netlify.app/](https://mr-mensah.netlify.app/)

## Features

- **Virtual Try-On**: Upload a full body image to see an AI-generated preview of the clothing.
- **E-Commerce Integration**: API backend and integration with hackathon provided campaign/inventory endpoints.
- **WhatsApp Checkout**: Seamless checkout flow using WhatsApp integration.

## Technologies Used

- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **AI Model**: Replicate API (idm-vton)
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
