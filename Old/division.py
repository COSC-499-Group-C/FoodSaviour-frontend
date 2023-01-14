nums = []
#Create number array that user can append changes to
finished = False
#Create boolean to determine when the while loop can end

print("Input any amount of positive integers (End with 0). Enter after each number. This will return the division of each number after the last.")

while (not finished):
    num = input()
    if (num.isnumeric()):
        num = int(num)
    #If input is numeric, num = input
    else:
        print("Not a valid input. Try again.")
        continue
    #If input is not numeric, try input again
    if (num == 0):
        finished = True
    #If input == 0, finish loop
    elif (num < 0):
        print("Not a valid input. Try again.")
    #If input < 0, not a valid input
    else:
        nums.append(num)
    #If inputs are valid, append to num array

def division(ints):
    div = ints[0]
    for i in ints[1:]:
        div /= i
    return div
    #Division function that divides each subsequent number in the array

d = division(nums)
#Call division with user nums array
print("The division of the numbers is {}".format(d))
#Print the final product of the function