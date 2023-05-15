import throttle from 'lodash.throttle';

const refs = {
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
  form: document.querySelector('.feedback-form'),
};

const LOCAL_KEY = 'feedback-form-state';

const userForm = {
  email: '',
  message: '',
};

refs.email.addEventListener('input', throttle(onEmailInput, 500));
refs.message.addEventListener('input', throttle(onMessageInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

populatedForm();

function onEmailInput(evt) {
  userForm.email = evt.target.value;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(userForm));
}

function onMessageInput(evt) {
  userForm.message = evt.target.value;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(userForm));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  console.log(userForm);
  localStorage.removeItem(LOCAL_KEY);
}

function populatedForm(evt) {
  const savedMessage = localStorage.getItem(LOCAL_KEY);
  if (savedMessage) {
    const parcedData = JSON.parse(savedMessage);
    userForm.email = parcedData.email;
    userForm.message = parcedData.message;
    refs.email.value = parcedData.email;
    refs.message.value = parcedData.message;
  }
}
