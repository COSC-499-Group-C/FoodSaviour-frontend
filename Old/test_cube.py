#import unit test
import unittest
#import file to be tested on
import cubic

#Create a test class for the cube function
class TestCubic(unittest.TestCase):
    def test_cube(self):
        self.assertEqual(cubic.cube(2), 8)  #Test if cube function works with positive numbers
        self.assertEqual(cubic.cube(-2),-8) #Test if cube function works with negative numbers

if __name__ == '__main__':
    unittest.main()