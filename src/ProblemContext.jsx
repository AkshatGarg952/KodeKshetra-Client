import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';

const ProblemContext = createContext();

export const useProblem = () => {
  const context = useContext(ProblemContext);
  if (!context) {
    throw new Error('useProblem must be used within a ProblemProvider');
  }
  return context;
};

export const ProblemProvider = ({ children }) => {
  const [currentProblem, setCurrentProblem] = useState('codeforces');
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const { showNotification } = useNotification();

  const problemData = {
    dsa: {
      problemId: "40",
      title: "Combination Sum II",
      url: "https://leetcode.com/problems/combination-sum-ii/",
      description: "Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.\n\nEach number in candidates may only be used once in the combination.\n\nNote: The solution set must not contain duplicate combinations.",
      constraints: [
        "1 <= candidates.length <= 100",
        "1 <= candidates[i] <= 50",
        "1 <= target <= 30"
      ],
      sampleTests: [
        {
          input: "candidates = [10,1,2,7,6,1,5], target = 8",
          output: "[[1,1,6],[1,2,5],[1,7],[2,6]]"
        },
        {
          input: "candidates = [2,5,2,1,2], target = 5",
          output: "[[1,2,2],[5]]"
        }
      ],
      difficulty: "easy",
      source: "LeetCode"
    },

    codeforces: {
      problemId: "1734A",
      title: "A. Select Three Sticks",
      url: "https://codeforces.com/problemset/problem/1734/A",
      tags: ["brute force", "greedy", "sortings"],
      timeLimit: "1 second",
      memoryLimit: "256 megabytes",
      description: "You are given n sticks with positive integer lengths a₁, a₂, ..., aₙ.\n\nYou can perform the following operation any number of times:\n\n• Choose a stick of length aᵢ > 1 and replace it with two sticks of lengths ⌊aᵢ/2⌋ and ⌈aᵢ/2⌉.\n\nYou want to perform several operations such that you can select three sticks to form a non-degenerate triangle.\n\nA non-degenerate triangle is a triangle with positive area. In particular, three sticks with lengths x, y, z can form a non-degenerate triangle if and only if x + y > z, y + z > x, and z + x > y.\n\nWhat is the minimum number of operations you need to perform?",
      inputFormat: "The first line contains a single integer t (1 ≤ t ≤ 1000) — the number of test cases.\n\nThe first line of each test case contains a single integer n (3 ≤ n ≤ 2⋅10⁵).\n\nThe second line of each test case contains n integers a₁, a₂, ..., aₙ (1 ≤ aᵢ ≤ 10⁹).",
      outputFormat: "For each test case, output a single integer: the minimum number of operations you need to perform to be able to select three sticks that can form a non-degenerate triangle.",
      note: "In the first test case, you can choose sticks with lengths 4, 2, 3. Since 4 + 2 > 3, 2 + 3 > 4 is false. So these three sticks cannot form a non-degenerate triangle.\n\nYou can perform one operation on the stick of length 4: replace it with two sticks of lengths 2 and 2. Now you have sticks with lengths [2, 2, 2, 3], and you can choose the three sticks with lengths 2, 2, 3. Since 2 + 2 > 3, 2 + 3 > 2, 3 + 2 > 2, these can form a non-degenerate triangle.",
      sampleTests: [
        {
          input: "3\n4\n4 2 1 3\n3\n3 4 2\n5\n5 3 3 3 3",
          output: "1\n0\n0"
        }
      ],
      difficulty: "medium",
      source: "Codeforces"
    }
  };

  const codeTemplates = {
    dsa: {
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        # Write your solution here
        pass`,

      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    // Write your solution here
};`,

      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Write your solution here
        return null;
    }
}`,

      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Write your solution here
        return nullptr;
    }
};`
    },

    codeforces: {
      python: `n, m = map(int, input().split())
edges = []
for _ in range(m):
    u, v, d = map(int, input().split())
    edges.append((u, v, d))

# Write your solution here
`,

      javascript: `const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    const [n, m] = input[0].split(' ').map(Number);
    const edges = [];
    for (let i = 1; i <= m; i++) {
        const [u, v, d] = input[i].split(' ').map(Number);
        edges.push([u, v, d]);
    }
    
    // Write your solution here
});`,

      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        
        int[][] edges = new int[m][3];
        for (int i = 0; i < m; i++) {
            edges[i][0] = sc.nextInt(); // u
            edges[i][1] = sc.nextInt(); // v
            edges[i][2] = sc.nextInt(); // d
        }
        
        // Write your solution here
        
        sc.close();
    }
}`,

      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    
    vector<vector<int>> edges(m, vector<int>(3));
    for (int i = 0; i < m; i++) {
        cin >> edges[i][0] >> edges[i][1] >> edges[i][2]; // u, v, d
    }
    
    // Write your solution here
    
    return 0;
}`
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'F9') {
        const newProblem = currentProblem === 'dsa' ? 'codeforces' : 'dsa';
        setCurrentProblem(newProblem);
        showNotification(`Switched to ${newProblem.toUpperCase()} problem`, 'info');
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        showNotification('Running code...', 'info');
      }

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        showNotification('Submitting solution...', 'info');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentProblem, showNotification]);

  // Welcome notification
  useEffect(() => {
    const timer = setTimeout(() => {
      showNotification('Welcome to CodeVersus Battle Arena!', 'info');
    }, 1000);

    return () => clearTimeout(timer);
  }, [showNotification]);

  return (
    <ProblemContext.Provider value={{
      currentProblem,
      setCurrentProblem,
      selectedLanguage,
      setSelectedLanguage,
      problemData,
      codeTemplates
    }}>
      {children}
    </ProblemContext.Provider>
  );
};