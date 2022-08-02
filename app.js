// listen for sumit(summit btn code)
document.getElementById('loan-form').addEventListener('submit', function(e){
    // hide results
    document.getElementById('results').style.display = 'none';
    
    // show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

//to Calculate results
function calculateResults(){
    console.log('Loading...');
    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterst = parseFloat(interest.value) / 100 / 12;
    const calculatePayments = parseFloat(years.value) * 12;

    //compute monthly payment
    const x = Math.pow(1 + calculatedInterst, calculatePayments);
    const monthly = (principal*x*calculatedInterst)/(x-1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatePayments). toFixed(2);
        totalInterest.value = ((monthly * calculatePayments) - principal).toFixed(2);

        // show results
        document.getElementById('results').style.display = 'block';

        // hide loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please Check Your Numbers');
    }

    
}

//show error
function showError(error){
    // show results
    document.getElementById('results').style.display = 'none';

    // hide loader
    document.getElementById('loading').style.display = 'none';

    // create a div
    const errorDiv = document.createElement('div');

    // get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // create class
    errorDiv.className = 'alert alert-danger';

    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // insert erro above heading
    card.insertBefore(errorDiv, heading);

    // clear error after 3 secs
    setTimeout(clearError, 3000);
}

//cler error
function clearError(){
    document.querySelector('.alert').remove();
}