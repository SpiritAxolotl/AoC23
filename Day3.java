import java.util.Scanner;
import java.io.File;
import java.util.ArrayList;

public class Day3 {
    public static boolean debug = false;
    public static char[][] arraylistToArray(ArrayList<char[]> list){
        char[][] array = new char[list.get(0).length][list.size()];
        for (int i=0; i<list.size(); i++) {
            for (int j=0; j<list.get(i).length; j++) {
                array[j][i] = list.get(i)[j];
            }
        }
        return array;
    }
    public static int isNumber(char c) {
        /*try {
            return Integer.parseInt(c+"");
        } catch (NumberFormatException e) {
            return -1;
        }*/
        return Character.isDigit(c) ? c-'0' : -1;
    }
    public static boolean isPartNumber(int num, char[][] engine, int x, int y) {
        int length = (num+"").length();
        x -= length;
        //left
        for (int i=0; i<3 && x-1 >= 0; i++) {
            if (y-1+i >= 0 && y-1+i < engine[i].length && engine[x-1][y-1+i] != '.') return true;
        }
        //right
        for (int i=0; i<3 && x+length < engine.length; i++) {
            if (y-1+i >= 0 && y-1+i < engine[i].length && engine[x+length][y-1+i] != '.') return true;
        }
        //top
        for (int i=0; i<length && y-1 > 0; i++) {
            if (engine[x+i][y-1] != '.') return true;
        }
        //bottom
        for (int i=0; i<length && y+1 < engine[i].length; i++) {
            if (engine[x+i][y+1] != '.') return true;
        }
        return false;
    }
    public static int calcGearRatio(char[][] engine, int x, int y) {
        ArrayList<Integer> nums = new ArrayList<Integer>();
        //left
        if (x-1 >= 0 && isNumber(engine[x-1][y]) != -1)
            nums.add(findFullNum(engine, x-1, y));
        //right
        if (x+1 < engine.length && isNumber(engine[x+1][y]) != -1)
            nums.add(findFullNum(engine, x+1, y));
        //top
        for (int i=0; i<3 && y-1 >= 0; i++) {
            if (isNumber(engine[x-1+i][y-1]) != -1) {
                nums.add(findFullNum(engine, x-1+i, y-1));
                if (i==0 && isNumber(engine[1][y-1]) == -1) i++; else break;
            }
        }
        //bottom
        for (int i=0; i<3 && y+1 < engine[i].length; i++) {
            if (isNumber(engine[x-1+i][y+1]) != -1) {
                nums.add(findFullNum(engine, x-1+i, y+1));
                if (i==0 && isNumber(engine[1][y-1]) == -1) i++; else break;
            }
        }
        return nums.size() == 2 ? nums.get(0) * nums.get(1) : 0;
    }
    public static int findFullNum(char[][] engine, int x, int y) {
        int start = x;
        int length = 1;
        while (start > 0) {
            if (Character.isDigit(engine[start-1][y])) {length++; start--;}
            else break;
        }
        for (int i=x+1; i<engine.length; i++) {
            if (Character.isDigit(engine[i][y])) length++;
            else break;
        }
        int num = 0;
        for (int i=start; i<start+length; i++) {
            num = num*10 + (engine[i][y] - '0');
        }
        return num;
    }
    public static int[] gearRatios(Scanner scan) {
        int totalpart1 = 0;
        int totalpart2 = 0;
        ArrayList<char[]> e = new ArrayList<char[]>();
        while (scan.hasNextLine()) {
            String input = scan.nextLine();
            if (input.isBlank()) continue;
            e.add(input.toCharArray());
        }
        scan.close();
        char[][] engine = arraylistToArray(e);
        for (int y=0; y<engine[0].length; y++) {
            int num = 0;
            String debugout = "";
            int lineTotal = 0;
            for (int x=0; x<engine.length+1; x++) {
                if (x<engine.length && engine[x][y] == '*') {
                    totalpart2 += calcGearRatio(engine, x, y);
                }
                if (x<engine.length && isNumber(engine[x][y]) != -1) {
                    num = num*10 + (engine[x][y] - '0');
                    continue;
                } else if (num > 0 && isPartNumber(num, engine, x, y)) {
                    totalpart1 += num;
                    lineTotal += num;
                    debugout += num + " + ";
                }
                num = 0;
            }
            if (debug) System.out.println(debugout.substring(0, Math.max(0, debugout.length()-2)) + "= " + lineTotal);
        }
        
        return new int[] {totalpart1, totalpart2};
    }
    public static void main(String[] args) throws Exception {
        Scanner testscan = new Scanner(new File("resources/day3/testinput.txt"));
        Scanner scan = new Scanner(new File("resources/day3/input.txt"));
        int[] inputanswers = gearRatios(testscan); //     451490
        if (inputanswers[0] == 4361 && inputanswers[1] == 467835) {
            System.out.println("Test input answer is correct! Attempting the real input...");
            inputanswers = gearRatios(scan);
            //519922<x<522978
            //x=521601
            //61916944<x
            System.out.println("Part 1: " + inputanswers[0]);
            System.out.println("Part 2: " + inputanswers[1]);
        } else {
            System.out.println("Oh no! Test input answer isn't correct! Fix it before trying it on the real input.");
            System.out.println("Output: " + inputanswers[0] + " " + inputanswers[1]);
        }
    }
}
