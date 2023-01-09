/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * futher hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
  /** You will need to implement your search and
   * return the appropriate object here. */
  const result = {
    "SearchTerm": "",
    "Results": []
  };

  result.SearchTerm = searchTerm;

  if (scannedTextObj.length === 0) return result;

  scannedTextObj.forEach((book) => {
    if (book.Content.length === 0) return;

    let checkFirstWord = false;
    let wordBreak = "";

    book.Content.forEach((lineOfText) => {
      let lastWord = lineOfText.Text.split(" ").pop();

      if (
        lastWord.endsWith("-") &&
        lastWord.substring(0, lastWord.length - 1) ===
          searchTerm.substring(0, lastWord.length - 1)
      ) {
        wordBreak = lastWord.substring(0, lastWord.length - 1);
        checkFirstWord = true;
      } else if (checkFirstWord) {
        let firstWord = lineOfText.Text.split(" ").shift();

        if (firstWord === searchTerm.substring(wordBreak.length)) {
          const {
            solution = {
              ISBN: `${book.ISBN}`,
              Page: Number.parseInt(`${lineOfText.Page}`),
              Line: Number.parseInt(`${lineOfText.Line}`)
            }
          } = book;
          result.Results.push(solution);
        }

        checkFirstWord = false;
      }

      if (lineOfText.Text.includes(searchTerm) && !lastWord.endsWith("-")) {
        const {
          solution = {
            "ISBN": book.ISBN,
            "Page": lineOfText.Page,
            "Line": lineOfText.Line
          }
        } = book;
        result.Results.push(solution);
      }
    });
  });

  return result;
}

/** Example input object. */
const singleBookWithContentInput = [
  {
    "Title": "Twenty Thousand Leagues Under the Sea",
    "ISBN": "9780000528531",
    "Content": [
      {
        "Page": 31,
        "Line": 8,
        "Text": "now simply went on by her own momentum.  The dark-"
      },
      {
        "Page": 31,
        "Line": 9,
        "Text": "ness was then profound; and however good the Canadian's"
      },
      {
        "Page": 31,
        "Line": 10,
        "Text": "eyes were, I asked myself how he had managed to see, and"
      }
    ]
  }
];

const singleBookWithoutContentInput = [
  {
    "Title": "Twenty Thousand Leagues Under the Sea",
    "ISBN": "9780000528531",
    "Content": []
  }
];

const multipleBooksWithContentInput = [
  {
    "Title": "Twenty Thousand Leagues Under the Sea",
    "ISBN": "9780000528531",
    "Content": [
      {
        "Page": 31,
        "Line": 8,
        "Text": "now simply went on by her own momentum.  The dark-"
      },
      {
        "Page": 31,
        "Line": 9,
        "Text": "ness was then profound; and however good the Canadian's"
      },
      {
        "Page": 31,
        "Line": 10,
        "Text": "eyes were, I asked myself how he had managed to see, and"
      }
    ]
  },
  {
    "Title": "The Last Lecture",
    "ISBN": "9781401323257",
    "Content": [
      {
        "Page": 6,
        "Line": 20,
        "Text": "Another matter upsetting Jai: To give the talk as sched-"
      },
      {
        "Page": 6,
        "Line": 21,
        "Text": "uled, I would have to fly to Pittsburgh the day before, which"
      },
      {
        "Page": 6,
        "Line": 22,
        "Text": `was Jai's forty-first birthday. "This is my last birthday we'll`
      }
    ]
  }
];

const noBookInput = [];

/** Example output object */
//Output
const singleBookWithContentExpectedOutput = {
  "SearchTerm": "the",
  "Results": [
    {
      "ISBN": "9780000528531",
      "Page": 31,
      "Line": 9
    }
  ]
};

const singleBookWithoutContentExpectedOutput = {
  "SearchTerm": "the",
  "Results": []
};

const multipleBooksWithContentExpectedOutput = {
  "SearchTerm": "the",
  "Results": [
    {
      "ISBN": "9780000528531",
      "Page": 31,
      "Line": 9
    },
    {
      "ISBN": "9781401323257",
      "Page": 6,
      "Line": 20
    },
    {
      "ISBN": "9781401323257",
      "Page": 6,
      "Line": 21
    }
  ]
};

const caseSensitiveSearchTermExpectedOutput = {
  "SearchTerm": "This",
  "Results": [
    {
      "ISBN": "9781401323257",
      "Page": 6,
      "Line": 22
    }
  ]
};

const noBookExpectedOutput = {
  "SearchTerm": "the",
  "Results": []
};

