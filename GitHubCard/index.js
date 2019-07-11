/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const cards = document.querySelector(".cards");
let myInfo = axios.get(`https://api.github.com/users/deejayeaster`);

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/
myInfo
  .then(git => {
    // console.log("response", git);
    const gitStuff = git.data;
    console.log(gitStuff);
    // making and appanding the card.
    const element = createCards(gitStuff);
    cards.appendChild(element);
  })
  .catch(error => {
    console.log("ERROR:", error);
  });
/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];
axios
  .get(`https://api.github.com/users/deejayeaster/followers`)
  .then(follower => {
    console.log("these are followers", follower);
    console.log("returned followers data", follower.data);
    follower.data.forEach(person => {
      followersArray.push(person.login);
    });
    console.log("created arr", followersArray);

    followersArray.forEach(follower => {
      axios
        .get(`https://api.github.com/users/${follower}`)
        .then(users => {
          console.log("this is the data", users.data);
          const followerElm = createCards(users.data);
          cards.appendChild(followerElm);
        })

        .catch(error => {
          console.log("ERROR:", error);
        });
    });
  })

  .catch(error => {
    console.log("ERROR:", error);
  });

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

https://www.github.com/`${userName}`
*/
const myName = "Deejay Easter";

function createCards(gitStuff) {
  const card = document.createElement("div");
  const userImg = document.createElement("img");
  const cardInfo = document.createElement("div");
  const name = document.createElement("h3");
  const userName = document.createElement("p");
  const location = document.createElement("p");
  const profile = document.createElement("p");
  const gitURL = document.createElement("a");
  const followers = document.createElement("p");
  const following = document.createElement("p");
  const bio = document.createElement("p");

  card.classList.add("card");
  cardInfo.classList.add("card-info");
  name.classList.add("name");
  userName.classList.add("username");

  // content, get ready to throw down
  userImg.src = gitStuff.avatar_url;
  userName.textContent = gitStuff.login;
  bio.textContent = `Bio: ${gitStuff.bio}`;
  gitURL.textContent = gitStuff.html_url;
  gitURL.href = gitStuff.html_url;
  location.textContent = `Location: ${gitStuff.location}`;
  profile.textContent = `Profile: `;
  following.textContent = `Following: ${gitStuff.following}`;
  followers.textContent = `Followers: ${gitStuff.followers}`;
  name.textContent = gitStuff.name;

  // structure
  card.appendChild(userImg);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  profile.appendChild(gitURL);

  return card;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
