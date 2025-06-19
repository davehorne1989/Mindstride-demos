// Function to calculate mental health statistics
function calculateMentalHealthStats(employees) {
    let totalMentalHealth = Math.floor(employees * 0.33);
    let anxiety = Math.floor(employees * 0.125);
    let depression = Math.floor(employees * 0.09);
    let insomnia = Math.floor(employees * 0.15);
    let adhd = Math.floor(employees * 0.05);
    let burnout = Math.floor(employees * 0.33);
    let bipolar = Math.floor(employees * 0.03);

    document.getElementById('total-mental-health').setAttribute('data-value', totalMentalHealth);
    document.getElementById('anxiety').setAttribute('data-value', anxiety);
    document.getElementById('depression').setAttribute('data-value', depression);
    document.getElementById('insomnia').setAttribute('data-value', insomnia);
    document.getElementById('adhd').setAttribute('data-value', adhd);
    document.getElementById('burnout').setAttribute('data-value', burnout);
    document.getElementById('bipolar').setAttribute('data-value', bipolar);

    animateNumbers();
}

function animateNumbers() {
    let counters = document.querySelectorAll('[data-value]');
    counters.forEach(function (counter) {
        let endValue = parseInt(counter.getAttribute('data-value'));
        let startValue = parseInt(counter.textContent);

        if (isNaN(startValue)) startValue = 0;

        animateValue(counter, startValue, endValue, 2000);
    });
}

function animateValue(element, start, end, duration) {
    let range = end - start;
    let increment = range / (duration / 50);
    let current = start;
    let stepTime = 50;

    let timer = setInterval(function () {
        current += increment;

        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }

        element.textContent = Math.floor(current);
    }, stepTime);
}

// Function to calculate ROI results
function calculateResults() {
    var totalEmps = parseFloat(document.getElementById('totalEmployees').value);
    var LOAinDays = parseFloat(document.getElementById('loaInDays').value);
    var AvgAnnSalary = parseFloat(document.getElementById('avgAnnualSalary').value);
    var LengthOfAbs = parseFloat(document.getElementById('lengthOfAbs').value);
    var EmpsOnLOA = parseFloat(document.getElementById('empsOnLOA').value);
    var AvgTurnRate = parseFloat(document.getElementById('avgTurnRate').value);

    if (!isNaN(totalEmps) && !isNaN(LOAinDays) && !isNaN(AvgAnnSalary) && !isNaN(LengthOfAbs) && !isNaN(EmpsOnLOA) && !isNaN(AvgTurnRate)) {
        let numEmpsOnLOA = EmpsOnLOA / 100 * totalEmps;
        let CstPrEmpPrDayOnLOA = AvgAnnSalary / 260;
        let AvgHrlySlry = AvgAnnSalary / 52 / 40;
        let WellnessAdoptionRate = 0.3;
        let finalSvdCost = 0;

        finalSvdCost += LOAinDays * numEmpsOnLOA * CstPrEmpPrDayOnLOA
            - 30 * numEmpsOnLOA * CstPrEmpPrDayOnLOA
            + 8 * LengthOfAbs * AvgHrlySlry * 0.27 * totalEmps * 0.5 * 0.8 * WellnessAdoptionRate
            + AvgTurnRate / 100 * 0.55 * 0.35 * AvgHrlySlry * 2087 * 0.03 * WellnessAdoptionRate * totalEmps
            + AvgHrlySlry * (totalEmps * 15 / 100 * 50)
            + CstPrEmpPrDayOnLOA / 8 * (4 * (0.65 * (1.5 * totalEmps)));

        document.getElementById('result').innerHTML = "$" + Math.trunc(finalSvdCost).toLocaleString();
    } else {
        document.getElementById('result').innerHTML = 'Please fill out all fields.';
    }
}

// Initialize default values for ROI calculator
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loaInDays').value = 65;
    document.getElementById('avgAnnualSalary').value = 60000;
    document.getElementById('lengthOfAbs').value = 10.5;
    document.getElementById('empsOnLOA').value = 2.5;
    document.getElementById('avgTurnRate').value = 15;

    // Add event listener for recalculate button
    document.getElementById("recalculateButton").addEventListener('click', function() {
        calculateResults();
    });
}); 