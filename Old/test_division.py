import unittest
from division import division

class TestFeatures(unittest.TestCase):

    def test_division1(self):
        self.assertEqual(division([100, 2, 5]), 8, "Incorrect Result. Should be 10")

    def test_division2(self):
        self.assertEqual(division([64, 2, 8]), 4, "Correct Result!")

if __name__ == '__main__':
    unittest.main()