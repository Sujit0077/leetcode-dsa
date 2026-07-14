import java.util.Stack;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack=new Stack<>();
        for(char ch:s.toCharArray()){
            switch (ch) {
                case '(' -> stack.push(')');
                case '[' -> stack.push(']');
                case '{' -> stack.push('}');
                default -> {
                    if(stack.isEmpty() || stack.pop() != ch){
                        return false;
                    }
                }
            }
        }
        return stack.isEmpty();

    }
}

public class validParanthesis {
    public static void main(String[] args) {
        Solution solution = new Solution();
        String input = "{[()]}"; // Example input
        boolean isValid = solution.isValid(input);
        System.out.println("The string " + input + " is valid: " + isValid);
        //for invalid
        String invalidInput = "{[(])}"; // Example invalid input
        boolean isInvalidValid = solution.isValid(invalidInput);   
        System.out.println("The string " + invalidInput + " is valid: " + isInvalidValid);
    }
}