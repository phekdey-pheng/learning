$(document).ready(function() {
  // Sample JSON data containing user email and password
  const userData = [
    { "email": "admin@gmail.com", "password": "admin@123" },
    { "email": "user1@gmail.com", "password": "user1@123" },
    { "email": "user2@gmail.com", "password": "user2@123" },
    { "email": "user3@gmail.com", "password": "user3@123" }
  ];

  // Check if the user is already logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    showDashboard();
  }

  // Form submission handling
  $('#loginForm').submit(function(e) {
    e.preventDefault();

    // Get input values
    const email = $('#email').val();
    const password = $('#password').val();

    // Check if the entered credentials match any user account in the JSON data
    const matchedUser = userData.find(user => user.email === email && user.password === password);
    if (matchedUser) {
      // Set login status to 'true' in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      showDashboard();
    } else {
      // Show incorrect login modal
      $('#incorrectLoginModal').modal('show');
    }
  });

  // Logout handling
  $('#confirmLogout').on('click', function() {
    $('#loginSection').hide(); // Hide the login section immediately
    // Show a loading indicator or message before redirecting
    $('#loadingIndicator').show(); // Display loading indicator
    // Simulate a delay of 1 second before redirecting to the login page
    setTimeout(function() {
      logout(); // Call the logout function after the delay
    }, 1000);
  });

  // Function to show the dashboard and handle navigation
  function showDashboard() {
    $('#loginSection').hide();
    $('#dashboardSection').hide();
    $('header').hide(); // Hide the header upon successful login
    $('#loadingIndicator').show(); // Display loading indicator

    // Simulate a delay of 15 seconds before displaying the dashboard
    setTimeout(function() {
      $('#loadingIndicator').hide(); // Hide loading indicator
      $('header').show(); // Show the header upon successful login
      $('#dashboardSection').show(); // Show the dashboard
      $('body').addClass('showBackgroundText'); // Add class to show background text

      // Remove 'active' class from Dashboard on page load
      $('.nav-link').filter(':contains("Dashboard")').removeClass('active');

      // Handle dropdown and menu item clicks for navigation
      $('.dropdown-item').on('click', function(e) {
        e.preventDefault();
        var page = $(this).data('page');

        if (page === 'logout') {
          // Show the logout confirmation modal
          $('#logoutModal').modal('show');
        } else {
          loadPageContent(page);
          toggleActiveState(this);
        }
      });

      $('.nav-link').on('click', function(e) {
        e.preventDefault();
        var page = $(this).text().toLowerCase();
        loadPageContent(page);
        toggleActiveState(this);
      });

      $('form').submit(function(e) {
        e.preventDefault();
        // Perform login validation here
        // For simplicity, just toggle the login and dashboard sections
        $('#loginSection').hide();
        $('#dashboardSection').show();
      });
    }, 1000); // 1 seconds delay
  }

  // Function to handle logout
  function logout() {
    // Hide the loading indicator
    $('#loadingIndicator').hide();
    $('#loginSection').show(); // Show the login section
    $('header').hide(); // Hide the header upon logout
    $('#logoutModal').modal('hide'); // Hide the modal
    localStorage.setItem('isLoggedIn', 'false'); // Set login status to 'false' in localStorage
    window.location.reload(); // Refresh the page to clear the session
  }

  // Function to load content into main area based on selected page
  function loadPageContent(page) {
    var content = getContentByPage(page);
    $('#mainContent').html(content);
  }

  // Function to get content based on the selected page
  function getContentByPage(page) {
    var content = ''; // Initialize empty content

    // Check the selected page and assign content based on page name
    switch (page) {
      case 'profile':
      content = getProfileContent();
      break;
      case 'settings':
      content = getSettingsContent();
      break;
      case 'dashboard':
      content = '<h2>Dashboard Page</h2><p>This is the dashboard content.</p>';
      break;
      case 'course':
      content = getCourseContent();
      break;
      case 'tips':
      content = '<h2>Tips Page</h2><p>This is the tips content.</p>';
      break;
      case 'tools':
      content = getToolsContent();
      break;
      case 'about':
      content = getAboutContent();
      break;
      default:
      content = '<h2>Page User</h2><p>This is the about user.</p>';
    }

    return content;
  }

  // Function to toggle 'active' class on menu items
  function toggleActiveState(element) {
    $('.nav-link').removeClass('active');
    $(element).addClass('active');
  }
  function getProfileContent() {
  var profileContent = `
    <h2>Profile</h2>
    <div class="profile-info">
      <form id="profileForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" class="form-control" id="name" placeholder="Enter your name" required>
      </div>
      <div class="form-group">
        <label for="gender">Gender:</label>
        <select class="form-control" id="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="form-group">
        <label for="dob">Date of Birth:</label>
        <input type="date" class="form-control" id="dob">
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="tel" class="form-control" id="phone" placeholder="Enter your phone number">
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" class="form-control" id="email" placeholder="Enter your email" required>
      </div>
      <div class="form-group">
        <label for="job">Job:</label>
        <input type="text" class="form-control" id="job" placeholder="Enter your job">
      </div>
      <div class="form-group">
        <label for="address">Address:</label>
        <input type="text" class="form-control" id="address" placeholder="Enter your address">
      </div>
      <div class="form-group">
        <label for="bio">Bio:</label>
        <textarea class="form-control" id="bio" rows="3" placeholder="Enter your bio"></textarea>
      </div>
      <button type="submit" id="saveProfile" class="btn btn-primary float-right">Save</button>
    </form>
    </div>
  `;
  return profileContent;
}

function getSettingsContent() {
  var settingContent = `
    <h2>Settings</h2>
    <div class="settings-info">
      <form id="settingsForm">
    <div class="form-group">
      <label for="currentPassword">Current Password</label>
      <input type="password" class="form-control" id="currentPassword" required>
    </div>
    <div class="form-group">
      <label for="newPassword">New Password</label>
      <input type="password" class="form-control" id="newPassword" required>
    </div>
    <div class="form-group">
      <label for="reenterNewPassword">Re-enter New Password</label>
      <input type="password" class="form-control" id="reenterNewPassword" required>
    </div>
    <div class="form-group">
      <label for="privacyPolicy">Privacy Policy</label>
      <textarea class="form-control" id="privacyPolicy" rows="3" required></textarea>
    </div>
    <div class="form-group">
      <label for="accountOptions">Account Options</label>
      <select class="form-control" id="accountOptions">
        <option value="delete">Delete</option>
        <option value="disable">Disable</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary float-right">Save Changes</button>
  </form>
    </div>
  `;
  return settingContent;
}

function getAboutContent() {
  var aboutContent = `
    <h2>About</h2>
    <div id="accordion">
    <div class="card">
      <div class="card-header" id="aboutPlatform">
        <h5 class="mb-0">
          <button class="btn btn-link" data-toggle="collapse" data-target="#collapseAboutPlatform" aria-expanded="true" aria-controls="collapseAboutPlatform">
            About this Platform
          </button>
        </h5>
      </div>
      <div id="collapseAboutPlatform" class="collapse" aria-labelledby="aboutPlatform" data-parent="#accordion">
        <div class="card-body">
          Information about the platform goes here.
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" id="howToUse">
        <h5 class="mb-0">
          <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseHowToUse" aria-expanded="false" aria-controls="collapseHowToUse">
            How to Use
          </button>
        </h5>
      </div>
      <div id="collapseHowToUse" class="collapse" aria-labelledby="howToUse" data-parent="#accordion">
        <div class="card-body">
          Information about how to use the platform goes here.
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" id="developer">
        <h5 class="mb-0">
          <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseDeveloper" aria-expanded="false" aria-controls="collapseDeveloper">
            Developer
          </button>
        </h5>
      </div>
      <div id="collapseDeveloper" class="collapse" aria-labelledby="developer" data-parent="#accordion">
        <div class="card-body">
          Information about the developer goes here.
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" id="contact">
        <h5 class="mb-0">
          <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseContact" aria-expanded="false" aria-controls="collapseContact">
            Contact
          </button>
        </h5>
      </div>
      <div id="collapseContact" class="collapse" aria-labelledby="contact" data-parent="#accordion">
        <div class="card-body">
          Contact information goes here.
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" id="socialMedia">
        <h5 class="mb-0">
          <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseSocialMedia" aria-expanded="false" aria-controls="collapseSocialMedia">
            Social Media
          </button>
        </h5>
      </div>
      <div id="collapseSocialMedia" class="collapse" aria-labelledby="socialMedia" data-parent="#accordion">
        <div class="card-body">
          Social media links go here.
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" id="credit">
        <h5 class="mb-0">
          <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseCredit" aria-expanded="false" aria-controls="collapseCredit">
            Credit
          </button>
        </h5>
      </div>
      <div id="collapseCredit" class="collapse" aria-labelledby="credit" data-parent="#accordion">
        <div class="card-body">
          Credits for resources or contributions go here.
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" id="version">
        <h5 class="mb-0">
          <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseVersion" aria-expanded="false" aria-controls="collapseVersion">
            Version
          </button>
        </h5>
      </div>
      <div id="collapseVersion" class="collapse" aria-labelledby="version" data-parent="#accordion">
        <div class="card-body">
          Platform version information goes here.
        </div>
      </div>
    </div>
  </div>
  `;
  return aboutContent;
}

function getToolsContent() {
  var toolsContent = `
    <h2>Tools</h2>
    <div class="row">
    <!-- First Card -->
    <div class="col-md-3 mb-4">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">Tool Title 1</h5>
        </div>
        <div class="card-body">
          <p class="card-text">Description of Tool 1 goes here.</p>
          <p class="card-text"><strong>How to Use:</strong> Instructions on how to use Tool 1.</p>
          <a href="#" class="card-link">Download Link</a>
          <p class="card-text"><strong>Password:</strong> Password for Tool 1.</p>
        </div>
        <div class="card-footer text-muted">
          <small>Developed by Developer 1</small>
        </div>
      </div>
    </div>

    <!-- Second Card -->
    <div class="col-md-3 mb-4">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">Tool Title 2</h5>
        </div>
        <div class="card-body">
          <p class="card-text">Description of Tool 2 goes here.</p>
          <p class="card-text"><strong>How to Use:</strong> Instructions on how to use Tool 2.</p>
          <a href="#" class="card-link">Download Link</a>
          <p class="card-text"><strong>Password:</strong> Password for Tool 2.</p>
        </div>
        <div class="card-footer text-muted">
          <small>Developed by Developer 2</small>
        </div>
      </div>
    </div>

    <!-- Third Card -->
    <div class="col-md-3 mb-4">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">Tool Title 3</h5>
        </div>
        <div class="card-body">
          <p class="card-text">Description of Tool 3 goes here.</p>
          <p class="card-text"><strong>How to Use:</strong> Instructions on how to use Tool 3.</p>
          <a href="#" class="card-link">Download Link</a>
          <p class="card-text"><strong>Password:</strong> Password for Tool 3.</p>
        </div>
        <div class="card-footer text-muted">
          <small>Developed by Developer 3</small>
        </div>
      </div>
    </div>

    <!-- Fourth Card -->
    <div class="col-md-3 mb-4">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">Tool Title 4</h5>
        </div>
        <div class="card-body">
          <p class="card-text">Description of Tool 4 goes here.</p>
          <p class="card-text"><strong>How to Use:</strong> Instructions on how to use Tool 4.</p>
          <a href="#" class="card-link">Download Link</a>
          <p class="card-text"><strong>Password:</strong> Password for Tool 4.</p>
        </div>
        <div class="card-footer text-muted">
          <small>Developed by Developer 4</small>
        </div>
      </div>
    </div>
  </div>
  `;
  return toolsContent;
}

function getCourseContent() {
  var courseContent = `
    <h2>Course</h2>
    <div class="course-scroll-container">
      <div class="row">
      <!-- First Course Card -->
      <div class="col-md-2">
        <a href="#" class="card-link" id="courseLink">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Course Title 1</h5>
              <p class="card-text">Description of Course 1 goes here.</p>
              <p class="card-text"><strong>Category:</strong> Category 1</p>
              <p class="card-text"><strong>Level:</strong> Level 1</p>
              <p class="card-text"><strong>Price:</strong> Price 1</p>
            </div>
          </div>
        </a>
      </div>

      <!-- Second Course Card -->
      <div class="col-md-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Course Title 2</h5>
            <p class="card-text">Description of Course 2 goes here.</p>
            <p class="card-text"><strong>Category:</strong> Category 2</p>
            <p class="card-text"><strong>Level:</strong> Level 2</p>
            <p class="card-text"><strong>Price:</strong> Price 2</p>
          </div>
        </div>
      </div>

      <!-- Third Course Card -->
      <div class="col-md-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Course Title 3</h5>
            <p class="card-text">Description of Course 3 goes here.</p>
            <p class="card-text"><strong>Category:</strong> Category 3</p>
            <p class="card-text"><strong>Level:</strong> Level 3</p>
            <p class="card-text"><strong>Price:</strong> Price 3</p>
          </div>
        </div>
      </div>

      <!-- Second Course Card -->
      <div class="col-md-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Course Title 2</h5>
            <p class="card-text">Description of Course 2 goes here.</p>
            <p class="card-text"><strong>Category:</strong> Category 2</p>
            <p class="card-text"><strong>Level:</strong> Level 2</p>
            <p class="card-text"><strong>Price:</strong> Price 2</p>
          </div>
        </div>
      </div>

      <!-- Third Course Card -->
      <div class="col-md-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Course Title 3</h5>
            <p class="card-text">Description of Course 3 goes here.</p>
            <p class="card-text"><strong>Category:</strong> Category 3</p>
            <p class="card-text"><strong>Level:</strong> Level 3</p>
            <p class="card-text"><strong>Price:</strong> Price 3</p>
          </div>
        </div>
      </div>

      <!-- Fourth Course Card -->
      <div class="col-md-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Course Title 4</h5>
            <p class="card-text">Description of Course 4 goes here.</p>
            <p class="card-text"><strong>Category:</strong> Category 4</p>
            <p class="card-text"><strong>Level:</strong> Level 4</p>
            <p class="card-text"><strong>Price:</strong> Price 4</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- VDO*/ -->
  <div class="video-player-container" style="display: none;">
    <div>
      <hr>
      <h4><b>Course Title 1</b></h4>
      <br><br>
    </div>
    <div class="video-list">
      <h5>Video List</h5>
      <ul id="videoList">
        <li><a href="#" data-video="1myqjz3oXhthQ6QtKp4aW684D0Ekho-Mm">1. Installing the JDK</a></li>
        <li><a href="#" data-video="1w_gqzuvAfYN925fngMv-aA-OtDwhRE-3">2. Running a Java Program</a></li>
        <li><a href="#" data-video="1N6G5cA6yxaxeu0MP9wilU87IxezSquls">3. Downloading Eclipse</a></li>
        <li><a href="#" data-video="1ULmeQlg_SBhf1tj84irdkVLCXG10u1-w">4. Hello YouTube</a></li>
        <li><a href="#" data-video="1N6G5cA6yxaxeu0MP9wilU87IxezSquls">5. Variables</a></li>
        <li><a href="#" data-video="1ULmeQlg_SBhf1tj84irdkVLCXG10u1-w">6. Getting User Input</a></li>
        <!-- Add more video list items as needed -->
      </ul>
    </div>
    <div class="video-player">
      <iframe src="https://drive.google.com/file/d/1myqjz3oXhthQ6QtKp4aW684D0Ekho-Mm/preview" width="800" height="520" allowfullscreen></iframe>
    </div>
  </div>


  `;

  // Create a container element to hold the course content
  var container = document.createElement('div');
  container.innerHTML = courseContent;

  // Add a click event listener to the card links
  container.querySelectorAll('.card-link').forEach(function (cardLink) {
    cardLink.addEventListener('click', function (event) {
      event.preventDefault();
      showVideoPlayer();
    });
  });

  var isVideoPlayerVisible = false;

  // Function to toggle visibility of the video player
  function toggleVideoPlayer() {
    const videoPlayer = document.querySelector('.video-player-container');

    if (!isVideoPlayerVisible) {
      showVideoPlayer();
      isVideoPlayerVisible = true;
    } else {
      hideVideoPlayer();
      isVideoPlayerVisible = false;
    }
  }

  // Event listener for the course card link
  container.querySelectorAll('.card-link').forEach(function (cardLink) {
    cardLink.addEventListener('click', function (event) {
      event.preventDefault();
      toggleVideoPlayer();
    });
  });

  // Function to hide the video player
  function hideVideoPlayer() {
    const videoPlayer = document.querySelector('.video-player-container');
    videoPlayer.style.display = 'none';
  }

  // Function to show the video player
  function showVideoPlayer() {
    const allVideoPlayers = document.querySelectorAll('.video-player-container');
    allVideoPlayers.forEach(player => {
      player.style.display = 'none';
    });

    const videoPlayer = document.querySelector('.video-player-container');
    videoPlayer.style.display = 'block';
  }


  return container;
}

// Function to switch the video source
function switchVideo(videoId) {
  const videoPlayer = document.getElementById('videoPlayer');
  videoPlayer.src = `https://drive.google.com/file/d/${videoId}/preview`;
}

// Add event listeners to each video link
document.querySelectorAll('.video-list a').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const videoId = this.getAttribute('data-video');
    switchVideo(videoId);
    console.log("videoId" + videoId);
  });
});





