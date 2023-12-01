import java.util.Scanner;
import java.io.File;

public class App {
    public static boolean debug = false;
    public static String[] numbers = {"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};
    public static String lowestNum(String in) {
        int length = in.length();
        for (int i=0; i<length; i++) {
            for (int j=0; j<numbers.length; j++) {
                int n = numbers[j].length();
                if (i>=length-n) continue;
                if (in.substring(i,i+n).equals(numbers[j]))
                    return numbers[j];
            }
        }
        return "";
    }
    public static String highestNum(String in) {
        int length = in.length();
        for (int i=0; i<length; i++) {
            for (int j=0; j<numbers.length; j++) {
                int n = numbers[j].length();
                if (i>=length-n) continue;
                if (in.substring(length-(i+n),length-i).equals(numbers[j]))
                    return numbers[j];
            }
        }
        return "";
    }
    public static int indexOfArray(String match, String[] array) {
        for (int i=0; i<array.length; i++)
            if (array[i].equals(match)) return i;
        return -1;
    }
    public static int[] numberParse(Scanner scan) {
        int total1 = 0;
        int total2 = 0;
        for (int c=1; scan.hasNextLine(); c++) {
            String input = scan.nextLine();
            if (input.isBlank()) continue;
            int[] ints1 = new int[2];
            int[] ints2 = new int[2];
            for (int i=0; i<input.length(); i++) {
                try {
                    ints1[0] = Integer.parseInt(input.substring(i,i+1));
                } catch (NumberFormatException e) {continue;}
                String lowestNum = lowestNum(input);
                if (!lowestNum.isEmpty() && input.indexOf(lowestNum) < input.indexOf(ints1[0]+""))
                    ints2[0] = indexOfArray(lowestNum, numbers) + 1;
                else ints2[0] = ints1[0];
                break;
            }
            for (int i=input.length()-1; i>=0; i--) {
                try {
                    ints1[1] = Integer.parseInt(input.substring(i,i+1));
                } catch (NumberFormatException e) {continue;}
                String highestNum = highestNum(input);
                if (!highestNum.isEmpty() && input.lastIndexOf(highestNum) > input.lastIndexOf(ints1[1]+""))
                    ints2[1] = indexOfArray(highestNum, numbers) + 1;
                else ints2[1] = ints1[1];
                break;
            }
            try {
                total1 += Integer.parseInt(ints1[0] + "" + ints1[1]);
                total2 += Integer.parseInt(ints2[0] + "" + ints2[1]);
                if (debug) {
                    if (ints1[0] * ints1[1] == 0) System.out.print("ERROR ON ");
                    System.out.println("line " + c + ": " + ints2[0] + " " + ints2[1] + " becomes " + Integer.parseInt(ints2[0] + "" + ints2[1]));
                }
            } catch (Exception e) {e.printStackTrace();}
        }
        scan.close();
        return new int[] {total1, total2};
    }
    public static void main(String[] args) throws Exception {
        Scanner testscan = new Scanner(new File("resources/testinput.txt"));
        Scanner testscan2 = new Scanner(new File("resources/testinput2.txt"));
        Scanner scan = new Scanner(new File("resources/input.txt"));
        int[] inputanswers = {numberParse(testscan)[0], numberParse(testscan2)[1]};
        if (inputanswers[0] == 142 && inputanswers[1] == 281) {
            System.out.println("Test input answer is correct! Attempting the real input...");
            inputanswers = numberParse(scan);
            System.out.println("Part 1: " + inputanswers[0]);
            System.out.println("Part 2: " + inputanswers[1]);
        } else {
            System.out.println("Oh no! Test input answer isn't correct! Fix it before trying it on the real input.");
        }
    }
}