const searchTermNotFoundExpectedOutput = {
  "SearchTerm": "Felix",
  "Results": []
};

const multipleInstancesOfSearchTermExpectedOutput = {
  "SearchTerm": "to",
  "Results": [
    {
      "ISBN": "9780000528531",
      "Page": 31,
      "Line": 10
    },
    {
      "ISBN": "9781401323257",
      "Page": 6,
      "Line": 21
    }
  ]
};

const searchTermWrappingOnDifferentLinesExpectedOutput = {
  "SearchTerm": "darkness",
  "Results": [
    {
      "ISBN": "9780000528531",
      "Page": 31,
      "Line": 9
    }
  ]
};

const hyphenatedSearchTermExpectedOutput = {
  "SearchTerm": "forty-first",
  "Results": [
    {
      "ISBN": "9781401323257",
      "Page": 6,
      "Line": 22
    }
  ]
};

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that
 * output to the console. We've provided two tests as examples, and
 * they should pass with a correct implementation of `findSearchTermInBooks`.
 *
 * Please add your unit tests below.
 * */

/******* HELPER FUNCTIONS *******/

const resultsLengthChecker = (testNumber, expected, received, logText) => {
  if (expected.Results.length === received.Results.length) {
    console.log(
      `PASS - Test ${testNumber}: Expected results length EQUAL to Received results length -  ${logText}`
    );
    console.log("Expected:", expected.Results.length);
    console.log("Received:", received.Results.length);
  } else {
    console.log(
      `FAIL - Test ${testNumber}: Expected results length NOT EQUAL to Received results length  -  ${logText}`
    );
    console.log("Expected:", expected.Results.length);
    console.log("Received:", received.Results.length);
  }
};

const jsonMatcher = (testNumber, expected, received, logText) => {
  if (JSON.stringify(expected) === JSON.stringify(received)) {
    console.log(
      `PASS - Test ${testNumber}: Expected output is EQUAL to Received output -  ${logText}`
    );
  } else {
    console.log(
      `FAIL - Test ${testNumber}: Expected output is NOT EQUAL to Received output -  ${logText}`
    );
    console.log("Expected:", JSON.stringify(expected));
    console.log("Received:", JSON.stringify(received));
  }
};

/******* HELPER FUNCTIONS *******/

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", singleBookWithContentInput);
jsonMatcher(
  1,
  singleBookWithContentExpectedOutput,
  test1result,
  `Search term, "${
    singleBookWithContentExpectedOutput.SearchTerm
  }", yielded the ${
    JSON.stringify(singleBookWithContentExpectedOutput) ===
    JSON.stringify(test1result)
      ? "CORRECT"
      : "WRONG"
  } expected output`
);

/** We could choose to check that we get the right number of results. */
//givenABookWithContentsAndSearchTerm_whenSearchTermFound_thenReturnNonEmptyResultsArray
const test2result = findSearchTermInBooks("the", singleBookWithContentInput);
resultsLengthChecker(
  2,
  singleBookWithContentExpectedOutput,
  test2result,
  `Search term, "${
    singleBookWithContentExpectedOutput.SearchTerm
  }", should occur ${
    singleBookWithContentExpectedOutput.Results.length <= 1
      ? singleBookWithContentExpectedOutput.Results.length + " time"
      : singleBookWithContentExpectedOutput.Results.length + " times"
  } in your output`
);

//givenABookWithContentsAndSearchTerm_whenSearchTermNotFound_thenReturnEmptyResultsArrayWithSearchTerm
const test3result = findSearchTermInBooks("Felix", singleBookWithContentInput);
jsonMatcher(
  3,
  searchTermNotFoundExpectedOutput,
  test3result,
  `Search term, "${searchTermNotFoundExpectedOutput.SearchTerm}", yielded the ${
    JSON.stringify(searchTermNotFoundExpectedOutput) ===
    JSON.stringify(test3result)
      ? "CORRECT"
      : "WRONG"
  } expected output`
);

//givenNoBookAndSearchTerm_whenSearchTermNotFound_thenReturnEmptyResultsArrayWithSearchTermProperty
const test4result = findSearchTermInBooks("the", noBookInput);
jsonMatcher(
  4,
  noBookExpectedOutput,
  test4result,
  `Search term, "${noBookExpectedOutput.SearchTerm}", yielded the ${
    JSON.stringify(noBookExpectedOutput) === JSON.stringify(test4result)
      ? "CORRECT"
      : "WRONG"
  } expected output`
);

