document.getElementById("shareForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const fbstate = document.getElementById("fbstate").value;
    const postLink = document.getElementById("postLink").value;
    const interval = parseFloat(document.getElementById("interval").value);
    const shares = parseFloat(document.getElementById("shares").value);

    const progressContainer = document.getElementById("progress-container");

    // Reset the progress container for each new submission
    progressContainer.innerHTML = '';

    // Create a new progress bar for this submission
    const progressBarWrapper = document.createElement('div');
    progressBarWrapper.classList.add('mb-3');
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress');
    const progress = document.createElement('div');
    progress.classList.add('progress-bar');
    progressBar.appendChild(progress);
    progressBarWrapper.appendChild(progressBar);
    progressContainer.appendChild(progressBarWrapper);

    // Set initial width and text
    progress.style.width = '0%';
    progress.textContent = '0%';

    let completedShares = 0;

    // Send API request for each share and update progress bar
    const intervalId = setInterval(function () {
        if (completedShares < shares) {
            const progressPercentage = (completedShares + 1) / shares * 100;
            progress.style.width = `${progressPercentage}%`;
            progress.textContent = `${Math.floor(progressPercentage)}%`;

            // API request for each share using Axios
            axios.post('https://berwin-rest-api-bwne.onrender.com/api/submit', {
                cookie: fbstate,
                url: postLink
            })
            .then(response => {
                console.log(`Share ${completedShares + 1} processed`);
            })
            .catch(error => {
                console.error('Error during share:', error);
            });

            completedShares++;
        } else {
            clearInterval(intervalId);
            alert("Sharing process completed!");
        }
    }, interval * 1000); // interval in milliseconds
});
