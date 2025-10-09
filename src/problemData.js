const problems = {
  sampleQuestion: {
    source: 'Codeforces',
    problemId: '1734A',
    title: 'A. Select Three Sticks',
    url: 'https://codeforces.com/problemset/problem/1734/A',
    tags: ['brute force', 'greedy', 'sortings'],
    timeLimit: '1 second',
    memoryLimit: '256 megabytes',
    description:
      'You are given n sticks with positive integer lengths a₁, a₂, ..., aₙ.\n\nYou can perform the following operation any number of times:\n\n• Choose a stick of length aᵢ > 1 and replace it with two sticks of lengths ⌊aᵢ/2⌋ and ⌈aᵢ/2⌉.\n\nYou want to perform several operations such that you can select three sticks to form a non-degenerate triangle.\n\nA non-degenerate triangle is a triangle with positive area. In particular, three sticks with lengths x, y, z can form a non-degenerate triangle if and only if x + y > z, y + z > x, and z + x > y.\n\nWhat is the minimum number of operations you need to perform?',
    inputFormat:
      'The first line contains a single integer t (1 ≤ t ≤ 1000) — the number of test cases.\n\nThe first line of each test case contains a single integer n (3 ≤ n ≤ 2⋅10⁵).\n\nThe second line of each test case contains n integers a₁, a₂, ..., aₙ (1 ≤ aᵢ ≤ 10⁹).',
    outputFormat:
      'For each test case, output a single integer: the minimum number of operations you need to perform to be able to select three sticks that can form a non-degenerate triangle.',
    note:
      'In the first test case, you can choose sticks with lengths 4, 2, 3. Since 4 + 2 > 3, 2 + 3 > 4 is false. So these three sticks cannot form a non-degenerate triangle.\n\nYou can perform one operation on the stick of length 4: replace it with two sticks of lengths 2 and 2. Now you have sticks with lengths [2, 2, 2, 3], and you can choose the three sticks with lengths 2, 2, 3. Since 2 + 2 > 3, 2 + 3 > 2, 3 + 2 > 2, these can form a non-degenerate triangle.',
    sampleTests: [
      {
        input: '3\n4\n4 2 1 3\n3\n3 4 2\n5\n5 3 3 3 3',
        output: '1\n0\n0',
      },
    ],
    difficulty: 'medium',
  },

  sampleLeetCodeQuestion: {
    source: 'LeetCode',
    problemId: '1',
    title: 'Two Sum',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    difficulty: 'easy',
  },
};

export default problems;