//givenMultipleBooksWithContentsAndSearchTerm_whenSearchTermFound_thenReturnNonEmptyResultsArray
const test5result = findSearchTermInBooks("to", multipleBooksWithContentInput);
jsonMatcher(
  5,
  multipleInstancesOfSearchTermExpectedOutput,
  test5result,
  `Search term, "${
    multipleInstancesOfSearchTermExpectedOutput.SearchTerm
  }", yielded the ${
    JSON.stringify(multipleInstancesOfSearchTermExpectedOutput) ===
    JSON.stringify(test5result)
      ? "CORRECT"
      : "WRONG"
  } expected output`
);

resultsLengthChecker(
  5,
  multipleInstancesOfSearchTermExpectedOutput,
  test5result,
  `Search term, "${
    multipleInstancesOfSearchTermExpectedOutput.SearchTerm
  }", should occur ${
    multipleInstancesOfSearchTermExpectedOutput.Results.length <= 1
      ? multipleInstancesOfSearchTermExpectedOutput.Results.length + " time"
      : multipleInstancesOfSearchTermExpectedOutput.Results.length + " times"
  } in your output`
);

//givenMultipleBooksWithContentAndSearchTerm_whenWordBreakSearchTermFound_thenReturnNonEmptyResultsArray
const test6result = findSearchTermInBooks(
  "darkness",
  multipleBooksWithContentInput
);
jsonMatcher(
  6,
  searchTermWrappingOnDifferentLinesExpectedOutput,
  test6result,
  `Search term, "${
    searchTermWrappingOnDifferentLinesExpectedOutput.SearchTerm
  }", yielded the ${
    JSON.stringify(searchTermWrappingOnDifferentLinesExpectedOutput) ===
    JSON.stringify(test6result)
      ? "CORRECT"
      : "WRONG"
  } expected output`
);

resultsLengthChecker(
  6,
  searchTermWrappingOnDifferentLinesExpectedOutput,
  test6result,
  `Search term, "${
    searchTermWrappingOnDifferentLinesExpectedOutput.SearchTerm
  }", should occur ${
    searchTermWrappingOnDifferentLinesExpectedOutput.Results.length <= 1
      ? searchTermWrappingOnDifferentLinesExpectedOutput.Results.length +
        " time"
      : searchTermWrappingOnDifferentLinesExpectedOutput.Results.length +
        " times"
  } in your output`
);

//givenMultipleBooksWithContentAndHyphenatedSearchTerm_whenSearchTermFound_thenReturnNonEmptyResultsArray
const test7result = findSearchTermInBooks(
  "forty-first",
  multipleBooksWithContentInput
);
jsonMatcher(
  7,
  hyphenatedSearchTermExpectedOutput,
  test7result,
  `Search term, "${
    hyphenatedSearchTermExpectedOutput.SearchTerm
  }", yielded the ${
    JSON.stringify(hyphenatedSearchTermExpectedOutput) ===
    JSON.stringify(test7result)
      ? "CORRECT"
      : "WRONG"
  } expected output`
);

resultsLengthChecker(
  7,
  hyphenatedSearchTermExpectedOutput,
  test7result,
  `Search term, "${
    hyphenatedSearchTermExpectedOutput.SearchTerm
  }", should occur ${
    hyphenatedSearchTermExpectedOutput.Results.length <= 1
      ? hyphenatedSearchTermExpectedOutput.Results.length + " time"
      : hyphenatedSearchTermExpectedOutput.Results.length + " times"
  } in your output`
);

//givenMultipleBooksWithContentAndCapitalizedSearchTerm_whenSearchTermFound_thenReturnNonEmptyResultsArray
const test8result = findSearchTermInBooks(
  "This",
  multipleBooksWithContentInput
);
jsonMatcher(
  8,
  caseSensitiveSearchTermExpectedOutput,
  test8result,
  `Search term, "${
    caseSensitiveSearchTermExpectedOutput.SearchTerm
  }", yielded the ${
    JSON.stringify(caseSensitiveSearchTermExpectedOutput) ===
    JSON.stringify(test8result)
      ? "CORRECT"
      : "WRONG"
  } expected output`
);

resultsLengthChecker(
  8,
  caseSensitiveSearchTermExpectedOutput,
  test8result,
  `Search term, "${
    caseSensitiveSearchTermExpectedOutput.SearchTerm
  }", should occur ${
    caseSensitiveSearchTermExpectedOutput.Results.length <= 1
      ? caseSensitiveSearchTermExpectedOutput.Results.length + " time"
      : caseSensitiveSearchTermExpectedOutput.Results.length + " times"
  } in your output`
);
