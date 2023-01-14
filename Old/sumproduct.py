# Initialize array of numbers and boolean
nums = []
finished = False

# Ask for any number of positive integers (end with 0)
print("Input any number of positive integers (end input with 0). Enter after each number.")

# Determine whether input is a valid integer or if user wants to end input (0)
while (not finished):
    num = input()
    if (num.isnumeric()):
        num = int(num)
    else:
        print("Not a valid input. Try again.")
        continue
    if (num == 0):
        finished = True
    elif (num < 0):
        print("Not a valid input. Try again.")
    else:
        nums.append(num)

# summation(): Will add all the numbers together and return the sum
def summation(ints):
    sum = 0
    for i in ints:
        sum += i
    return sum

# product(): Will multiply all the numbers together and return the product
def product(ints):
    prod = 1
    for i in ints:
        prod *= i
    return prod

# Ask if user wants to get SUM or PRODUCT of numbers, ask to try again if invalid input
# Appropriate function will be called, and answer will be returned and displayed to the user
valid = False
operation = input("Input SUM for sum of numbers or PRODUCT for product of numbers.")
while (not valid):
    if (operation.lower() == "sum"):
        s = summation(nums)
        print("The sum of the numbers is {}".format(s))
        valid = True
    elif (operation.lower() == "product"):
        p = product(nums)
        print("The product of the numbers is {}".format(p))
        valid = True
    else:
        print("Not a valid input. Try again.")

