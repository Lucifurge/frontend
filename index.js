<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ishaanshares</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css">
    <style>
        body {
            background-color: #0d1117;
            color: #c9d1d9;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
            background-image: url('default-background.jpg');
            background-size: cover;
            background-attachment: fixed;
            transition: background 0.5s ease;
        }

        .navbar {
            background: linear-gradient(90deg, #161b22, #21262d);
        }

        .navbar-nav .nav-link {
            color: #c9d1d9 !important;
            font-weight: bold;
            transition: color 0.3s ease;
        }

        .navbar-nav .nav-link:hover {
            color: #58a6ff !important;
        }

        .dropdown-menu {
            background: #21262d;
            border: none;
        }

        .dropdown-menu .dropdown-item {
            color: #c9d1d9;
            transition: background 0.3s ease;
        }

        .dropdown-menu .dropdown-item:hover {
            background: #161b22;
        }

        .hero {
            text-align: center;
            padding: 100px 20px;
            background: rgba(13, 17, 23, 0.9);
            color: white;
        }

        .hero h1 {
            font-size: 3rem;
            font-weight: bold;
        }

        .hero p {
            font-size: 1.2rem;
        }

        .hero .btn {
            background: #58a6ff;
            color: white;
            font-size: 1.2rem;
            padding: 10px 20px;
            border-radius: 30px;
        }

        .features {
            padding: 50px 20px;
        }

        .feature-card {
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .section {
            background: rgba(13, 17, 23, 0.8);
            border: 1px solid #30363d;
            border-radius: 10px;
            padding: 2rem;
            margin-top: 2rem;
        }

        .footer {
            background: #161b22;
            color: #c9d1d9;
            text-align: center;
            padding: 20px;
            margin-top: 2rem;
        }

        .footer a {
            color: #58a6ff;
            margin: 0 10px;
            transition: color 0.3s ease;
        }

        .footer a:hover {
            color: white;
        }

        .progress {
            height: 20px;
        }

        #process-container {
            position: fixed;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            z-index: 999;
            max-height: 400px;
            overflow-y: auto;
        }

        .process-item {
            background: #21262d;
            margin: 10px 0;
            padding: 15px;
            border-radius: 10px;
            color: #c9d1d9;
        }

        .process-item .process-title {
            font-size: 1.2rem;
            font-weight: bold;
        }

        .process-item .process-progress {
            margin-top: 10px;
            height: 20px;
        }

        .process-item .process-status {
            margin-top: 10px;
            font-style: italic;
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Ishaanshares</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Login/Register</a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <form class="px-4 py-3">
                                <div class="mb-3">
                                    <label for="loginUsername" class="form-label">Username</label>
                                    <input type="text" class="form-control" id="loginUsername" placeholder="Enter username">
                                </div>
                                <div class="mb-3">
                                    <label for="loginPassword" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="loginPassword" placeholder="Enter password">
                                </div>
                                <button type="submit" class="btn btn-primary w-100">Login</button>
                            </form>
                            <div class="dropdown-divider"></div>
                            <form class="px-4 py-3">
                                <div class="mb-3">
                                    <label for="registerUsername" class="form-label">Username</label>
                                    <input type="text" class="form-control" id="registerUsername" placeholder="Enter username">
                                </div>
                                <div class="mb-3">
                                    <label for="registerPassword" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="registerPassword" placeholder="Enter password">
                                </div>
                                <button type="submit" class="btn btn-secondary w-100">Register</button>
                            </form>
                        </ul>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="#features">Features</a></li>
                    <li class="nav-item"><a class="nav-link" href="#share">Share Post</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <header class="hero">
        <h1>Welcome to Ishaanshares</h1>
        <p>Effortlessly share your posts with our automated tool!</p>
        <a href="#share" class="btn">Get Started</a>
    </header>

    <section id="features" class="container features">
        <div class="row text-center">
            <div class="col-md-4">
                <div class="feature-card">
                    <h3>Automation</h3>
                    <p>Save time with our powerful auto-sharing feature.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="feature-card">
                    <h3>Customization</h3>
                    <p>Choose intervals, number of shares, and more!</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="feature-card">
                    <h3>Security</h3>
                    <p>Your data is safe with end-to-end encryption.</p>
                </div>
            </div>
        </div>
    </section>

    <section id="share" class="container py-5 section">
        <h2 class="text-center">Auto Share Your Posts</h2>
        <form id="shareForm" class="p-4">
            <div class="mb-3">
                <label for="cookies" class="form-label">Facebook Cookie (JSON format)</label>
                <textarea id="cookies" class="form-control" placeholder='[{"key": "c_user", "value": "your_value", "domain": "facebook.com", "path": "/"}]' required></textarea>
            </div>
            <div class="mb-3">
                <label for="urls" class="form-label">Post URL</label>
                <input type="url" id="urls" class="form-control" placeholder="Enter the post URL" required>
            </div>
            <div class="mb-3">
                <label for="amounts" class="form-label">Number of Shares</label>
                <input type="number" id="amounts" class="form-control" min="1" max="200000" placeholder="Enter the number of shares" required>
            </div>
            <div class="mb-3">
                <label for="intervals" class="form-label">Interval (seconds)</label>
                <input type="number" id="intervals" class="form-control" min="1" max="60" placeholder="Enter interval between shares" required>
            </div>
            <button type="submit" id="submit-button" class="btn btn-success w-100">Start Sharing</button>
        </form>
        <div id="result" class="mt-3 text-center"></div>
    </section>

    <div id="process-container"></div>

    <footer class="footer">
        <p>&copy; 2024 Ishaanshares | Powered By The Husband Of Ishaan</p>
        <p>
            <a href="#">Facebook</a> |
            <a href="#">Twitter</a> |
            <a href="#">LinkedIn</a>
        </p>
    </footer>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    <script>
        const apiEndpoint = "https://ishaanshare-production.up.railway.app/share"; // No /share

        document.getElementById("shareForm").addEventListener("submit", async function (event) {
            event.preventDefault();

            const cookies = document.getElementById("cookies").value;
            const urls = document.getElementById("urls").value;
            const amounts = document.getElementById("amounts").value;
            const intervals = document.getElementById("intervals").value;

            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "";

            try {
                resultDiv.innerHTML = "Starting to share your post... Please wait.";

                const response = await fetch(apiEndpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        cookies: cookies,
                        urls: urls,
                        amounts: amounts,
                        intervals: intervals
                    })
                });

                const data = await response.json();
                if (data.success) {
                    resultDiv.innerHTML = "Your post is being shared!";
                    displayProcessItems(data.process);
                } else {
                    resultDiv.innerHTML = "Error: " + data.message;
                }
            } catch (error) {
                resultDiv.innerHTML = "An error occurred while processing your request.";
            }
        });

        function displayProcessItems(processes) {
            const processContainer = document.getElementById("process-container");
            processContainer.innerHTML = ""; // Clear previous processes

            processes.forEach((process) => {
                const processItem = document.createElement("div");
                processItem.classList.add("process-item");

                const processTitle = document.createElement("div");
                processTitle.classList.add("process-title");
                processTitle.innerText = `Post #${process.index}: ${process.status}`;
                processItem.appendChild(processTitle);

                const processProgress = document.createElement("div");
                processProgress.classList.add("process-progress");
                processProgress.innerHTML = `<div class="progress-bar" role="progressbar" style="width: ${process.progress}%" aria-valuenow="${process.progress}" aria-valuemin="0" aria-valuemax="100"></div>`;
                processItem.appendChild(processProgress);

                const processStatus = document.createElement("div");
                processStatus.classList.add("process-status");
                processStatus.innerText = `Status: ${process.status}`;
                processItem.appendChild(processStatus);

                processContainer.appendChild(processItem);
            });
        }
    </script>
</body>

</html>
