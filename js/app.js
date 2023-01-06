// constructors

function Insurance(brand, year, type) {
  this.brand = brand;
  this.year = year;
  this.type = type;
}

function UI() {}

UI.prototype.fillYearOptions = () => {
  const max = new Date().getFullYear(),
        min = max - 20;

  const selectYear = document.querySelector('#year');

  for ( let i = max; i >= min; i-- ) {
    let option = document.createElement('OPTION');
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
}

// show alerts on screen

UI.prototype.showAlerts = (message, typeMessage) => {

  const result = document.querySelector('#resultado');
  if (result.previousElementSibling.classList.contains('error') || result.previousElementSibling.classList.contains('correcto')) {
    result.previousElementSibling.remove()
  }

  const div = document.createElement('DIV');

  if (typeMessage === 'error') {
    div.classList.add('error');
  } else {
    div.classList.add('correcto');
  }

  div.classList.add('mensaje', 'mt-10');
  div.textContent = message;

  // Add to the html

  const form = document.querySelector('#cotizar-seguro');
  form.insertBefore(div, result);

  setTimeout(() => {
    div.remove();
  }, 2000)

}

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
  ui.fillYearOptions(); // this fill year select options
})

// Creating here validation for the form

eventListeners();

function eventListeners() {
  const form = document.querySelector('#cotizar-seguro');
  form.addEventListener('submit', quoteInsurance );
}

function quoteInsurance(e) {
  e.preventDefault();

  // read selected brand
  const brand = document.querySelector('#marca').value;
  
  // read selected year
  const year = document.querySelector('#year').value;

  // read the insurance type
  const type = document.querySelector('input[name="tipo"]:checked').value;
  
  
  if (brand === '' || year === '' || type === '') {
    return ui.showAlerts('there are empty fields', 'error')
  }

  ui.showAlerts('quoting insurance...', 'exito')


}