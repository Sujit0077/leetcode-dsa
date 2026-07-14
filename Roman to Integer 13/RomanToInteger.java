class Solution {
    public int getVal(char ch){
        return switch(ch){
            case 'I' -> 1;
            case 'V' -> 5;
            case 'X' -> 10;
            case 'L' -> 50;
            case 'C' -> 100;
            case 'D' -> 500;
            case 'M' -> 1000;
            default -> 0;
        };
    }
    public int romanToInt(String s) {
        int sum = 0;

        for (int i = 0; i < s.length(); i++) {
            int curr = getVal(s.charAt(i));

            if (i + 1 < s.length()) {
                int next = getVal(s.charAt(i + 1));

                if (curr < next) {
                    sum -= curr;
                } else {
                    sum += curr;
                }
            } else {
                sum += curr;
            }
        }

        return sum;
    }
}

public class RomanToInteger {
    public static void main(String[] args) {
        Solution solution = new Solution();
        String romanNumeral = "MCMXCIV"; // Example input
        int result = solution.romanToInt(romanNumeral);
        System.out.println("The integer value of " + romanNumeral + " is: " + result);
    }
}