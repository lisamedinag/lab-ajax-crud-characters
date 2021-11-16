const charactersAPI = new APIHandler();

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    fetchAllCharacters()
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    fetchOneCharacter()
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    deleteOneCharacter()
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    createNewCharacter()
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    fetchCharacterInfoForm()
  });
});

function fetchAllCharacters() {
  charactersAPI
    .getFullList()
    .then(res => {
      let charactersUL = document.querySelector(".characters-container")
      let charactersInfo = ""
      res.data.forEach(character => {
        charactersInfo +=
          `<div class="character-info">
            <div class="id">Character Id: ${character.id} </div>
            <div class="name">Character Name: ${character.name} </div>
            <div class="occupation">Character Occupation: ${character.occupation}</div>
            <div class="cartoon">Is a Cartoon?: ${character.cartoon}</div>
            <div class="weapon">Character Weapon: ${character.weapon}</div>
          </div>`
      });

      charactersUL.innerHTML = charactersInfo
    })
    .catch(err => console.error(err))
}

function fetchOneCharacter() {
  const id = document.querySelector(".find input").value
  const charactersUL = document.querySelector(".characters-container")
  let charactersInfo = ""


  charactersAPI
    .getOneRegister(id)
    .then(data => {
      charactersInfo +=
        `<div class="character-info">
            <div class="id">Character Id: ${data.data.id} </div>
            <div class="name">Character Name: ${data.data.name} </div>
            <div class="occupation">Character Occupation: ${data.data.occupation}</div>
            <div class="cartoon">Is a Cartoon?: ${data.data.cartoon}</div>
            <div class="weapon">Character Weapon: ${data.data.weapon}</div>
          </div>`

      charactersUL.innerHTML = charactersInfo
    })
    .catch(err => console.error(err))
}

function deleteOneCharacter() {
  const id = document.querySelector(".delete input").value
  const button = document.getElementById("delete-one")

  charactersAPI
    .deleteOneRegister(id)
    .then(data => {
      button.style.background = 'green';
      alert(`Succesfully deleted character ${data.data.name} with id ${data.data.id}`)
    })
    .catch(err => { console.error(err); button.style.background = 'red'; })
}

function createNewCharacter() {
  const inputs = document.querySelectorAll("#new-character-form input")
  const newCharacterForm = document.querySelector("#new-character-form")
  const button = document.getElementById("send-data")

  let name = inputs[0].value
  let occupation = inputs[1].value
  let weapon = inputs[2].value
  let cartoon = inputs[3].checked

  const charactersUL = document.querySelector(".characters-container")
  let charactersInfo = ""


  charactersAPI
    .createOneRegister({ name, occupation, weapon, cartoon })
    .then(res => {
      newCharacterForm.reset()
      button.style.background = 'green';

      charactersInfo +=
        `<div class="character-info">
          <div><p style="color: green">NEW CHARACTER UNLOCKED</p></div>
          <div class="id">Character Id: ${res.data.id} </div>
          <div class="name">Character Name: ${res.data.name} </div>
          <div class="occupation">Character Occupation: ${res.data.occupation}</div>
          <div class="cartoon">Is a Cartoon?: ${res.data.cartoon}</div>
          <div class="weapon">Character Weapon: ${res.data.weapon}</div>
        </div>`

      charactersUL.innerHTML = charactersInfo
    })
    .catch(err => { console.error(err); button.style.background = 'red'; })
}

function fetchCharacterInfoForm() {
  const inputs = document.querySelectorAll("#edit-character-form input")
  const editCharacterForm = document.querySelector("#edit-character-form")
  const button = document.getElementById("update-data")

  let id = inputs[0].value
  let name = inputs[1].value
  let occupation = inputs[2].value
  let weapon = inputs[3].value
  let cartoon = inputs[4].checked
  const info = { name, occupation, weapon, cartoon }

  const charactersUL = document.querySelector(".characters-container")
  let charactersInfo = ""


  charactersAPI
    .updateOneRegister(id, info)
    .then(res => {
      editCharacterForm.reset()
      button.style.background = 'green';

      charactersInfo +=
        `<div class="character-info">
          <div><p style="color: blue">CHARACTER UPDATED</p></div>
          <div class="id">Character Id: ${res.data.id} </div>
          <div class="name">Character Name: ${res.data.name} </div>
          <div class="occupation">Character Occupation: ${res.data.occupation}</div>
          <div class="cartoon">Is a Cartoon?: ${res.data.cartoon}</div>
          <div class="weapon">Character Weapon: ${res.data.weapon}</div>
        </div>`

      charactersUL.innerHTML = charactersInfo
    })
    .catch(err => { console.error(err); button.style.background = 'red'; })
}