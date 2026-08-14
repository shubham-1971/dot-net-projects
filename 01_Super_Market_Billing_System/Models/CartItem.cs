using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Super_Market_Billing_System
{
    public class CartItem
    {
        public int ProductCode { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal Amount => Price * Quantity;
    }
}
