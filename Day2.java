import java.util.Scanner;
import java.io.File;

public class Day2 {
    //public static boolean debug = false;
    public static int[] rgb = {12, 13, 14};
    public static int[] gameVerify(Scanner scan) {
        int totalpart1 = 0;
        int totalpart2 = 0;
        for (int g=1; scan.hasNextLine(); g++) {
            String input = scan.nextLine();
            if (input.isBlank()) continue;
            input = input.substring(input.indexOf(":")+2);
            String[] split = input.split(";\\s");
            boolean add = true;
            int[] rgbmax = new int[3];
            for (int i=0; i<split.length; i++) {
                String[] subsplit = split[i].split("(,\\s)|\\s");
                for (int j=0; j<subsplit.length; j+=2) {
                    try {
                        int a = Integer.parseInt(subsplit[j]);
                        if (subsplit[j+1].equals("red")) {
                            if (a > rgb[0]) add = false;
                            rgbmax[0] = Math.max(rgbmax[0], a);
                        }
                        if (subsplit[j+1].equals("green")) {
                            if (a > rgb[1]) add = false;
                            rgbmax[1] = Math.max(rgbmax[1], a);
                        }
                        if (subsplit[j+1].equals("blue")) {
                            if (a > rgb[2]) add = false;
                            rgbmax[2] = Math.max(rgbmax[2], a);
                        }
                    } catch (NumberFormatException e) {e.printStackTrace();}
                }
            }
            if (add) totalpart1 += g;
            totalpart2 += rgbmax[0] * rgbmax[1] * rgbmax[2];
        }
        scan.close();
        return new int[] {totalpart1, totalpart2};
    }
    public static void main(String[] args) throws Exception {
        Scanner testscan = new Scanner(new File("resources/day2/testinput.txt"));
        Scanner scan = new Scanner(new File("resources/day2/input.txt"));
        int[] inputanswers = gameVerify(testscan);
        if (inputanswers[0] == 8 && inputanswers[1] == 2286) {
            System.out.println("Test input answer is correct! Attempting the real input...");
            inputanswers = gameVerify(scan);
            System.out.println("Part 1: " + inputanswers[0]);
            System.out.println("Part 2: " + inputanswers[1]);
        } else {
            System.out.println("Oh no! Test input answer isn't correct! Fix it before trying it on the real input.");
        }
    }
}
