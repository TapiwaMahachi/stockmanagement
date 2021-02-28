# An SMS Simulation class SMSMessage(object):
##number
#remove unneccesary global variables declaration which are undefined
hasBeenRead = False messageText = text fromNumber = number
#first you must have a class definition
#indent your code accordingly 
   def __init__(self, hasBeenRead, messageText, fromNumber):
    #variables must be initialized with
    #arguments from the constructor
    #so they become dynamic
   self.hasBeenRead = False
   self.messageText = text
   self.fromNumber = number

  def MarkASRead(self,):

    #must not use undefined variable
    #define and initialize the variable with a str
    if userChoice == read:
      self.hasBeenRead = True
  #all function methods need to be indented
  def add_sms():
    pass
    #add logic

  def get_count():
    pass
    #add logic

  def get_message():
    pass
    #add logic

  def get_unread_messages():
    pass
    #add logic

  def remove():
    pass
    #add logic

no_1 = SMSMessage(False, "Hello", "0798653452")
no_2 = SMSMessage(False, "WYD", "0845673864")
no_3 = SMSMessage(False, "How are you?", "0631873298")

#variable declaration must be on their own line
#unless you doing destructuring assignment
SMSStore = [] userChoice = ""

#indentation is required
while userChoice != "quit":
  #use input instead of raw_input
  userChoice = raw_input("What would you like to do - read/send/quit?")
if userChoice == "read":
  pass
  # Place your logic here
elif userChoice == "send":
  pass
  # Place your logic here
elif userChoice == "quit":
  print("Good")
else:
  print("Oops - incorrect input")
