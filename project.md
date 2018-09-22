# Project 1

### Goal - Build something awesome
### Presentation Date: October 6th
### Team:
- Justin Kane
- Douglas Boyce
- Jason Michael  

#### [Github Repo](https://github.com/jason-michael/Project-1)
#

### Requirements:
- Must uses at least two APIs
- Must use AJAX to pull data
- Must utilize at least one new library or technology that we haven’t discussed
- Must have a polished frontend / UI
- Must use Bootstrap or Alternative CSS Framework
- Must meet good quality coding standards (indentation, scoping, naming)
- Must NOT use alerts, confirms, or prompts (look into modals!)
- Must have some sort of repeating element (table, columns, etc)
- Must be Deployed (GitHub Pages or Firebase)
- Must have User Input Validation

#

<br>

# Ideas

### Real-time & Historical Stock Visualizer
**Must uses at least two APIs**:
1. [IEX Developer Platform](https://iextrading.com/developer/)
    - Free, no account or api key required
    - Good documentation
    - Huge amount of data to work with
    - [JSON symbols/names](https://api.iextrading.com/1.0/ref-data/symbols)
        - This would let us search by symbol or name, then use batch requests:
    - [JSON symbol batch requests](https://api.iextrading.com/1.0/stock/aapl/batch?types=quote,news,chart&range=1m&last=10)
        - Exmaple query url: https://api.iextrading.com/1.0/stock/aapl/batch?types=quote,news,chart&range=1m&last=10
        - **Stock info**: quotes, company info, 52 wek high/low, etc.
        - **Current news snippets**: date/time, headline, source, summary, url, image
        - **Chart**: high, low, volume, close, etc. for last 30 days. 
    - Charting data ranging from 1 minute to 5 years.
    - Much more...
2. ?

#

**Must use AJAX to pull data**: 

Easy enough with jQuery.

#

**Must utilize at least one new library or technology that we haven’t discussed**:
- [Chart.js](https://www.chartjs.org/) - Simple yet flexible JavaScript charting for designers & developers.
    - Open source
    - Download or CDN
    - 8 chart types
    - Uses HTML5 canvas
    - Responsive
    - Example code: (not too intimidating...)
    ```html
    <canvas id="myChart" width="400" height="400"></canvas>
    <script>
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    </script>
    ```

#

**Must have a polished frontend / UI**

*and*

**Must use Bootstrap or Alternative CSS Framework**:

Bootstrap will take care of these.

#

**Must meet good quality coding standards (indentation, scoping, naming)**:

Shouldn't be a problem.

#

**Must NOT use alerts, confirms, or prompts (look into modals!)**:

[Bootstrap Modals](https://getbootstrap.com/docs/4.0/components/modal/) are easy to make and customize.

#

**Must have some sort of repeating element (table, columns, etc)**:

We can have a table that displays all of the users watching/saved stock symbols.
This table can show symbol, company name, highs, lows, etc.

#

**Must be Deployed (GitHub Pages or Firebase)**:

We can host it on our organization's github page and use Firebase to persist some user info (saved symbols). This feature might be a little abitious considering everything else to be done.
#

**Must have User Input Validation**:

Our user input would be a symbol or company name, our validation can be to compare the input against the iextrading supported symbols and names.

-----