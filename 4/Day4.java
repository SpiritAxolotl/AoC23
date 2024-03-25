import java.util.Scanner;
import java.io.File;
import java.util.ArrayList;

public class Day4 {
    public static boolean debug = false;
    public static int[] scratchcards(Scanner scan) {
        int totalpart1 = 0;
        int totalpart2 = 0;
        ArrayList<String[]> e = new ArrayList<String[]>();
        while (scan.hasNextLine()) {
            String input = scan.nextLine();
            if (input.isBlank()) continue;
            e.add(input.substring(input.indexOf(":")+2).strip().split("\\s+"));
        }
        scan.close();
        
        ArrayList<Integer> winningnumsanswers = new ArrayList<Integer>();
        int part2size = 0;
        for (int card=0; card<e.size(); card++) {
            ArrayList<Integer> winningnums = new ArrayList<Integer>();
            boolean toggle = false;
            int numberofwinners = 0;
            for (int i=0; i<e.get(card).length; i++) {
                int num = -1;
                try {
                    num = Integer.parseInt(e.get(card)[i]);
                } catch (NumberFormatException a) {
                    if (!e.get(card)[i].equals("|")) a.printStackTrace();
                }
                if (e.get(card)[i].equals("|")) {
                    toggle = true;
                    continue;
                }
                if (!toggle) {
                    winningnums.add(num);
                } else if (winningnums.contains(num)) {
                    numberofwinners++;
                }
            }
            winningnumsanswers.add(numberofwinners);
            for (int i=0; i<numberofwinners; i++) {
                //e.add(e.get(card+i+1));
                part2size += winningnumsanswers.get((card+i+1));
            }
            if (debug) System.out.println((card+1) + ": " + Math.floor(Math.pow(2, numberofwinners-1)));
            totalpart1 += Math.floor(Math.pow(2, numberofwinners-1));
        }
        totalpart2 = e.size() + part2size;
        return new int[] {totalpart1, totalpart2};
    }
    public static void main(String[] args) throws Exception {
        Scanner testscan = new Scanner(new File("resources/day4/testinput.txt"));
        Scanner scan = new Scanner(new File("resources/day4/input.txt"));
        int[] inputanswers = scratchcards(testscan);
        if (inputanswers[0] == 13 || inputanswers[1] == 30) {
            System.out.println("Test input answer is correct! Attempting the real input...");
            inputanswers = scratchcards(scan);
            System.out.println("Part 1: " + inputanswers[0]);
            System.out.println("Part 2: " + inputanswers[1]);
        } else {
            System.out.println("Oh no! Test input answer isn't correct! Fix it before trying it on the real input.");
            System.out.println("Output: " + inputanswers[0] + " " + inputanswers[1]);
        }
    }
}
