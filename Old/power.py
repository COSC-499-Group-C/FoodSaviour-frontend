if __name__ == '__main__':
    # Initialize array for pair of numbers and counter
    nums = []
    i = 0

    # Ask for two positive integers
    print("Input two positive integers. The first integer will be the base and the second will be the power. Press enter after each input number.")

    # Determine whether input is a valid integer
    while (i != 2):
        num = input()
        if (num.isnumeric()):
            num = int(num)
        else:
            print("Not a valid input. Try again.")
            continue
        if (num < 0):
            print("Not a valid input. Try again.")
        else:
            nums.append(num)
            i += 1

# power(): will return the first positive integer in the given array to the power of the second positive integer in the array
def power(ints):
    return ints[0]**ints[1]

if __name__ == '__main__':
    # call the power function, then output the result
    p = power(nums)
    print("The result of {} to the power of {} is {}".format(nums[0], nums[1], p))
