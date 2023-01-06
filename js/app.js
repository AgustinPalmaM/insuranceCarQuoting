// constructors

function Insurance(brand, year, type) {
  this.brand = brand;
  this.year = year;
  this.type = type;
}

Insurance.prototype.quoteInsurance = function() {
  
  let quantity;
  const baseAmount = 15000;

  switch (this.brand) {
    case '1':
      quantity = baseAmount * 1.5;
      break;
    case '2':
      quantity = baseAmount * 1.2;
      break;
    case '3':
      quantity = baseAmount * 2.0;
      break;  
    default:
      break;
  }

  // get the years of use of the selected car
  const yearsOfUse = new Date().getFullYear() - this.year;
  
  // apply 3% of discount to quantity by every year of use
  quantity -= (( yearsOfUse * 3 ) * quantity ) / 100;
  
  // apply 30% charge if type of insurance is basic or 50% if type of insurance is complete

  this.type === 'basico' ? quantity *= 1.3 : quantity *= 1.5;
  return quantity;
  
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

UI.prototype.showResultQuotingInsurance = (insurance, totalInsurance) => {
  const { brand, year, type } = insurance;
  let brandText;
  brand === '1' ? brandText = 'Americano' : brand === '2' ? brandText = 'Asiatico' : 'Europeo';

  const result = document.querySelector('#resultado');
  if(result.firstElementChild) {
    result.firstElementChild.remove()
  }
  const div = document.createElement('DIV');
  div.classList.add('mt-10');

  div.innerHTML = `
    <p class="header">Your summary<p>
    <p class="font-bold">Brand: <span class="font-normal">${brandText}</span><p>
    <p class="font-bold">Year: <span class="font-normal">${year}</span><p>
    <p class="font-bold">Insurance Type: <span class="font-normal">${type}</span><p>
    <p class="font-bold">Total: <span class="font-normal">$ ${totalInsurance}</span><p>
  `;

  
  const spinner = document.querySelector('#cargando');
  spinner.style.display = 'block'
  
  setTimeout(() => {
    spinner.style.display = 'none'
    result.appendChild(div);
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

  ui.showAlerts('quoting insurance...', 'exito');

  // instantiate the insurance with the data from the form
  const insurance = new Insurance(brand, year, type);
  const totalInsurance = insurance.quoteInsurance();

  ui.showResultQuotingInsurance(insurance, totalInsurance);

}