var inputDate = document.querySelector("#inputDt");
var btnClick = document.querySelector("#btn");
var message = document.querySelector("#msg");

function reverseString(date) {
  var revStr = date.split("").reverse().join("");
  return revStr;
}

function isPalindrome(date) {
  var reverse = reverseString(date);
  return date === reverse;
}

// console.log(isPalindrome("wowy"));

function convertToString(date) {
  var dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();

  return dateStr;
}

// console.log(convertToString(date));

function getAllDateFormats(date) {
  var dateString = convertToString(date);

  var ddmmyyyy = dateString.day + dateString.month + dateString.year;
  var mmddyyyy = dateString.month + dateString.day + dateString.year;
  var yyyymmdd = dateString.year + dateString.month + dateString.day;
  var ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
  var mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
  var yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeAllFormat(date) {
  var listOfFormets = getAllDateFormats(date);

  let checkPalindrome = false;
  for (let i = 0; i < listOfFormets.length; i++) {
    if (isPalindrome(listOfFormets[i])) {
      checkPalindrome = true;
      break;
    }
  }
  return checkPalindrome;
}

function isLeapYear(year) {
  if (year % 400 === 0 || year % 4 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  return false;
}

// var date = {
//   day: 31,
//   month: 12,
//   year: 2020
// };

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonths[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year
  };
}

function getNextPalindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);

  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeAllFormat(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

// btnClick.addEventListener("click", function inoutHandler() {
//   console.log("hello");
//   var bdate = inputDate.value;
//   console.log(bdate);
// });

btnClick.addEventListener("click", function clickHandler(e) {
  var bdate = inputDate.value;

  if (bdate !== "") {
    var listOfDate = bdate.split("-");

    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0])
    };

    var isPalindrome = checkPalindromeAllFormat(date);

    if (isPalindrome) {
      message.innerText = "Yeppiee ! Your Birth Date is Palindrome";
    } else {
      var [ctr, nextDate] = getNextPalindromeDate(date);

      message.innerText = `We are Sorry ! your Birth Date is not Palindrome. You missed it by ${ctr}
     & next Palindrome Date is ${nextDate.day}-${nextDate.month}-${nextDate.year} `;
    }
  }
});
