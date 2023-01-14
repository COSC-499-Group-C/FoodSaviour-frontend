# Import required libraries for testing
import unittest
from remainder import remainder

# Define the TestFeatures class
# This class runs two different test on Remainder function
class TestFeatures(unittest.TestCase):

    # Test 1 for Remainder function
    def test_power1(self):
        self.assertEqual(remainder([4, 3]), 1, "Incorrect Result. Should be 8")
    
    # Test 2 for Remainder function
    def test_power2(self):
        self.assertEqual(remainder([4, 1]), 0, "Incorrect Result. Should be 19683")

if __name__ == '__main__':
    unittest.main()