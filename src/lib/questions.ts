export type Question = {
  id: number;
  category: string;
  question: string;
  code?: string;
  answer: string;
  explanation: string;
};

export const questions: Question[] = [
  {
    id: 1,
    category: 'Data Structures',
    question: 'What is the time complexity of adding an element to a hash set on average?',
    answer: 'O(1)',
    explanation: 'On average, hash set operations (add, remove, and contains) have a time complexity of O(1). This is because they use a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.',
  },
  {
    id: 2,
    category: 'Algorithms',
    question: 'What is the most "Pythonic" way to reverse a string in Python?',
    code: `def reverse_string(s):
  # Complete the function
  return`,
    answer: "s[::-1]",
    explanation: 'The slice notation `[::-1]` is the most concise and Pythonic way to reverse a string. It creates a new string that is a reversed copy of the original.',
  },
  {
    id: 3,
    category: 'Syntax & Semantics',
    question: 'What will be the output of the following Python code?',
    code: `my_list = [1, 2, 3]
def change_list(lst):
  lst.append(4)

change_list(my_list)
print(my_list)`,
    answer: '[1, 2, 3, 4]',
    explanation: 'In Python, lists are mutable objects. When you pass a list to a function, you are passing a reference to the list. Therefore, any modifications made to the list inside the function will affect the original list.',
  },
  {
    id: 4,
    category: 'Error Debugging',
    question: 'The following code is intended to calculate the sum of numbers from 1 to n, but it contains an error. Identify the fix.',
    code: `def sum_up_to(n):
  total = 0
  for i in range(n):
    total += i
  return total`,
    answer: 'The loop should be `range(n + 1)`',
    explanation: 'The `range(n)` function generates numbers from 0 up to n-1. To include `n` in the sum, you need to use `range(n + 1)`, which generates numbers from 0 up to n.',
  },
  {
    id: 5,
    category: 'Standard Library',
    question: 'Which module in the Python standard library would you use to work with dates and times?',
    answer: 'datetime',
    explanation: 'The `datetime` module supplies classes for manipulating dates and times. It provides types like `date`, `time`, `datetime`, and `timedelta`.',
  },
];
