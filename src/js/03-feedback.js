import throttle from "lodash.throttle";
let formData = {};
const STORAGE_KEY = "feedback-form-state";

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
}

refs.form.addEventListener('submit', formSubmit);
refs.form.addEventListener('input', throttle(e => {
    formData[e.target.name] = e.target.value;
    const formDataJSON = JSON.stringify(formData);
    localStorage.setItem(STORAGE_KEY, formDataJSON);
},500));

populateTextarea();

function formSubmit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(formData);
    formData = {};
};

function populateTextarea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    
    if (savedMessage) {
        const saveditems = JSON.parse(savedMessage)
        refs.textarea.value = saveditems.message;
        refs.input.value = saveditems.email;
    }
};