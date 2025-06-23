export type Question = {
  id: number;
  category: string;
  question: string;
  code?: string;
  options: string[];
  answer: string;
  explanation: string;
};

export const questions: Question[] = [
  {
    id: 1,
    category: '数据结构',
    question: '平均情况下，向哈希集合添加一个元素的时间复杂度是多少？',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
    answer: 'O(1)',
    explanation: '平均而言，哈希集合操作（添加、删除和包含）的时间复杂度为 O(1)。这是因为它们使用哈希函数来计算存储桶或插槽数组的索引，从而可以找到所需的值。',
  },
  {
    id: 2,
    category: '算法',
    question: '在 Python 中，反转字符串最“Pythonic”的方式是什么？',
    code: `def reverse_string(s):
  # 完成这个函数
  return`,
    options: ['s.reverse()', 'reversed(s)', 's[::-1]', 'for 循环'],
    answer: "s[::-1]",
    explanation: '切片表示法 `[::-1]` 是反转字符串最简洁、最 Pythonic 的方式。它会创建一个原始字符串的反向副本新字符串。`s.reverse()` 用于列表，而 `reversed(s)` 返回一个迭代器。',
  },
  {
    id: 3,
    category: '语法与语义',
    question: '以下 Python 代码的输出结果是什么？',
    code: `my_list = [1, 2, 3]
def change_list(lst):
  lst.append(4)

change_list(my_list)
print(my_list)`,
    options: ['[1, 2, 3]', '[1, 2, 3, 4]', 'None', '出现 TypeError'],
    answer: '[1, 2, 3, 4]',
    explanation: '在 Python 中，列表是可变对象。当你将列表传递给函数时，你传递的是对列表的引用。因此，在函数内部对列表所做的任何修改都会影响原始列表。',
  },
  {
    id: 4,
    category: '错误调试',
    question: '以下代码旨在计算从 1 到 n 的数字之和，但它包含一个错误。请找出修正方法。',
    code: `def sum_up_to(n):
  total = 0
  for i in range(n):
    total += i
  return total`,
    options: ['循环应该是 `range(1, n + 1)`', '将 `total` 初始化为 1', 'return 语句缩进不正确', '使用 `total = total + i`'],
    answer: '循环应该是 `range(1, n + 1)`',
    explanation: '`range(n)` 函数生成从 0 到 n-1 的数字。要计算从 1 到 n 的总和，循环应从 1 迭代到 n（包括 n），这可以通过 `range(1, n + 1)` 实现。',
  },
  {
    id: 5,
    category: '标准库',
    question: '你会使用 Python 标准库中的哪个模块来处理日期和时间？',
    options: ['time', 'date', 'calendar', 'datetime'],
    answer: 'datetime',
    explanation: '`datetime` 模块提供了用于操作日期和时间的类。它提供了 `date`、`time`、`datetime` 和 `timedelta` 等类型。',
  },
];
