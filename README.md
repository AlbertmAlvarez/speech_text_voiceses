<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic Teacher Voice Assistant</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="style.css" rel="stylesheet">
</head>
<body>
    <div class="container py-4">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="card main-card">
                    <div class="card-header">
                        <h2><i class="fas fa-chalkboard-teacher me-2"></i>Dynamic Teacher Voice</h2>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="control-panel">
                                    <div class="mb-3">
                                        <label class="form-label"><i class="fas fa-microphone me-2"></i>Voice Selection:</label>
                                        <select id="voiceSelect" class="form-select"></select>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label class="form-label"><i class="fas fa-book me-2"></i>Subject:</label>
                                        <select id="topicSelect" class="form-select">
                                            <option value="general">General</option>
                                            <option value="science">Science</option>
                                            <option value="history">History</option>
                                            <option value="literature">Literature</option>
                                            <option value="mathematics">Mathematics</option>
                                        </select>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label"><i class="fas fa-theater-masks me-2"></i>Teaching Style:</label>
                                        <select id="emotionSelect" class="form-select">
                                            <option value="neutral">Professional</option>
                                            <option value="excited">Enthusiastic</option>
                                            <option value="serious">Formal</option>
                                            <option value="friendly">Engaging</option>
                                        </select>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label"><i class="fas fa-tachometer-alt me-2"></i>Base Speed:</label>
                                        <span id="rateValue" class="badge bg-primary float-end">1.0</span>
                                        <input type="range" class="form-range" id="rate" min="0.5" max="1.5" value="1" step="0.1">
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label"><i class="fas fa-wave-square me-2"></i>Base Pitch:</label>
                                        <span id="pitchValue" class="badge bg-primary float-end">1.0</span>
                                        <input type="range" class="form-range" id="pitch" min="0.8" max="1.2" value="1" step="0.1">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-md-8">
                                <div class="content-panel">
                                    <div class="emotion-indicators mb-3">
                                        <span class="badge bg-info me-2" id="currentEmotion">Current Style: Professional</span>
                                        <span class="badge bg-success" id="topicIndicator">Subject: General</span>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label class="form-label"><i class="fas fa-edit me-2"></i>Lesson Content:</label>
                                        <textarea id="textInput" class="form-control" rows="10" 
                                            placeholder="Enter your lesson content here...&#10;Use punctuation marks for natural expression:&#10;- Question marks (?) for inquiries&#10;- Exclamation marks (!) for emphasis&#10;- Periods (.) for normal statements"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="control-buttons text-center mt-4">
                            <button id="speakButton" class="btn btn-primary btn-lg">
                                <i class="fas fa-play me-2"></i>Start Teaching
                            </button>
                            <button id="pauseButton" class="btn btn-warning btn-lg mx-3">
                                <i class="fas fa-pause me-2"></i>Pause
                            </button>
                            <button id="stopButton" class="btn btn-danger btn-lg">
                                <i class="fas fa-stop me-2"></i>Stop
                            </button>
                           
                          <!-- Add this section after your control-buttons div -->
                            <div class="recordings-container mt-4">
                                <h4 class="mb-3"><i class="fas fa-list me-2"></i>Recorded Lessons</h4>
                                <div id="recordingsList" class="recordings-list">
                                    <!-- Recordings will appear here automatically -->
                                </div>
                            </div>

                                                </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
