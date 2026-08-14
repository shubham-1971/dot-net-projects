using System;

namespace Delhivery.Presentation.Templates
{
    internal static class ConsoleHelper
    {
        public static string ReadField(string label, Func<string, string> validator)
        {
            int labelLine = Console.CursorTop;
            Console.Write($"  {label}: ");

            string value;
            while (true)
            {
                value = Console.ReadLine();

                string error = validator(value);
                if (error == null)
                    break;

                Console.CursorTop = labelLine + 1;
                Console.CursorLeft = 0;
                Console.Write(new string(' ', Console.WindowWidth));
                Console.CursorLeft = 0;
                Console.ForegroundColor = ConsoleColor.Red;
                Console.Write($"  {error}");
                Console.ResetColor();

                Console.CursorTop = labelLine;
                Console.CursorLeft = label.Length + 4;
                Console.Write(new string(' ', Console.WindowWidth - Console.CursorLeft));
                Console.CursorLeft = label.Length + 4;
            }

            Console.CursorTop = labelLine;
            Console.CursorLeft = 0;
            Console.Write(new string(' ', Console.WindowWidth));
            Console.CursorLeft = 0;
            Console.ForegroundColor = ConsoleColor.DarkGray;
            Console.Write($"  {label}: ");
            Console.ForegroundColor = ConsoleColor.Green;
            Console.Write(value);
            Console.ResetColor();

            Console.CursorTop = labelLine + 1;
            Console.CursorLeft = 0;
            Console.Write(new string(' ', Console.WindowWidth));
            Console.CursorTop = labelLine + 1;
            Console.CursorLeft = 0;

            return value;
        }
    }
}
