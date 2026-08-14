
using System;
using Delhivery.Models;
using Delhivery.Presentation.Templates;
using Delhivery.Services;

namespace Delhivery.Presentation
{
    internal class App
    {
        private readonly IShipmentService _service;

        public App(IShipmentService service)
        {
            _service = service;
        }

        // Main loop: displays menu and routes user choices
        public void Run()
        {
            bool running = true;

            while (running)
            {
                string[] options = {
                    "Book Shipment",
                    "List Shipments",
                    "Update Status",
                    "Cancel Shipment",
                    "Exit"
                };

                int choice = GUIMenu.ShowMenu(options, "DSIP Console - Main Menu");

                switch (choice)
                {
                    case 0:
                        BookShipment();
                        break;
                    case 1:
                        ListShipments();
                        break;
                    case 2:
                        UpdateStatus();
                        break;
                    case 3:
                        CancelShipment();
                        break;
                    case 4:
                        running = false;
                        Console.WriteLine("  Exiting DSIP Console. Goodbye!");
                        break;
                }
            }
        }

        private void BookShipment()
        {
            Console.Clear();

            AsciiTitle.AsciiArtTitle();
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($" === Booking === \n");
            Console.ResetColor();

            string awb = ConsoleHelper.ReadField("AWBNumber", v =>
            {
                if (string.IsNullOrWhiteSpace(v))
                    return "AWBNumber cannot be empty.";
                if (v.Length > 15)
                    return "AWBNumber must be at most 15 characters.";
                foreach (char c in v)
                    if (!char.IsLetterOrDigit(c))
                        return "AWBNumber must be alphanumeric only.";
                return null;
            });
            string sender = ConsoleHelper.ReadField("Sender Name", v =>
            {
                if (string.IsNullOrWhiteSpace(v))
                    return "Sender name cannot be empty.";
                if (v.Trim().Length < 2)
                    return "Sender name must be at least 2 characters.";
                if (v.Length > 100)
                    return "Sender name must be at most 100 characters.";
                foreach (char c in v)
                    if (!char.IsLetter(c) && c != ' ')
                        return "Sender name must contain only letters and spaces.";
                return null;
            });
            string receiver = ConsoleHelper.ReadField("Receiver Name", v =>
            {
                if (string.IsNullOrWhiteSpace(v))
                    return "Receiver name cannot be empty.";
                if (v.Trim().Length < 2)
                    return "Receiver name must be at least 2 characters.";
                if (v.Length > 100)
                    return "Receiver name must be at most 100 characters.";
                foreach (char c in v)
                    if (!char.IsLetter(c) && c != ' ')
                        return "Receiver name must contain only letters and spaces.";
                return null;
            });
            string origin = ConsoleHelper.ReadField("Origin", v =>
            {
                if (string.IsNullOrWhiteSpace(v))
                    return "Origin cannot be empty.";
                if (v.Trim().Length < 2)
                    return "Origin must be at least 2 characters.";
                if (v.Length > 50)
                    return "Origin must be at most 50 characters.";
                foreach (char c in v)
                    if (!char.IsLetter(c) && c != ' ' && c != '-')
                        return "Origin must contain only letters, spaces, or hyphens.";
                return null;
            });
            string destination = ConsoleHelper.ReadField("Destination", v =>
            {
                if (string.IsNullOrWhiteSpace(v))
                    return "Destination cannot be empty.";
                if (v.Trim().Length < 2)
                    return "Destination must be at least 2 characters.";
                if (v.Length > 50)
                    return "Destination must be at most 50 characters.";
                foreach (char c in v)
                    if (!char.IsLetter(c) && c != ' ' && c != '-')
                        return "Destination must contain only letters, spaces, or hyphens.";
                if (string.Equals(v.Trim(), origin.Trim(), StringComparison.OrdinalIgnoreCase))
                    return "Destination cannot be the same as Origin.";
                return null;
            });
            string rawWeight = ConsoleHelper.ReadField("Weight (kg)", v =>
            {
                if (!double.TryParse(v, out var w) || w <= 0)
                    return "Enter a valid weight greater than zero.";
                if (w > 5000)
                    return "Weight cannot exceed 5000 kg.";
                return null;
            });
            double weight = double.Parse(rawWeight);

            string[] statusOptions = { "Booked", "In Transit", "Out for Delivery", "Delivered", "RTO" };
            string status = "booked";

            var shipment = new Shipment
            {
                AWBNumber = awb,
                SenderName = sender,
                ReceiverName = receiver,
                Origin = origin,
                Destination = destination,
                WeightKg = weight,
                Status = status
            };

            var (success, message) = _service.BookShipment(shipment);
            Console.ForegroundColor = success ? ConsoleColor.Green : ConsoleColor.Red;
            Console.WriteLine($"\n  {message}");
            Console.ResetColor();
            Console.WriteLine("\n  Press Enter to continue.");
            Console.ReadLine();
        }

