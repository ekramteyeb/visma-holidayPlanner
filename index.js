
//main function take two start and end arguments(date string 'YYYYMMDD' format)
//return if successful number of days else 'valid input message'
function holidayPlanner(){
    
    let start =  document.getElementById('startDate').value; 
    let end =  document.getElementById('endDate').value; 
    
    let isValidSpan = checkValidSpan(start , end)
    let isValidHolidayPeriod = checkHodlidayPeriod(start , end)
    let response = ''
    
    //N.B isValidSpan should be checked first then valid holiday period 
    if(!(isValidSpan && isValidHolidayPeriod)){
        //return 'invalid input please provide, valid input'
        response =  '  Invalid input, please provide valid dates'
        document.getElementById('result').innerHTML = response
        document.getElementById('demo').innerHTML = ''
        return response
    }else{
       
        //number of public holidays from starting point to the  end point 
        let numberOfHolidays = moment(start).holidaysBetween(end) ? moment(start).holidaysBetween(end) : [];
        
        //working days
        //number of working days  from start to end that an employee can use to go for holiday
        var working_days = moment(start, 'YYYYMMDD').businessDiff(moment(end,'YYYYMMDD'));
       
    
        //returns the number of days 
       // return workingdays - numberOfHolidays.length
        response =  working_days - numberOfHolidays.length
        document.getElementById('demo').innerHTML = 'Result : ' + response + ' days can be used as holidays'
        document.getElementById('result').innerHTML = ''
        return response
    }
    

}
async function getWorkingDays(start , end)
{
    /* let start = document.getElementById('startDate').value;
    let end = document.getElementById('endDate').value; */
    let st = moment(start).format('YYYY-MM-DD')
    let en = moment(end).format('YYYY-MM-DD')
    


    if(!st || !en  ){
        workingDays =  0
        /* document.getElementById('result').innerHTML = 'Please provide valid inputs'; */
    }else{
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'working-days.p.rapidapi.com',
                'X-RapidAPI-Key': '93cb67e318mshf9590a24759714ep139f2cjsn261f7e828b36',
            }
            
            
        };
        /*     fetch('https://working-days.p.rapidapi.com/analyse?country_code=AU&start_date=2022-01-01&end_date=2022-12-31&configuration=Queensland&start_time=09%3A13&end_time=17%3A35', options)
    */
     let response = await  fetch(`https://working-days.p.rapidapi.com/analyse?country_code=AU&start_date=${st}&end_date=${en}&configuration=Queensland&start_time=09%3A13&end_time=17%3A35`, options)
            
     let workingDays =  ((response.result.working_days.total * 1) + (response.result.weekend_days.saturdays * 1))
            
            
        console.log(response, 'working days')
        return workingDays
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
//console.log(holidayPlanner('20220101', '20220130'))


