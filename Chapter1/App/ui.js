// Select DOM elements to work with
const welcomeDiv = document.getElementById("welcomeMessage");
const infoDiv = document.getElementById("infoMessage");
const signInButton = document.getElementById("signIn");
const signOutButton = document.getElementById('signOut');
const cardDiv = document.getElementById("card-div");
const profileButton = document.getElementById("seeProfiles");
const profileDiv = document.getElementById("profile-div");

// a little JQuery to enable bootstrap toasts
$(document).ready(() => {
  if (!myMSALObj.getAccountByUsername(username)) {
    $(".toast").toast("show");
  }
});

const showWelcomeMessage = (account) => {
    // Reconfiguring DOM elements
    cardDiv.classList.remove('d-none');
    welcomeDiv.innerHTML = `Welcome ${account.username}`;
    welcomeDiv.classList.remove('alert-secondary');
    welcomeDiv.classList.add('alert-success');
    infoDiv.innerHTML = `You belong to the tenant: ${account.tenantId}`
    infoDiv.classList.remove('d-none');
    signInButton.classList.add('d-none');
    signOutButton.classList.remove('d-none');
    profileButton.classList.remove('d-none');
    $(".toast").toast("hide");
}

const updateUI = (data) => {
  console.log('Graph API responded at: ' + new Date().toString());
  $(".toast").toast("hide");

  data.value.map(user => {
    const name = document.createElement('p');
    name.innerHTML = user.displayName;
    name.classList.add('alert')
    name.classList.add('alert-dark');
    profileDiv.appendChild(name);
  })
}