/*// Function to play the next video in the list
function playNextVideo() {
  const videoLinks = document.getElementById('videoList').getElementsByTagName('a');

  for (let i = 0; i < videoLinks.length; i++) {
    if (videoLinks[i].classList.contains('active')) {
      if (i < videoLinks.length - 1) {
        videoLinks[i + 1].click();
        break;
      }
    }
  }
}

// Function to show the video player
function showVideoPlayer() {
  // Hide all other video players (if there are multiple)

  const allVideoPlayers = document.querySelectorAll('.video-player-container');
  allVideoPlayers.forEach(player => {
    player.style.display = 'none';
  });

  // Display the selected video player
  const videoPlayer = document.querySelector('.video-player-container');
  videoPlayer.style.display = 'block';
}

// Add event listener to the card links after the functions are defined
document.querySelectorAll('.card-link').forEach(function (cardLink) {
  cardLink.addEventListener('click', function (event) {
    event.preventDefault();
    showVideoPlayer();
    const parentCard = this.closest('.card');
    parentCard.classList.toggle('hover-effect');
  });
});*/





// Create a style element
var style = document.createElement('style');
style.innerHTML = `
  /* Course Cards Styling */
  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
  }

  .card:hover {
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }

  .card-title {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .card-text {
    font-size: 16px;
    margin-bottom: 5px;
  }

  .card-body {
    padding: 20px;
  }

  /* Responsiveness for smaller screens */
  @media (max-width: 768px) {
    .card {
      margin-bottom: 20px;
    }
  }

  /* Video List */
  .video-list {
    float: left;
    width: 25%;
    margin-left: 0px;
  }

  .video-list ul {
    list-style-type: none;
    padding: 0;
  }

  .video-list li {
    margin-bottom: 10px;
  }

  /* Video Player */
  .video-player {
    float: left;
    width: 70%;
  }

  /* Large video player */
  #videoPlayer {
    width: 100%;
    height: auto;
  }






`;


