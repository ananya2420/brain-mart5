export async function GET() {
    // List of images (could be fetched from a database or file storage)
    const footerImages = [
      {
        id: 1,
        src: "/images/facebook.png", // Image URL
        alt: "Facebook",
        url: "https://facebook.com",
      },
      {
        id: 2,
        src: "/images/twitter.png", // Image URL
        alt: "Twitter",
        url: "https://twitter.com",
      },
      {
        id: 3,
        src: "/images/linkedin.png", // Image URL
        alt: "LinkedIn",
        url: "https://linkedin.com",
      },
      {
        id: 4,
        src: "/images/instagram.png", // Image URL
        alt: "Instagram",
        url: "https://instagram.com",
      },
      
    ];
  
    return new Response(JSON.stringify(footerImages), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }