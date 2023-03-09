const booklist = document.querySelector('.book-list');
const bookForm = document.querySelector('.book-form');
const container = document.querySelector('.container');

class Book {
    constructor(titre, auteur, année) {
        this.titre = titre;
        this.auteur = auteur;
        this.année = année;
    }

    addBook(book){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.titre}</td>
            <td>${book.auteur}</td>
            <td>${book.année}</td>
            <td><button class="delete">X</button></td>`;

        booklist.appendChild(row);
    }
    clearFields(){
        document.getElementById('titre').value = '';
        document.getElementById('auteur').value = '';
        document.getElementById('annee').value = '';
    }
    showAlert(message, className){
        const alert = document.createElement('div');
        alert.className = `alert ${className}`;
        alert.appendChild(document.createTextNode(message));
        container.insertBefore(alert, bookForm);

        setTimeout(()=>{
           document.querySelector('.alert').remove();
        },5000)
    }
}

class Interface {
    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

}


bookForm.addEventListener('submit', (e) => {

    e.preventDefault();
    const titre = document.getElementById('titre').value;
    const auteur = document.getElementById('auteur').value;
    const année = document.getElementById('annee').value;

    const book = new Book(titre, auteur, année);

    if(titre === '' || auteur === '' || année === ''){
        book.showAlert('Veuillez remplir tous les champs !', 'error' );
    }else{
        book.addBook(book);
        book.clearFields();
        book.showAlert('Livre ajouté avec succès !', 'success');

    }

});

booklist.addEventListener('click', (e) => {
    const ui = new Interface();
    ui.deleteBook(e.target);
});