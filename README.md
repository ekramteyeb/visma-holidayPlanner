# visma-holidayPlanner

# Objective 
Take a time span as an input (for example '20200201' - '20200330') and will determine how
many days a person can use to be able to consume his(her) holiday during that given period of time.

# validates inputs(start , end) to fullfill the following requirements : 
* The maximum length of the time span is 50 days 
* If the given times(inputs) span within the same holiday period (ie From April 1 - March 31)
* The dates for the time span are in chronological order

# Takes in to consideration 
* national holidays
* sundays 


# Output 
* if the inputes don't meet the requirements listed above , it will return 'invalid inputes' string
* Otherwise will return number of days an employe can use to consume holiday with in the given time interval 


# Language : Javascript 

# How to run 
* insert two date time strings as input and call holidayPlanner function  in the index.js file like : 
    holidayPlanner('YYYYMMDD', 'YYYYMMDD')
* run the index.js file using node like 
    node index.js from terminal 
* the output will be logged to console 


# Limitations : 
* Currently working only for US country and fetchs calculates list of holidays in US.
