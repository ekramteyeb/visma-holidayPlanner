import moment from 'moment'
import momenth from 'moment-holiday'
import WorkingDays  from 'moment-working-days'
import Holidays from 'date-holidays'



//main function take two start and end arguments(date string 'YYYYMMDD' format)
//return if successful number of days else 'valid input message'
function holidayPlanner(start , end){

    let isValidSpan = checkValidSpan(start , end)
    let isValidHolidayPeriod = checkHodlidayPeriod(start , end)
    
    //N.B isValidSpan should be checked first then valid holiday period 
    if(!(isValidSpan && isValidHolidayPeriod)){
        return 'invalid input please provide, valid input'
    }else{
        
        //number of public holidays from starting point to the  end point 
        let numberOfHolidays = moment(start).holidaysBetween(end);
        
        //working days
        const momentWorkingDays = new WorkingDays()
        //number of working days  from start to end that an employee can use to go for holiday
        let workingdays = momentWorkingDays.getWorkingDays([start , end])
       
    
        //returns the number of days 
        return workingdays - numberOfHolidays.length
    }
}

//check if the given times span is <= 50 days  and 
// they are in chronological order
function checkValidSpan(start, end){
    let st = moment(start)
    let en = moment(end)

    let isValidSpan = en.diff(st,'days')  <= 50 && en.diff(st,'days') > 0

    return isValidSpan
}

//check the given time inputs are in the holiday Period ie April 1 - March 31 
function checkHodlidayPeriod(start,end){
    /* 
        // let's devide the holiday period in to two 

        -> thisYear(ex, 2020) = [April , May, June , July , August , September , October, November , December]  // considerd as this year
        -> nextYear(ex , 2021) = [January , February , March] = considered as nextYear 
     */
    let checkStart = moment(start ,'YYYYMMDD')
    let checkEnd = moment(end , 'YYYYMMDD')

    let isStartNextYear = (checkStart.format('MM') * 1  <= 3) && (checkStart.format('MM') * 1  >= 1)
    let isEndNextYear = (checkEnd.format('MM') * 1  <= 3) && (checkEnd.format('MM') * 1  >= 1)
    
    if((isStartNextYear == true) && (isEndNextYear == false)){
        return false
        
    }else{
        if(
            !(isStartNextYear && isEndNextYear)||
            (isStartNextYear && isEndNextYear) ||
            ((isStartNextYear == false) && (isEndNextYear == true))
        ){
            return true
        }else{
            return false
        }
    
    }
}

// test by providing sample input
console.log(holidayPlanner('20220101', '20220130'))


