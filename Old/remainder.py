# Initiates an input for user to provided divisor and dividend
def getInput():
    # Initialize counter for number of values and list for divisor & dividend
    i = 0
    numbers = []

    statement = "Input two integers. The first integer will be the dividend"\
        " and the second will be the divisor. Press enter after each input"\
        " number."
    
    # Ask for two integers
    print(statement)

    # Run the while loop till satifactory inputs are provided
    while (i != 2):
        value = input()
        
        # Check if input is a number
        if (value.isnumeric()):
            
            # Check if the second entered input is not a '0'
            if i == 1 and int(value) == 0:
                print("Not a valid input. Try again.")
                continue
            else:
                numbers.append(int(value))
                i += 1
        
        # For wrong input ask the user to enter a new one
        else:
            print("Not a valid input. Try again.")
            continue
        
    return numbers

# Returns the remainder between the first integer and second integer
def remainder(ints):
    return ints[0]%ints[1]

if __name__ == '__main__':
    # call the remainder function, then output the result
    values = getInput()
    remainder = remainder(values)
    
    # Print the result
    print("The remainder between {} and {} is {}".format(values[0], \
    values[1], remainder))
