#Cube function

#Define the function
def cube(x):
    return x * x * x    #Take the input x and multiply it by itself 2 times

#Prompts the user for input and store their input as n
n = int(input(" Enter the number : "))
#Store the output of the cube function into cube_output
cube_output = cube(n)
#Print to validate feedback and output to user
print("The Cube of {0}  = {1}".format(n, cube_output))