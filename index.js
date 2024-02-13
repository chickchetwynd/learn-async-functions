// 3 ways of handling Asynchronous code:

//Call back functions 

function fetchData(callback) {
    setTimeout(() => {
        console.log("Data fetched!");
        callback(processData);
    }, 1000);
} ...

fetchData((callback) => {
    processData((innerCallback) => {
        displayResult();
    });
}); ...

// Once the asyn portion of the code is complete, the function calls another fuction. That function
// can then call another function, and that function can call another function....Call Back Hell. 



// Or you can use promises. Promises either resolve or reject once the async operation has completed.
// This is a promise being created:

const chicksPromise = new Promise((resolve, reject) => {
    const isOperationSuccessful = true;

    setTimeout(() => {
        if (isOperationSuccessful) {
            resolve("Async operation worked")
        } else {
            reject("Async operation failed")
        }
    }, 2000)
})

chicksPromise.then((result) => {
    console.log(result)
})

chicksPromise.catch((error) => {
    console.error(error)
})
// The promise will either reject or resolve based on the async operation occuring. In this example,
// it will always resolve, but an api call might fail for example. The arguments passed to the
// reject/resolve functions are the vaues assigned to the functions within the .then or the .catch
// method. This is the promise being "consumed"



// .then and .catch are methods on the promise created. These two methods ALWAYS accept a
// function. The parameter in a .then function is typically named result, and the parameter
// in a .catch function is normally named error or reason. "result" is the value passed to
// the resolve function in the promise. "error"/"reason" is the value passed to the reject
// function in the promise body.


// This code is actually quite a verbose way of writing, but helps it helps really
// understand what is going on under the hood. Working with functions that produce
// a promise is more typical, like fetch():


fetch(some_api_request)
    .then(response => {
        //do something to the response here - like JSON_parse
    })
    .then (data => {
        //do something to the response of the previous async command!
    })

    .catch( error => {
        console.error(error)
    })


// Even simpler syntax is asyn/await


apiUrl = "https://jsonplaceholder.typicode.com/todos/1"

async function callApi (url) {
    console.log("The asyn operation is starting!")

    try {
        res = await fetch(url);
        data = await res.json();
        console.log(data)
    }

    catch (error) {
        console.error(error)
    }
}

callApi(apiUrl)

// Here the .then blocks are in a more readable syntax within the try {} block (it looks more like
// synchronous code).
// Errors are handled in a pretty similar way as the .catch method.


// Here's an actual example of a POST request to an API:

const apiUrl = "https://reqres.in/api/users";

const apiInfo = {
    method: "POST",
    headers:{
                'Content-Type': 'application/json',
            },
    body: JSON.stringify("SOME INTERESTING DATA GOES HERE, YO!"),  
};

const apiPostRequest = async (url, info) => {
    console.log("The async function has started");

    try {
        const response = await fetch(url, info);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

apiPostRequest(apiUrl, apiInfo);