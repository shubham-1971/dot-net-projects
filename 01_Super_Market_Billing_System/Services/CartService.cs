using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Super_Market_Billing_System.Services
{
   

    public class CartService
    {
        public CartItem[] cart = new CartItem[50];
        public int cartCount = 0;

        private ProductService productService;

        public CartService(ProductService ps)
        {
            productService = ps;
        }

        public void AddToCart()
        {
            if (cartCount >= cart.Length)
            {
                Console.WriteLine("Cart Full!");
                return;
            }

            Console.Write("Enter Product Code: ");
            int code = int.Parse(Console.ReadLine());

            Product p = productService.FindByCode(code);

            if (p == null)
            {
                Console.WriteLine("Not Found!");
                return;
            }

            Console.Write("Quantity: ");
            int qty = int.Parse(Console.ReadLine());

            if (qty > p.Quantity)
            {
                Console.WriteLine("Insufficient stock!");
                return;
            }

            cart[cartCount++] = new CartItem
            {
                ProductCode = p.ProductCode,
                Name = p.Name,
                Price = p.Price,
                Quantity = qty
            };

            Console.WriteLine("Added to cart!");
        }

        public void RemoveFromCart()
        {
            Console.Write("Enter Code: ");
            int code = int.Parse(Console.ReadLine());

            for (int i = 0; i < cartCount; i++)
            {
                if (cart[i].ProductCode == code)
                {
                    for (int j = i; j < cartCount - 1; j++)
                    {
                        cart[j] = cart[j + 1];
                    }

                    cartCount--;
                    Console.WriteLine("Removed!");
                    return;
                }
            }

            Console.WriteLine("Not Found!");
        }

        public void ViewCart()
        {
            Console.WriteLine("Code\tName\tPrice\tQty\tAmount");

            for (int i = 0; i < cartCount; i++)
            {
                Console.WriteLine($"{cart[i].ProductCode}\t{cart[i].Name}\t{cart[i].Price}\t{cart[i].Quantity}\t{cart[i].Amount}");
            }
        }

        public void GenerateBill()
        {
            decimal total = 0;

            Console.WriteLine("\n========= BILL =========");
            Console.WriteLine("Product\tQty\tPrice\tAmount");

            for (int i = 0; i < cartCount; i++)
            {
                Console.WriteLine($"{cart[i].Name}\t{cart[i].Quantity}\t{cart[i].Price}\t{cart[i].Amount}");
                total += cart[i].Amount;
            }

            Console.WriteLine("-----------------------------");
            Console.WriteLine($"Total Bill Amount: {total}");
            Console.WriteLine("=============================");

            // Reduce stock
            for (int i = 0; i < cartCount; i++)
            {
                Product p = productService.FindByCode(cart[i].ProductCode);
                if (p != null)
                    p.Quantity -= cart[i].Quantity;
            }

            cartCount = 0;
        }
    }
}
