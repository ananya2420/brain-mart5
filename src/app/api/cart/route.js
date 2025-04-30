// app/api/cart/route.js

let cart = [
    { id: 1, name: "Canon 600D", price: 600, quantity: 1, img: "/images/canon.png" },
    { id: 2, name: "Lense", price: 1100, quantity: 1, img: "/images/canon1.png" },
  ];
  
  // Handle GET request to fetch the cart data
  export async function GET() {
    return new Response(JSON.stringify(cart), {
      status: 200,
    });
  }
  
  // Handle PATCH request to update item quantity in the cart
  export async function PATCH(req) {
    const { id, delta } = await req.json();
  
    const item = cart.find((i) => i.id === id);
    if (!item) {
      return new Response(JSON.stringify({ error: "Item not found" }), {
        status: 404,
      });
    }
  
    // Update the item quantity ensuring it's at least 1
    item.quantity = Math.max(1, item.quantity + delta);
  
    return new Response(JSON.stringify(item), {
      status: 200,
    });
  }
  