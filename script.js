

// fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
// .then((res) => {
//     console.log("RESOLVED", res);
//     res.json()
// })
// .catch((e) => {
//     console.log("error")
// });

// Async function

// const loadCockTail = async () => {
//     const res = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
//     const data = await res.json();
//     console.log(data);
// }
// loadCockTail();

//  With Axios

// const loadCockTail1 = async () => {
//     const res = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
//     console.log(res);
// }

// loadCockTail1();





const cockTail = document.querySelector("#cockTail");


const loadOnPage = async () => {

    const currentTimestamp = new Date().getTime();
    const res = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    
    const lastRequestTimestamp = parseInt(localStorage.getItem('lastRequestTimestamp'));
    const initialCallFlag = localStorage.getItem('initialCallFlag');
    

 
    // console.log(drinkName);
    // console.log(initialCallFlag);
    // console.log(lastRequestTimestamp);
    // console.log(setLastCocktail);


    if(!initialCallFlag){
        const drinkName = res.data.drinks[0].strDrink;
        const newLi = document.createElement('li');
        newLi.append(drinkName)
        cockTail.append(newLi);
        localStorage.setItem('lastCocktail', drinkName);
        localStorage.setItem('initialCallFlag', true);
        localStorage.setItem('lastRequestTimestamp', currentTimestamp);
    }
    // Checks if user does not have pre recorded time stamp, and takes current time - last recorded time to get the difference.
    //  The next line: 24 * 60 * 60 * 1000 calculates number of miliseconds in a day, since Date().getTime() Returns UTC time. UTC is the total number of miliseconds that has elapsed since the epoch, defined as the midnight January 1, 1970, UTC (UNIX epoch). This will check if the current time stamp has surrpassed a day since being recorded, if it is true return new random cocktail.
 else if (!lastRequestTimestamp || currentTimestamp - lastRequestTimestamp > 24 * 60 * 60 * 1000) {
    const res = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
            const drinkName = res.data.drinks[0].strDrink;
            const newLi = document.createElement('li');
            newLi.append(drinkName);
            cockTail.append(newLi);
    localStorage.setItem('lastCocktail', drinkName);
    localStorage.setItem('lastRequestTimestamp', currentTimestamp);
    } else {
        // If less than a day has passed, retrieve the last cocktail from storage
        const lastCocktail = localStorage.getItem('lastCocktail');
        const newLi = document.createElement('li');
        newLi.append(lastCocktail);
        cockTail.append(newLi);

}
}
loadOnPage();