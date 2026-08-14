using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Employee_Management_System.Models;

namespace Employee_Management_System.Services
{
    public class SortingService
    {
        public static List<Employee> BubbleSortEmp(List<Employee> list,Func<Employee,Employee, bool> compare)
        {   List<Employee> newEmpList = list.ToList();
            int n = newEmpList.Count;
            for (int i = 0; i < n-1; i++)
            {
                for (int j = 0; j < n-i-1; j++) {
                    if (compare(newEmpList[j], newEmpList[j + 1]))
                    {
                        var temp = newEmpList[j];
                        newEmpList[j] = newEmpList[j + 1];
                        newEmpList[j + 1] = temp;
                    }
                }
            }
            
            return newEmpList;

        }
        public static List<Employee> SelectionSortEmp(
    List<Employee> list,
    Func<Employee, Employee, bool> compare)
        {
            List<Employee> newEmpList = list.ToList();
            int n = newEmpList.Count;

            for (int i = 0; i < n - 1; i++)
            {
                int selectedIndex = i;

                for (int j = i + 1; j < n; j++)
                {
                    if (compare(newEmpList[selectedIndex], newEmpList[j]))
                    {
                        selectedIndex = j;
                    }
                }

              
                if (selectedIndex != i)
                {
                    var temp = newEmpList[i];
                    newEmpList[i] = newEmpList[selectedIndex];
                    newEmpList[selectedIndex] = temp;
                }
            }

            return newEmpList;
        }



        public static List<Employee> QuickSortEmp(
         List<Employee> list,
         Func<Employee, Employee, bool> compare)
        {
            List<Employee> newEmpList = list.ToList();
            QuickSort(newEmpList, 0, newEmpList.Count - 1, compare);
            return newEmpList;
        }

        private static void QuickSort(
            List<Employee> list,
            int low,
            int high,
            Func<Employee, Employee, bool> compare)
        {
            if (low < high)
            {
                int pivotIndex = Partition(list, low, high, compare);

                QuickSort(list, low, pivotIndex - 1, compare);
                QuickSort(list, pivotIndex + 1, high, compare);
            }
        }

        private static int Partition(
            List<Employee> list,
            int low,
            int high,
            Func<Employee, Employee, bool> compare)
        {
            var pivot = list[high];
            int i = low - 1;

            for (int j = low; j < high; j++)
            {
                
                if (!compare(list[j], pivot))
                {
                    i++;

                    var temp = list[i];
                    list[i] = list[j];
                    list[j] = temp;
                }
            }
            var temp1 = list[i + 1];
            list[i + 1] = list[high];
            list[high] = temp1;

            return i + 1;
        }
    }
}
