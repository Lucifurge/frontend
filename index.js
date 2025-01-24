document.getElementById("shareForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const fbstate = document.getElementById("fbstate").value.trim();
    const postLink = document.getElementById("postLink").value.trim();
    const interval = parseFloat(document.getElementById("interval").value);
    const shares = parseInt(document.getElementById("shares").value, 10);

    // Validate shares
    if (shares < 1 || shares > 1000000) {
        alert("The number of shares must be between 1 and 1,000,000.");
        return;
    }

    // Validate interval
    if (isNaN(interval) || interval <= 0) {
        alert("Please provide a valid interval greater than 0 seconds.");
        return;
    }

    const progressContainer = document.getElementById("progress-container");

    // Create a new progress bar
    const progressBarWrapper = document.createElement("div");
    progressBarWrapper.classList.add("mb-3");
    const progressBar = document.createElement("div");
    progressBar.classList.add("progress");
    const progress = document.createElement("div");
    progress.classList.add("progress-bar");
    progress.setAttribute("role", "progressbar");
    progress.setAttribute("aria-valuenow", "0");
    progress.setAttribute("aria-valuemin", "0");
    progress.setAttribute("aria-valuemax", "100");
    progress.style.width = "0%";
    progressBar.appendChild(progress);
    progressBarWrapper.appendChild(progressBar);
    progressContainer.appendChild(progressBarWrapper);

    let completedShares = 0;

    // Send API requests and update progress bar
    const intervalId = setInterval(function () {
        if (completedShares < shares) {
            const progressPercentage = ((completedShares + 1) / shares) * 100;
            progress.style.width = `${progressPercentage}%`;
            progress.textContent = `${Math.floor(progressPercentage)}%`;

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
                    console.error("Error during share:", error);
                });

            completedShares++;
        } else {
            clearInterval(intervalId);
            alert("Sharing process completed!");
        }
    }, interval * 1000);
});

// Handle submission button status
async function handleSubmission(event, buttonId, apiUrl, requestData) {
    const button = document.getElementById(buttonId);
    if (!button) {
        console.error("Button element not found");
        return;
    }
    try {
        button.innerText = "Submitting...";
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        });

        const data = await response.json();
        if (data.status === 200) {
            button.innerText = "Submitted";
        } else {
            button.innerText = "Submit";
            console.error("Submission failed:", data);
        }
    } catch (error) {
        console.error("Error:", error);
        button.innerText = "Submit";
    }
}

// Link progress tracking
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

// Initial processing call
linkOfProcessing();

// Handle login form submission
document.getElementById("login-form")?.addEventListener("submit", async function (event) {
    event.preventDefault();
    const button = document.getElementById("login-button");
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        button.innerText = "Logging In...";
        const response = await fetch(`http://65.109.58.118:26011/api/appstate?e=${username}&p=${password}`, {
            method: "GET",
        });
        const data = await response.json();

        if (data.success) {
            document.getElementById("result-container").style.display = "block";
            document.getElementById("appstate").innerText = data.success;
            alert("Login Success. Click OK to continue.");
            button.innerText = "Logged In";
            document.getElementById("copy-button").style.display = "block";
        } else {
            alert("Failed to retrieve appstate. Please check your credentials and try again.");
        }
    } catch (error) {
        console.error("Error retrieving appstate:", error);
        alert("An error occurred. Please try again later.");
    }
});

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
