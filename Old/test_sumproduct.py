import unittest
from sumproduct import *

class TestFeatures(unittest.TestCase):

    def test_sum(self):
        self.assertEqual(summation([1, 2, 3, 5, 4, 7, 10]), 32, "Incorrect Sum. Should be 32")

    def test_product(self):
        self.assertEqual(product([1, 2, 2, 4, 3]), 48, "Incorrect Product. Should be 48")

if __name__ == '__main__':
    unittest.main()