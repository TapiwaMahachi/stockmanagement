def rec_replace(string, replace, substring):
    if not string:  
        # if the string is empty
        return ""
    # if the string start with substring, 
    # slice the string and replace it with replace substr
    elif string[:len(substring)] == substring:
        return replace + rec_replace(string[len(substring):], replace, substring)
    else:  
        # else, add the first character and go to the next one
        return string[0] + rec_replace(string[1:], replace, substring)


string = input("Please enter String: ")
substring = input("Please enter substring: ")
replace = input("Please enter string to replace with: ")

print('You new string is : ', rec_replace(string, replace, substring))
