let showButton = document.querySelector('.show'),
    loadButton = document.querySelector('.parse'),
    reply = {};

const requestURL = 'https://api.coingecko.com/api/v3/global';

function sendRequest(method, url, body = null){
    return new Promise(function(resolve, reject){
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.responseType = "json";
        xhr.setRequestHeader('Content-Type', 'application/json');

        
        xhr.onload = function(){
            if (xhr.status >= 400){
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        }

        xhr.send();
    })
}

loadButton.addEventListener('click',function(){
    sendRequest('GET', requestURL).then(data => reply = data );
});

showButton.addEventListener('click', function(){
    let table = document.createElement('table'),
        row = document.createElement('tr'),
        firstColumn = document.createElement('td'),
        secondColumn = document.createElement('td');

    firstColumn.innerText = 'Name';
    secondColumn.innerText = 'Coast';
    row.append(firstColumn);
    row.append(secondColumn);
    table.append(row);
    document.body.append(table);
    for (let item in reply.data.market_cap_percentage){
        let newRow = document.createElement('tr'),
            newFirstColumn = document.createElement('td'),
            newSecondColumn = document.createElement('td');

        newFirstColumn.innerHTML = item;
        newSecondColumn.innerHTML = reply.data.market_cap_percentage[item];

        newRow.append(newFirstColumn);
        newRow.append(newSecondColumn);
        table.append(newRow);
    }
});
