import unittest
from power import power

class TestFeatures(unittest.TestCase):

    def test_power1(self):
        self.assertEqual(power([2, 3]), 8, "Incorrect Result. Should be 8")

    def test_power2(self):
        self.assertEqual(power([3, 9]), 19683, "Incorrect Result. Should be 19683")

if __name__ == '__main__':
    unittest.main()