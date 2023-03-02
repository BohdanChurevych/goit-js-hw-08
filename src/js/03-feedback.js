import throttle from "lodash.throttle";
import storage from "./storage";
const { save, load } = storage;
let formData = { 
    email: "", 
    message: "",
};
const STORAGE_KEY = "feedback-form-state";

const formDataParse = load(STORAGE_KEY);

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


if (formDataParse) {
    formData = formDataParse;
    setFormValue(formData, refs.form);
}

function setFormValue(obj, form) {
    for (const key in obj) {
      form.elements[key].value = obj[key];
    }
};

function formSubmit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(formData);
    formData = { 
        email: "", 
        message: "",
    };
};

function populateTextarea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    
    if (savedMessage) {
        const saveditems = JSON.parse(savedMessage)
        refs.textarea.value = saveditems.message;
        refs.input.value = saveditems.email;
    }
};