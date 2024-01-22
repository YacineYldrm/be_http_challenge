fetch("/api/guest_entries")
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        renderGuestEntries(data.sort((entry1, entry2) => Number(entry1.date.split(".")) < Number(entry2.date.split(".")) ? -1 : 1))})
    .catch(err => console.log(err));

const renderGuestEntries = (entriesArray) => {

    const listItemArray = entriesArray.map(entry => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong> "${entry.content}" </strong> - am ${entry.date}`;
        return listItem;
    });
        const ul = document.createElement("ul");
        ul.className = 'entries_list';
        ul.append(...listItemArray);
        document.body.querySelector('.entries_wrapper').appendChild(ul);
};


