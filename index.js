document.getElementById("shareForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const fbstate = document.getElementById("fbstate").value.trim();
    const postLink = document.getElementById("postLink").value.trim();
    const interval = parseFloat(document.getElementById("interval").value);
    const shares = parseInt(document.getElementById("shares").value, 10);

    // Validate inputs
    if (!validateInputs(shares, interval)) return;

    const progressContainer = document.getElementById("progress-container");

    // Create a new progress bar
    const progressBarWrapper = document.createElement("div");
    progressBarWrapper.classList.add("mb-3");
    const progressBar = document.createElement("div");
    progressBar.classList.add("progress");
    const progressElement = document.createElement("div");
    progressElement.classList.add("progress-bar");
    progressElement.setAttribute("role", "progressbar");
    progressElement.setAttribute("aria-valuenow", "0");
    progressElement.setAttribute("aria-valuemin", "0");
    progressElement.setAttribute("aria-valuemax", "100");
    progressElement.style.width = "0%";
    progressBar.appendChild(progressElement);
    progressBarWrapper.appendChild(progressBar);
    progressContainer.appendChild(progressBarWrapper);

    let completedShares = 0;

    // Send API requests and update progress bar
    const intervalId = setInterval(function () {
        if (completedShares < shares) {
            const progressPercentage = ((completedShares + 1) / shares) * 100;
            progressElement.style.width = `${progressPercentage}%`;
            progressElement.textContent = `${Math.floor(progressPercentage)}%`;

            // API request for each share using Axios
            axios
                .post("https://berwin-rest-api-bwne.onrender.com/api/submit", {
                    cookie: fbstate,
                    url: postLink,
                })
                .then(() => {
                    console.log(`Share ${completedShares + 1} processed`);
                })
                .catch((error) => {
                    if (error.response) {
                        console.error("Server responded with:", error.response.data);
                    } else if (error.request) {
                        console.error("No response received:", error.request);
                    } else {
                        console.error("Error setting up the request:", error.message);
                    }
                });

            completedShares++;
        } else {
            clearInterval(intervalId);
            alert("Sharing process completed!");
        }
    }, interval * 1000);
});

// Validate input values
function validateInputs(shares, interval) {
    if (shares < 1 || shares > 1000000) {
        alert("The number of shares must be between 1 and 1,000,000.");
        return false;
    }
    if (isNaN(interval) || interval <= 0) {
        alert("Please provide a valid interval greater than 0 seconds.");
        return false;
    }
    return true;
}

// Function to update progress for ongoing links
async function linkOfProcessing() {
    try {
        const container = document.getElementById("processing");
        const processContainer = document.getElementById("process-container");
        processContainer.style.display = "block";

        const initialResponse = await fetch("https://berwin-rest-api-bwne.onrender.com/total");

        if (!initialResponse.ok) {
            throw new Error(`Failed to fetch: ${initialResponse.status} - ${initialResponse.statusText}`);
        }

        const initialData = await initialResponse.json();
        if (initialData.length === 0) {
            processContainer.style.display = "none";
            return;
        }

        initialData.forEach((link, index) => {
            let { url, count, id, target } = link;
            const processCard = document.createElement("div");
            processCard.classList.add("current-online");

            const text = document.createElement("h4");
            text.classList.add("count-text");
            text.innerHTML = `${index + 1}. ID: ${id} | ${count}/${target}`;

            processCard.appendChild(text);
            container.appendChild(processCard);

            const intervalId = setInterval(async () => {
                const updateResponse = await fetch("https://berwin-rest-api-bwne.onrender.com/total");

                if (!updateResponse.ok) {
                    console.error(`Failed to fetch update: ${updateResponse.status} - ${updateResponse.statusText}`);
                    clearInterval(intervalId); // Stop interval on failure
                    return;
                }

                const updateData = await updateResponse.json();
                const updatedLink = updateData.find((link) => link.id === id);

                if (updatedLink) {
                    let { count } = updatedLink;
                    update(processCard, count, id, index, target);
                }
            }, 1000);
        });
    } catch (error) {
        console.error(error);
    }
}

// Update progress for each link
function update(card, count, id, index, target) {
    const container = card.querySelector(".count-text");
    if (container) {
        container.textContent = `${index + 1}. ID: ${id} | ${count}/${target}`;
    }
}

// Copy appstate to clipboard
document.getElementById("copy-button").addEventListener("click", function () {
    const appstateText = document.getElementById("appstate").innerText;
    navigator.clipboard.writeText(appstateText).then(
        () => alert("Appstate copied to clipboard!"),
        (err) => {
            console.error("Failed to copy appstate: ", err);
            alert("Failed to copy appstate. Please try again.");
        }
    );
});
