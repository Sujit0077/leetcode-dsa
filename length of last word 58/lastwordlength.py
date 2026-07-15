class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        word=s.strip().split()[-1]
        return len(word)
        

soln=Solution()
s="   fly me   to   the moon  "
print(soln.lengthOfLastWord(s))