/*document.addEventListener('DOMContentLoaded', function() {
  const subContentArea = document.getElementById('subContentArea');

  // Fetch the content of course1.html
  fetch('course1.html')
    .then(response => response.text())
    .then(data => {
      // Display the fetched content in the subContentArea
      subContentArea.innerHTML = data;
    })
    .catch(error => {
      console.error('Error fetching content:', error);
    });
});*/



// Append the style element to the head of the document
document.head.appendChild(style);

// Function to handle saving profile data as a text file
function saveProfileDataAsFile() {
  // Get form field values
  const name = document.getElementById('name').value;
  const gender = document.getElementById('gender').value;
  const dob = document.getElementById('dob').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const job = document.getElementById('job').value;
  const address = document.getElementById('address').value;
  const bio = document.getElementById('bio').value;

  // Generate profile data text content
  const profileData = `
    Name: ${name}
    Gender: ${gender}
    DOB: ${dob}
    Phone: ${phone}
    Email: ${email}
    Job: ${job}
    Address: ${address}
    Bio: ${bio}
  `;

  // Create a Blob containing the data
  const blob = new Blob([profileData], { type: 'text/plain' });

  // Create a link element to trigger the download
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);

  // Set the filename for the downloaded file
  const fileName = name + '_profile.txt'; // Replace with the desired file name
  link.download = fileName;

  // Append the link to the body and trigger the click event
  document.body.appendChild(link);
  link.click();

  // Clean up - remove the link from the DOM
  document.body.removeChild(link);
}

// Event listener for the Save Profile button click
document.getElementById('saveProfile').addEventListener('click', function() {
  saveProfileDataAsFile();
});




});
