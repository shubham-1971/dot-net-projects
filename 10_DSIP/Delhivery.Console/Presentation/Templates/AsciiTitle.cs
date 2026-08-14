using System.Text;

namespace Delhivery.Presentation.Templates
{
    internal class AsciiTitle
    {
        public static void Display()
        {
            Console.OutputEncoding = Encoding.UTF8;

            Console.ForegroundColor = ConsoleColor.DarkCyan;
            Console.BackgroundColor = ConsoleColor.Black;
            Console.WriteLine(@"
            ██████╗ ███████╗██╗     ██╗  ██╗██╗██╗   ██╗███████╗██████╗ ██╗   ██╗
            ██╔══██╗██╔════╝██║     ██║  ██║██║██║   ██║██╔════╝██╔══██╗╚██╗ ██╔╝
            ██║  ██║█████╗  ██║     ███████║██║██║   ██║█████╗  ██████╔╝ ╚████╔╝ 
            ██║  ██║██╔══╝  ██║     ██╔══██║██║╚██╗ ██╔╝██╔══╝  ██╔══██╗  ╚██╔╝  
            ██████╔╝███████╗███████╗██║  ██║██║ ╚████╔╝ ███████╗██║  ██║   ██║   
            ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝   ╚═╝   
                                                                                                                                           
            ");

            Console.ResetColor();
        }

        public static void AsciiArtTitle()
        {
            Display();
        }
    }
}