        private void ListShipments()
        {
            Console.Clear();
            AsciiTitle.AsciiArtTitle();
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($" === Shipments List === \n");
            Console.ResetColor();

            var shipments = _service.ListShipments();

            if (shipments.Count == 0)
            {
                Console.WriteLine("  No shipments found.");
            }
            else
            {
                Console.WriteLine("  ┌──────┬──────────────┬──────────────────┬──────────────────┬──────────────────────────────┬─────────┬──────────────────┬─────────────────────┐");
                Console.WriteLine($"  │ {"ID",-4} │ {"AWB",-12} │ {"Sender",-16} │ {"Receiver",-16} │ {"Route",-28} │ {"Weight",-7} │ {"Status",-16} │ {"Booked At",-19} │");
                Console.WriteLine("  ├──────┼──────────────┼──────────────────┼──────────────────┼──────────────────────────────┼─────────┼──────────────────┼─────────────────────┤");

                foreach (var s in shipments)
                {
                    string route = $"{s.Origin} -> {s.Destination}";
                    string bookedAt = s.BookedAt.ToString("yyyy-MM-dd HH:mm");
                    Console.WriteLine($"  │ {s.ShipmentId,-4} │ {s.AWBNumber,-12} │ {s.SenderName,-16} │ {s.ReceiverName,-16} │ {route,-28} │ {s.WeightKg,-7:F2} │ {s.Status,-16} │ {bookedAt,-19} │");
                }

                Console.WriteLine("  └──────┴──────────────┴──────────────────┴──────────────────┴──────────────────────────────┴─────────┴──────────────────┴─────────────────────┘");
            }

            Console.WriteLine("\n  Press Enter to continue.");
            Console.ReadLine();
        }

        private void UpdateStatus()
        {
            Console.Clear();
            AsciiTitle.AsciiArtTitle();
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($" === Update Status === \n");
            Console.ResetColor();

            string awb = ConsoleHelper.ReadField("AWBNumber", v => string.IsNullOrWhiteSpace(v) ? "AWBNumber cannot be empty." : null);

            string[] statusOptions = { "Booked", "In Transit", "Out for Delivery", "Delivered", "RTO" };
            string status = GUIMenu.SelectInline("New Status", statusOptions);

            var (success, message) = _service.UpdateStatus(awb, status);
            Console.ForegroundColor = success ? ConsoleColor.Green : ConsoleColor.Red;
            Console.WriteLine($"\n  {message}");
            Console.ResetColor();

            Console.WriteLine("\n  Press Enter to continue.");
            Console.ReadLine();
        }

        private void CancelShipment()
        {
            Console.Clear();
            AsciiTitle.AsciiArtTitle();
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($" === Cancel Shipment === \n");
            Console.ResetColor();

            string awb = ConsoleHelper.ReadField("AWBNumber", v => string.IsNullOrWhiteSpace(v) ? "AWBNumber cannot be empty." : null);

            Console.ForegroundColor = ConsoleColor.DarkRed;
            Console.Write($"  \u26a0  Are you sure you want to cancel shipment {awb}? (y/n): ");
            Console.ResetColor();
            var key = Console.ReadKey(true).Key;
            Console.WriteLine(key == ConsoleKey.Y ? "y" : "n");

            if (key != ConsoleKey.Y)
            {
                Console.WriteLine($"\n  Cancellation of shipment {awb} aborted.");
                Console.WriteLine("\n  Press Enter to continue.");
                Console.ReadLine();
                return;
            }

            var (success, message) = _service.CancelShipment(awb);
            Console.ForegroundColor = success ? ConsoleColor.Green : ConsoleColor.Red;
            Console.WriteLine($"\n  {message}");
            Console.ResetColor();

            Console.WriteLine("\n  Press Enter to continue.");
            Console.ReadLine();
        }
    }
}
