using System;
using System.Linq;

namespace Delhivery.Presentation.Templates
{
    internal class GUIMenu
    {
        public static string SelectInline(string prompt, string[] options)
        {
            int startLine = Console.CursorTop;
            Console.WriteLine();
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"  {prompt}:");
            Console.ResetColor();

            int selectedIndex = 0;
            int colWidth = options.Max(o => o.Length) + 4;
            int optionsTop = Console.CursorTop;

            for (int i = 0; i < options.Length; i++)
            {
                Console.CursorLeft = 4;
                if (i == selectedIndex)
                {
                    Console.BackgroundColor = ConsoleColor.White;
                    Console.ForegroundColor = ConsoleColor.Black;
                }
                Console.WriteLine(options[i].PadRight(colWidth));
                Console.ResetColor();
            }

            while (true)
            {
                var key = Console.ReadKey(true).Key;

                if (key == ConsoleKey.UpArrow)
                {
                    selectedIndex = (selectedIndex - 1 + options.Length) % options.Length;
                }
                else if (key == ConsoleKey.DownArrow)
                {
                    selectedIndex = (selectedIndex + 1) % options.Length;
                }
                else if (key == ConsoleKey.Enter)
                {
                    break;
                }
                else
                {
                    continue;
                }

                for (int i = 0; i < options.Length; i++)
                {
                    Console.CursorTop = optionsTop + i;
                    Console.CursorLeft = 4;
                    Console.Write(new string(' ', colWidth));
                    Console.CursorLeft = 4;
                    if (i == selectedIndex)
                    {
                        Console.BackgroundColor = ConsoleColor.White;
                        Console.ForegroundColor = ConsoleColor.Black;
                    }
                    Console.Write(options[i].PadRight(colWidth));
                    Console.ResetColor();
                }
            }

            Console.CursorTop = startLine;
            for (int i = 0; i < 2 + options.Length; i++)
            {
                Console.CursorTop = startLine + i;
                Console.CursorLeft = 0;
                Console.Write(new string(' ', 4 + colWidth));
            }

            Console.CursorTop = startLine;
            Console.CursorLeft = 0;
            Console.ForegroundColor = ConsoleColor.DarkGray;
            Console.Write($"  {prompt}: ");
            Console.ForegroundColor = ConsoleColor.Green;
            Console.Write(options[selectedIndex]);
            Console.ResetColor();
            Console.WriteLine();

            return options[selectedIndex];
        }

        public static int ShowMenu(string[] options, string menuTitle)
        {
            int selectedIndex = 0;

            while (true)
            {
                Console.Clear();
                AsciiTitle.AsciiArtTitle();
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($" === {menuTitle} === \n");
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine();
                Console.WriteLine("Press arrow to change the option and hit enter to select...");
                Console.ResetColor();

                for (int i = 0; i < options.Length; i++)
                {
                    if (i == selectedIndex)
                    {
                        Console.BackgroundColor = ConsoleColor.White;
                        Console.ForegroundColor = ConsoleColor.Black;
                    }
                    else
                    {
                        Console.ResetColor();
                    }

                    Console.WriteLine(" << " + options[i] + " >> ");
                }

                Console.ResetColor();

                var key = Console.ReadKey(true).Key;

                if (key == ConsoleKey.UpArrow || key == ConsoleKey.LeftArrow)
                {
                    selectedIndex = (selectedIndex - 1 + options.Length) % options.Length;
                }
                else if (key == ConsoleKey.DownArrow || key == ConsoleKey.RightArrow)
                {
                    selectedIndex = (selectedIndex + 1) % options.Length;
                }
                else if (key == ConsoleKey.Enter)
                {
                    return selectedIndex;
                }
            }
        }
    }
}
